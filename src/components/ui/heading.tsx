import Text from "./text";

interface HeadingProps {
  level?: 1 | 2 | 3;
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function Heading({
  level = 2,
  children,
  title,
  subtitle,
  className,
}: HeadingProps) {
  const config = {
    1: {
      as: "h1" as const,
      variant: "h1" as const,
    },
    2: {
      as: "h2" as const,
      variant: "h2" as const,
    },
    3: {
      as: "h3" as const,
      variant: "h3" as const,
    },
  };

  const current = config[level];

  return (
    <div className="space-y-2">
      {subtitle && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-secondary">
          {subtitle}
        </p>
      )}
      <Text
        as={current.as}
        variant={current.variant}
        className={className}
      >
        {children || title}
      </Text>
    </div>
  );
}