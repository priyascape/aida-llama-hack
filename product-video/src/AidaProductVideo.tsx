import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { IntroScene } from "./components/IntroScene";
import { ProblemScene } from "./components/ProblemScene";
import { SolutionScene } from "./components/SolutionScene";
import { FeaturesScene } from "./components/FeaturesScene";
import { DemoScene } from "./components/DemoScene";
import { TechStackScene } from "./components/TechStackScene";
import { CTAScene } from "./components/CTAScene";

export const AidaProductVideo: React.FC = () => {
  const { width, height } = useVideoConfig();
  const isSquare = width === height;

  // Timing in frames (30 fps)
  const introStart = 0;
  const introDuration = 120; // 4 seconds

  const problemStart = introStart + introDuration;
  const problemDuration = 120; // 4 seconds

  const solutionStart = problemStart + problemDuration;
  const solutionDuration = 120; // 4 seconds

  const featuresStart = solutionStart + solutionDuration;
  const featuresDuration = 180; // 6 seconds

  const demoStart = featuresStart + featuresDuration;
  const demoDuration = 150; // 5 seconds

  const techStackStart = demoStart + demoDuration;
  const techStackDuration = 90; // 3 seconds

  const ctaStart = techStackStart + techStackDuration;
  const ctaDuration = 120; // 4 seconds

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #1a2d4a 50%, #0d1f3c 100%)",
      }}
    >
      <Sequence from={introStart} durationInFrames={introDuration}>
        <IntroScene isSquare={isSquare} />
      </Sequence>

      <Sequence from={problemStart} durationInFrames={problemDuration}>
        <ProblemScene isSquare={isSquare} />
      </Sequence>

      <Sequence from={solutionStart} durationInFrames={solutionDuration}>
        <SolutionScene isSquare={isSquare} />
      </Sequence>

      <Sequence from={featuresStart} durationInFrames={featuresDuration}>
        <FeaturesScene isSquare={isSquare} />
      </Sequence>

      <Sequence from={demoStart} durationInFrames={demoDuration}>
        <DemoScene isSquare={isSquare} />
      </Sequence>

      <Sequence from={techStackStart} durationInFrames={techStackDuration}>
        <TechStackScene isSquare={isSquare} />
      </Sequence>

      <Sequence from={ctaStart} durationInFrames={ctaDuration}>
        <CTAScene isSquare={isSquare} />
      </Sequence>
    </AbsoluteFill>
  );
};
