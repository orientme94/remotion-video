import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandMark } from "./BrandMark";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 40%, #1B2340 0%, #0B0F1E 70%)",
        fontFamily: "Inter, Helvetica, Arial, sans-serif",
      }}
    >
      <Interactive.Div
        name="Content"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          opacity: interpolate(
            frame,
            [durationInFrames - 0.5 * fps, durationInFrames],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        <BrandMark
          name="Logo"
          premountFor={fps}
          primaryColor="#6C8CFF"
          secondaryColor="#36E2C4"
          style={{
            scale: interpolate(frame, [0, 1 * fps], [0.6, 1], {
              easing: Easing.spring({ damping: 200 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Title"
          style={{
            color: "#FFFFFF",
            fontSize: 150,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
            opacity: interpolate(frame, [0.6 * fps, 1.4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0.6 * fps, 1.6 * fps],
              ["0px 60px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          Moja Firma
        </Interactive.Div>
        <Interactive.Div
          name="Accent line"
          style={{
            width: 240,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#36E2C4",
            scale: interpolate(frame, [1.2 * fps, 2 * fps], ["0 1", "1 1"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Subtitle"
          style={{
            color: "#AEB8D6",
            fontSize: 60,
            fontWeight: 500,
            opacity: interpolate(frame, [1.6 * fps, 2.4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Tworzymy z pasją
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
