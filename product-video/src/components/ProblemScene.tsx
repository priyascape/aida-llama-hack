import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface Props {
  isSquare: boolean;
}

const stats = [
  { number: "387M", label: "People affected by disasters annually" },
  { number: "72hrs", label: "Critical response window" },
  { number: "40%", label: "Aid reaches wrong locations" },
];

export const ProblemScene: React.FC<Props> = ({ isSquare }) => {
  const frame = useCurrentFrame();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #1a0a0a 0%, #2d1a1a 50%, #1a0a0a 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? 60 : 100,
      }}
    >
      {/* Warning pulse effect */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at center, rgba(255, 80, 80, ${0.1 + Math.sin(frame * 0.1) * 0.05}) 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 40 : 60,
          maxWidth: isSquare ? 900 : 1400,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 48 : 64,
              fontWeight: 700,
              color: "#ff6b6b",
              margin: 0,
              textShadow: "0 0 40px rgba(255, 107, 107, 0.5)",
            }}
          >
            The Challenge
          </h1>
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 24 : 32,
              color: "#ccaaaa",
              margin: "20px 0 0 0",
            }}
          >
            Humanitarian crises demand faster, smarter responses
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            flexDirection: isSquare ? "column" : "row",
            gap: isSquare ? 30 : 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {stats.map((stat, i) => {
            const statOpacity = interpolate(
              frame,
              [30 + i * 15, 50 + i * 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const statScale = interpolate(
              frame,
              [30 + i * 15, 50 + i * 15],
              [0.8, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: statOpacity,
                  transform: `scale(${statScale})`,
                  textAlign: "center",
                  padding: isSquare ? "20px 40px" : "30px 50px",
                  background: "rgba(255, 107, 107, 0.1)",
                  borderRadius: 16,
                  border: "1px solid rgba(255, 107, 107, 0.3)",
                }}
              >
                <div
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isSquare ? 48 : 64,
                    fontWeight: 800,
                    color: "#ff6b6b",
                    marginBottom: 10,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isSquare ? 16 : 20,
                    color: "#ccaaaa",
                    maxWidth: 200,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert icons */}
      {[...Array(6)].map((_, i) => {
        const iconOpacity = interpolate(
          frame,
          [20 + i * 10, 40 + i * 10],
          [0, 0.3],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${15 + (i % 3) * 35}%`,
              top: `${20 + Math.floor(i / 3) * 60}%`,
              fontSize: isSquare ? 30 : 40,
              opacity: iconOpacity,
              filter: "grayscale(0.5)",
            }}
          >
            {["🌊", "🔥", "🌪️", "⚡", "🏚️", "🆘"][i]}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
