import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface Props {
  isSquare: boolean;
}

const techStack = [
  { name: "Llama 3.2 Vision", icon: "🦙", color: "#a855f7" },
  { name: "SAM2", icon: "🎯", color: "#f59e0b" },
  { name: "FastAPI", icon: "⚡", color: "#009688" },
  { name: "PyTorch", icon: "🔥", color: "#ee4c2c" },
];

export const TechStackScene: React.FC<Props> = ({ isSquare }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0a1a 0%, #1a1028 50%, #0f0a1a 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? 50 : 80,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 40 : 60,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 36 : 48,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Built with Cutting-Edge Tech
          </h2>
        </div>

        {/* Tech stack row */}
        <div
          style={{
            display: "flex",
            flexDirection: isSquare ? "column" : "row",
            gap: isSquare ? 20 : 40,
            alignItems: "center",
          }}
        >
          {techStack.map((tech, i) => {
            const techOpacity = interpolate(
              frame,
              [15 + i * 12, 30 + i * 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const techScale = interpolate(
              frame,
              [15 + i * 12, 30 + i * 12],
              [0.5, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const glowPulse = 0.3 + Math.sin((frame + i * 20) * 0.1) * 0.1;

            return (
              <div
                key={i}
                style={{
                  opacity: techOpacity,
                  transform: `scale(${techScale})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 15,
                  padding: isSquare ? "20px 30px" : "30px 50px",
                  background: `rgba(${tech.color === "#a855f7" ? "168, 85, 247" : tech.color === "#f59e0b" ? "245, 158, 11" : tech.color === "#009688" ? "0, 150, 136" : "238, 76, 44"}, 0.1)`,
                  borderRadius: 20,
                  border: `1px solid ${tech.color}44`,
                  boxShadow: `0 0 40px ${tech.color}${Math.round(glowPulse * 255).toString(16).padStart(2, "0")}`,
                }}
              >
                <div style={{ fontSize: isSquare ? 48 : 64 }}>{tech.icon}</div>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isSquare ? 18 : 24,
                    fontWeight: 600,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Meta Llama branding */}
        <div
          style={{
            opacity: interpolate(frame, [60, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 16 : 20,
              color: "#8b8b9a",
            }}
          >
            Powered by
          </span>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 20 : 26,
              fontWeight: 700,
              color: "#a855f7",
            }}
          >
            Meta Llama
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
