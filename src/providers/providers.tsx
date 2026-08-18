"use client";

import LenisProvider from "./lenisprovider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
        {children}
    </LenisProvider>
  );
}