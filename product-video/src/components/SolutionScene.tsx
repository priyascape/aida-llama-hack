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

export const SolutionScene: React.FC<Props> = ({ isSquare }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Introducing text animation
  const introOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo animation
  const logoScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Solution points
  const solutionPoints = [
    "Instant disaster detection",
    "AI-powered resource allocation",
    "Real-time situation analysis",
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0a1a28 0%, #0d2840 50%, #0a1a28 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? 60 : 100,
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 200, 150, 0.15) 0%, transparent 70%)",
          opacity: logoOpacity,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 30 : 50,
        }}
      >
        {/* Introducing text */}
        <div
          style={{
            opacity: introOpacity,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 24 : 32,
              fontWeight: 300,
              color: "#4ecdc4",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Introducing
          </span>
        </div>

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
              width: isSquare ? 200 : 280,
              height: "auto",
              filter: "drop-shadow(0 0 40px rgba(78, 205, 196, 0.4))",
            }}
          />
        </div>

        {/* Solution points */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 20,
          }}
        >
          {solutionPoints.map((point, i) => {
            const pointOpacity = interpolate(
              frame,
              [50 + i * 15, 65 + i * 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const pointX = interpolate(
              frame,
              [50 + i * 15, 65 + i * 15],
              [-30, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: pointOpacity,
                  transform: `translateX(${pointX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#4ecdc4",
                    boxShadow: "0 0 15px rgba(78, 205, 196, 0.6)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isSquare ? 22 : 28,
                    color: "#ffffff",
                  }}
                >
                  {point}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network lines decoration */}
      {[...Array(8)].map((_, i) => {
        const lineOpacity = interpolate(
          frame,
          [30 + i * 5, 50 + i * 5],
          [0, 0.2],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const angle = (i * 45 * Math.PI) / 180;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 300,
              height: 1,
              background: `linear-gradient(90deg, rgba(78, 205, 196, ${lineOpacity}), transparent)`,
              transformOrigin: "left center",
              transform: `rotate(${angle}rad)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
