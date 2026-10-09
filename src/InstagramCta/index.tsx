import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const instagramCtaSchema = z.object({
  handle: z.string(),
  displayName: z.string(),
  tagline: z.string(),
  accentColor: zColor(),
});

const IG_GRADIENT =
  "linear-gradient(45deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)";
const FONT = "'Inter', 'Helvetica Neue', 'Segoe UI', Roboto, Arial, sans-serif";

const InstagramGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="6"
      stroke="white"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.3" fill="white" />
  </svg>
);

const Emblem: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100">
    <defs>
      <radialGradient id="bg" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stopColor="#2a1a12" />
        <stop offset="100%" stopColor="#0d0805" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#bg)" />
    <circle
      cx="50"
      cy="50"
      r="42"
      fill="none"
      stroke={accent}
      strokeWidth="1.5"
    />
    {/* crossed sabres */}
    <g stroke={accent} strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M26 74 Q44 50 74 24" />
      <path d="M74 74 Q56 50 26 24" />
    </g>
    <g fill={accent}>
      <rect
        x="20"
        y="72"
        width="12"
        height="4"
        rx="2"
        transform="rotate(-40 26 74)"
      />
      <rect
        x="68"
        y="72"
        width="12"
        height="4"
        rx="2"
        transform="rotate(40 74 74)"
      />
    </g>
    <circle
      cx="50"
      cy="50"
      r="17"
      fill="#1a100b"
      stroke={accent}
      strokeWidth="1.5"
    />
    <text
      x="50"
      y="60"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="26"
      fontWeight="700"
      fill="#f5e6c8"
    >
      L
    </text>
  </svg>
);

export const InstagramCta: React.FC<z.infer<typeof instagramCtaSchema>> = ({
  handle,
  displayName,
  tagline,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Background drift
  const bgShift = interpolate(frame, [0, durationInFrames], [0, 30]);

  // Headline
  const headIn = spring({ frame, fps, config: { damping: 200 } });

  // Profile card
  const cardIn = spring({ frame: frame - 15, fps, config: { damping: 14 } });

  // Follow button + cursor tap
  const btnIn = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const tapFrame = 105;
  const cursorProgress = interpolate(frame, [70, tapFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const pressed = interpolate(
    frame,
    [tapFrame, tapFrame + 4, tapFrame + 10],
    [1, 0.9, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const followed = frame >= tapFrame + 4;
  const rippleProgress = interpolate(frame, [tapFrame, tapFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorOut = interpolate(frame, [tapFrame + 15, tapFrame + 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hearts burst after follow
  const hearts = new Array(8).fill(0).map((_, i) => {
    const t = interpolate(frame, [tapFrame + 6, tapFrame + 50], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    });
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * 260 * t,
      y: Math.sin(angle) * 140 * t - 80 * t,
      o: t === 0 ? 0 : 1 - t,
      s: 0.6 + 0.6 * t,
    };
  });

  // Final URL line + pulse
  const urlIn = spring({ frame: frame - 150, fps, config: { damping: 200 } });
  const pulse = 1 + 0.04 * Math.sin((frame / fps) * Math.PI * 2);

  // Global fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${50 + bgShift}% ${30 + bgShift / 2}%, #3b1b2e 0%, #140b14 55%, #070507 100%)`,
        fontFamily: FONT,
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: IG_GRADIENT,
          filter: "blur(220px)",
          opacity: 0.35,
          top: 520,
        }}
      />

      {/* Headline */}
      <div
        style={{
          marginTop: 230,
          textAlign: "center",
          color: "white",
          opacity: headIn,
          transform: `translateY(${(1 - headIn) * 60}px)`,
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: 600,
            letterSpacing: 6,
            color: accentColor,
          }}
        >
          NIE PRZEGAP NICZEGO
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1.05,
            marginTop: 20,
          }}
        >
          Obserwuj nas
          <br />
          na Instagramie
        </div>
      </div>

      {/* Profile card */}
      <div
        style={{
          marginTop: 110,
          width: 860,
          padding: "70px 60px 60px",
          borderRadius: 48,
          background: "rgba(255,255,255,0.08)",
          border: "2px solid rgba(255,255,255,0.15)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: Math.min(1, cardIn),
          transform: `scale(${0.7 + 0.3 * cardIn})`,
          position: "relative",
        }}
      >
        {/* Avatar with story ring */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: IG_GRADIENT,
            padding: 10,
            transform: `rotate(${frame * 0.6}deg)`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "#140b14",
              padding: 8,
              transform: `rotate(${-frame * 0.6}deg)`,
            }}
          >
            <Emblem accent={accentColor} />
          </div>
        </div>

        <div
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 800,
            marginTop: 36,
          }}
        >
          @{handle}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 42,
            marginTop: 8,
          }}
        >
          {displayName}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 36,
            marginTop: 18,
            textAlign: "center",
          }}
        >
          {tagline}
        </div>

        {/* Follow button */}
        <div
          style={{
            marginTop: 50,
            position: "relative",
            transform: `scale(${btnIn * pressed})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 24,
              border: "6px solid white",
              transform: `scale(${1 + rippleProgress * 0.5})`,
              opacity: rippleProgress === 0 ? 0 : 1 - rippleProgress,
            }}
          />
          <div
            style={{
              width: 620,
              height: 130,
              borderRadius: 24,
              background: followed ? "rgba(255,255,255,0.18)" : IG_GRADIENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              color: "white",
              fontSize: 54,
              fontWeight: 800,
            }}
          >
            {followed ? (
              <>✓ Obserwujesz</>
            ) : (
              <>
                <InstagramGlyph size={60} /> Obserwuj
              </>
            )}
          </div>

          {hearts.map((h, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                fontSize: 64,
                opacity: h.o,
                transform: `translate(-50%, -50%) translate(${h.x}px, ${h.y}px) scale(${h.s})`,
              }}
            >
              ❤️
            </div>
          ))}

          {/* Tap cursor */}
          <div
            style={{
              position: "absolute",
              left: interpolate(cursorProgress, [0, 1], [700, 360]),
              top: interpolate(cursorProgress, [0, 1], [380, 70]),
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
              border: "4px solid rgba(0,0,0,0.25)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              opacity: frame < 70 ? 0 : cursorOut,
              transform: `scale(${frame >= tapFrame && frame < tapFrame + 8 ? 0.8 : 1})`,
            }}
          />
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          bottom: 170,
          textAlign: "center",
          opacity: urlIn,
          transform: `translateY(${(1 - urlIn) * 40}px) scale(${frame > 150 ? pulse : 1})`,
        }}
      >
        <div style={{ color: "white", fontSize: 50, fontWeight: 700 }}>
          instagram.com/{handle}
        </div>
        <div
          style={{
            color: accentColor,
            fontSize: 40,
            marginTop: 14,
            fontWeight: 600,
          }}
        >
          Kliknij „Obserwuj” i bądź z nami!
        </div>
      </div>
    </AbsoluteFill>
  );
};
