import { Composition } from "remotion";
import { AidaProductVideo } from "./AidaProductVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AidaProductVideo"
        component={AidaProductVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AidaProductVideoShort"
        component={AidaProductVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
