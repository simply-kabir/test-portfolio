import Stack from "./stack";
import Text from "./text";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <Stack gap="md">

      {eyebrow && (
        <Text variant="overline">
          {eyebrow}
        </Text>
      )}

      <Text
        as="h2"
        variant="h2"
      >
        {title}
      </Text>

      {description && (
        <Text
          variant="bodyLarge"
          className="max-w-2xl"
        >
          {description}
        </Text>
      )}

    </Stack>
  );
}