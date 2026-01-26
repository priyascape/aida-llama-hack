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

export const DemoScene: React.FC<Props> = ({ isSquare }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Demo image animation
  const demoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const demoOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Highlight elements
  const highlightOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Callout animations
  const callouts = [
    { text: "Crisis List View", x: isSquare ? "15%" : "18%", y: "25%" },
    { text: "Aid Resource Tags", x: isSquare ? "65%" : "55%", y: "35%" },
    { text: "Distress Comments", x: isSquare ? "65%" : "70%", y: "55%" },
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #1a2d4a 50%, #0d1f3c 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? 40 : 60,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: isSquare ? 30 : 50,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: isSquare ? 32 : 42,
            fontWeight: 600,
            color: "#ffffff",
            margin: 0,
            textAlign: "center",
          }}
        >
          Real-Time Crisis Dashboard
        </h2>
      </div>

      {/* Demo screenshot with frame */}
      <div
        style={{
          position: "relative",
          opacity: demoOpacity,
          transform: `scale(${Math.min(demoScale, 1)})`,
        }}
      >
        {/* Browser frame */}
        <div
          style={{
            background: "#1a2744",
            borderRadius: 16,
            padding: "12px 12px 0 12px",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Browser toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
            <div
              style={{
                flex: 1,
                background: "#0d1f3c",
                borderRadius: 6,
                padding: "6px 12px",
                marginLeft: 20,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#7eb8da",
                }}
              >
                aida.crisis-intelligence.ai
              </span>
            </div>
          </div>

          {/* Screenshot */}
          <Img
            src={staticFile("desktop-demo.png")}
            style={{
              width: isSquare ? 700 : 1000,
              height: "auto",
              borderRadius: "0 0 8px 8px",
            }}
          />
        </div>

        {/* Callout annotations */}
        {callouts.map((callout, i) => {
          const calloutOpacity = interpolate(
            frame,
            [70 + i * 20, 90 + i * 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: callout.x,
                top: callout.y,
                opacity: calloutOpacity,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  background: "#00b4ff",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: isSquare ? 12 : 16,
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(0, 180, 255, 0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                {callout.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Glowing border effect */}
      <div
        style={{
          position: "absolute",
          width: isSquare ? 750 : 1050,
          height: isSquare ? 500 : 650,
          border: `2px solid rgba(0, 180, 255, ${highlightOpacity * 0.3})`,
          borderRadius: 24,
          boxShadow: `0 0 60px rgba(0, 180, 255, ${highlightOpacity * 0.2})`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
