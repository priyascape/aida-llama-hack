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

export const CTAScene: React.FC<Props> = ({ isSquare }) => {
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

  // CTA text animation
  const ctaOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button animation
  const buttonOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Pulsing glow effect
  const pulseGlow = 0.3 + Math.sin(frame * 0.15) * 0.15;

  // GitHub link animation
  const githubOpacity = interpolate(frame, [80, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #1a3050 0%, #0a1628 70%)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 180, 255, ${pulseGlow}) 0%, transparent 60%)`,
        }}
      />

      {/* Particle ring */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180 + frame * 0.01;
        const radius = 250 + Math.sin((frame + i * 10) * 0.05) * 20;
        const particleOpacity = interpolate(frame, [20, 50], [0, 0.6], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00b4ff",
              opacity: particleOpacity,
              transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
              boxShadow: "0 0 10px #00b4ff",
            }}
          />
        );
      })}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 25 : 40,
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Img
            src={staticFile("aida-logo.png")}
            style={{
              width: isSquare ? 180 : 240,
              height: "auto",
              filter: "drop-shadow(0 0 40px rgba(0, 180, 255, 0.5))",
            }}
          />
        </div>

        {/* CTA Text */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 36 : 52,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              marginBottom: 15,
            }}
          >
            Join the Mission
          </h1>
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 20 : 28,
              color: "#7eb8da",
              margin: 0,
              maxWidth: isSquare ? 400 : 600,
            }}
          >
            Help us revolutionize humanitarian response with AI
          </p>
        </div>

        {/* Product Hunt Button */}
        <div
          style={{
            opacity: buttonOpacity,
            transform: `scale(${Math.min(buttonScale, 1)})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #da552f 0%, #ff6b4a 100%)",
              padding: isSquare ? "16px 40px" : "20px 60px",
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: `0 0 40px rgba(218, 85, 47, ${pulseGlow + 0.2})`,
            }}
          >
            <span style={{ fontSize: isSquare ? 24 : 32 }}>🚀</span>
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: isSquare ? 22 : 28,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Upvote on Product Hunt
            </span>
          </div>
        </div>

        {/* GitHub link */}
        <div
          style={{
            opacity: githubOpacity,
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <span style={{ fontSize: isSquare ? 20 : 24 }}>⭐</span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: isSquare ? 16 : 20,
              color: "#7eb8da",
            }}
          >
            github.com/priyascape/aida-llama-hack
          </span>
        </div>

        {/* Team credit */}
        <div
          style={{
            opacity: interpolate(frame, [95, 110], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 14 : 18,
              color: "#5a7a9a",
              margin: 0,
            }}
          >
            Built with ❤️ by Priya, Nitish, Nihir & Habeeb
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
