import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface Props {
  isSquare: boolean;
}

export const IntroScene: React.FC<Props> = ({ isSquare }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tagline animation
  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particle animations
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.sin(i * 0.5) * 300 + (isSquare ? 540 : 960),
    y: Math.cos(i * 0.7) * 200 + (isSquare ? 400 : 540),
    delay: i * 3,
    size: 3 + (i % 4),
  }));

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #1a3a5c 0%, #0a1628 70%)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated particles */}
      {particles.map((particle, i) => {
        const particleOpacity = interpolate(
          frame,
          [particle.delay, particle.delay + 30],
          [0, 0.6],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const particleY =
          particle.y + Math.sin((frame + i * 10) * 0.05) * 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: particle.x,
              top: particleY,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: `rgba(0, 180, 255, ${particleOpacity})`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(0, 180, 255, ${particleOpacity * 0.5})`,
            }}
          />
        );
      })}

      {/* Glow effect behind logo */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      />

      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("aida-logo.png")}
          style={{
            width: isSquare ? 280 : 350,
            height: "auto",
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            filter: "drop-shadow(0 0 30px rgba(0, 150, 255, 0.5))",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 32 : 42,
              fontWeight: 300,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Crisis Intelligence
          </h2>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            textAlign: "center",
            maxWidth: isSquare ? 400 : 600,
          }}
        >
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 20 : 26,
              color: "#7eb8da",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            AI-Powered Humanitarian Response Platform
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [80, 110], [0, 200], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #00b4ff, transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
