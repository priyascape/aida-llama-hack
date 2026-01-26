import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface Props {
  isSquare: boolean;
}

const features = [
  {
    icon: "🛰️",
    title: "Disaster Detection",
    description: "Analyze satellite imagery to identify and classify crisis types",
    color: "#ff6b6b",
  },
  {
    icon: "🤖",
    title: "AI Image Analysis",
    description: "Generate detailed captions and descriptions of disaster scenes",
    color: "#4ecdc4",
  },
  {
    icon: "📦",
    title: "Resource Extraction",
    description: "Automatically identify needed supplies from victim reports",
    color: "#f7b731",
  },
  {
    icon: "🗺️",
    title: "Area Segmentation",
    description: "Precise mapping of affected zones using SAM2 technology",
    color: "#a55eea",
  },
];

export const FeaturesScene: React.FC<Props> = ({ isSquare }) => {
  const frame = useCurrentFrame();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: isSquare ? 40 : 80,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 30 : 50,
          width: "100%",
          maxWidth: 1600,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: isSquare ? 42 : 56,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Powered by{" "}
            <span style={{ color: "#00b4ff" }}>Llama 3.2 Vision</span>
          </h1>
        </div>

        {/* Features grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isSquare ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isSquare ? 20 : 30,
            width: "100%",
          }}
        >
          {features.map((feature, i) => {
            const featureDelay = 30 + i * 25;
            const featureOpacity = interpolate(
              frame,
              [featureDelay, featureDelay + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const featureY = interpolate(
              frame,
              [featureDelay, featureDelay + 20],
              [40, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: featureOpacity,
                  transform: `translateY(${featureY}px)`,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 20,
                  padding: isSquare ? 25 : 35,
                  border: `1px solid ${feature.color}33`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: isSquare ? 40 : 50,
                    filter: `drop-shadow(0 0 10px ${feature.color}66)`,
                  }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isSquare ? 20 : 26,
                    fontWeight: 600,
                    color: feature.color,
                    margin: 0,
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isSquare ? 14 : 18,
                    color: "#a0aec0",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating tech icons */}
      {["⚡", "🔮", "💡", "🎯"].map((icon, i) => {
        const iconY = Math.sin((frame + i * 30) * 0.03) * 15;
        const iconOpacity = interpolate(frame, [60, 90], [0, 0.3], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${10 + i * 25}%`,
              bottom: isSquare ? 30 : 50,
              transform: `translateY(${iconY}px)`,
              fontSize: isSquare ? 24 : 32,
              opacity: iconOpacity,
            }}
          >
            {icon}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
