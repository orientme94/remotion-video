import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import type React from "react";

type BrandMarkProps = {
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly style?: React.CSSProperties;
};

// Placeholder logo: two overlapping rounded shapes. Swap the paths for your own logo.
const BrandMarkInner: React.FC<BrandMarkProps> = ({
  primaryColor,
  secondaryColor,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Interactive.Svg
      name="Logo"
      width={260}
      height={260}
      viewBox="0 0 260 260"
      style={{
        overflow: "visible",
        ...style,
      }}
    >
      <Interactive.Rect
        name="Back shape"
        x={30}
        y={30}
        width={150}
        height={150}
        rx={40}
        fill={secondaryColor}
        style={{
          opacity: 0.85,
          translate: interpolate(frame, [0, 1 * fps], ["40px 40px", "0px 0px"], {
            easing: Easing.spring({ damping: 200 }),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Rect
        name="Front shape"
        x={80}
        y={80}
        width={150}
        height={150}
        rx={40}
        fill={primaryColor}
        style={{
          translate: interpolate(frame, [0, 1 * fps], ["-40px -40px", "0px 0px"], {
            easing: Easing.spring({ damping: 200 }),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </Interactive.Svg>
  );
};

const brandMarkSchema = {
  primaryColor: {
    type: "color",
    default: "#6C8CFF",
    description: "Primary color",
  },
  secondaryColor: {
    type: "color",
    default: "#36E2C4",
    description: "Secondary color",
  },
} as const satisfies InteractivitySchema;

export const BrandMark = Interactive.withSchema({
  Component: BrandMarkInner,
  componentName: "<BrandMark>",
  schema: brandMarkSchema,
  wrapInSequence: true,
});
