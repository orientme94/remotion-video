import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { InstagramCta, instagramCtaSchema } from "./InstagramCta";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
      <Composition
        // npx remotion render InstagramCta out/lisowczycy-cta.mp4
        id="InstagramCta"
        component={InstagramCta}
        schema={instagramCtaSchema}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          handle: "lisowczycy",
          displayName: "Lisowczycy",
          tagline: "Historia, która wciąż galopuje ⚔️",
          accentColor: "#e0b04a",
        }}
      />
    </>
  );
};
