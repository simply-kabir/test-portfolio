"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, PerspectiveCamera as ThreePerspectiveCamera, Mesh } from "three";

const _deskCenter = new Vector3(0, 0.65, -0.4);
const _screenCenter = new Vector3();
const _screenNormal = new Vector3();
const _currentTarget = new Vector3();
const _endPos = new Vector3();
const _scale = new Vector3();

const START_POS = new Vector3(0, 1.3, 6.1);
const START_FOV = 33;
const END_FOV = 22;

// C2-continuous quintic smoothstep: zero 1st and 2nd derivatives at boundaries for ultra-smooth 60+ FPS motion
function smoothstepC2(t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export default function CameraRig({ progress }: { progress: number }) {
  const { camera, scene, size } = useThree();
  const screenMeshRef = useRef<Mesh | null>(null);

  useEffect(() => {
    return () => {
      if (camera instanceof ThreePerspectiveCamera) {
        camera.clearViewOffset();
      }
    };
  }, [camera]);

  useFrame(() => {
    if (progress > 0.72) return;
    if (!(camera instanceof ThreePerspectiveCamera)) return;

    // Dynamically retrieve monitor display mesh from 3D scene
    if (!screenMeshRef.current) {
      screenMeshRef.current = scene.getObjectByName("monitor-screen") as Mesh;
    }

    const screenMesh = screenMeshRef.current;

    if (screenMesh) {
      screenMesh.getWorldPosition(_screenCenter);
      screenMesh.getWorldDirection(_screenNormal);
      screenMesh.getWorldScale(_scale);
    } else {
      _screenCenter.set(0.063, 0.915, -0.415);
      _screenNormal.set(-0.149, 0, 0.989).normalize();
      _scale.set(1.15, 1.15, 1.15);
    }

    // Phase 1: Monitor Centering (progress 0.0 -> 0.18)
    const alignProgress = Math.min(Math.max(progress / 0.18, 0), 1);
    const easeAlign = smoothstepC2(alignProgress);

    // Phase 2: Cinema Dolly (progress 0.18 -> 0.58)
    const dollyProgress = Math.min(Math.max((progress - 0.15) / 0.43, 0), 1);
    const easeDolly = smoothstepC2(dollyProgress);

    // Target position lerps from whole workspace center to monitor center during Phase 1
    _currentTarget.lerpVectors(_deskCenter, _screenCenter, easeAlign);

    const aspect = size.width / size.height;

    // Smoothly transition physical camera FOV during Phase 2
    const fov = START_FOV + (END_FOV - START_FOV) * easeDolly;
    camera.fov = fov;

    // Compute display dimensions from mesh geometry and world scale
    const screenWidth = 2.2 * _scale.x;
    const screenHeight = 1.3 * _scale.y;

    // Calculate exact dolly distance so monitor display covers 100% of viewport
    const fovRad = (fov * Math.PI) / 180;
    const dHeight = screenHeight / (2 * Math.tan(fovRad / 2));
    const dWidth = screenWidth / (2 * Math.tan(fovRad / 2) * aspect);
    const endDistance = Math.min(dHeight, dWidth) * 1.01;

    // Compute cinema camera dolly end position along monitor forward normal
    _endPos.copy(_screenCenter).addScaledVector(_screenNormal, endDistance);

    // Physically translate virtual cinema camera through 3D world space
    camera.position.lerpVectors(START_POS, _endPos, easeDolly);

    // Lock camera target smoothly onto target
    camera.lookAt(_currentTarget);

    // Whole model is centered in the viewport from page load (offsetFrac = 0.5)
    camera.setViewOffset(
      size.width * 2,
      size.height,
      0.5 * size.width,
      0,
      size.width,
      size.height
    );
  });

  return null;
}