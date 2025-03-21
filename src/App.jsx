import React, { Suspense, useRef, useState } from "react";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { Environment, Loader } from "@react-three/drei";

import { BodyCopy, Headline, Subtitle } from "./Text";
import { Image } from "./Image";
import { ImageCube } from "./ImageCube";
import { WebGLBackground } from "./WebGLBackground";
import { Lens } from "./Lens";
import CodropsFrame from "./CodropsFrame";
import EffectsToggle from "./EffectsToggle";

import "@14islands/r3f-scroll-rig/css";

// Photos by <a href="https://unsplash.com/@maxberg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maxim Berg</a> on <a href="https://unsplash.com/photos/u8maxDvbae8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

export default function App() {
  const eventSource = useRef();
  const [enabled, setEnabled] = useState(true);

  return (
    // We attach events onparent div in order to get events on both canvas and DOM
    <div ref={eventSource}>
      <CodropsFrame />
      <GlobalCanvas
        // shader errors are hidden by default which speeds up compilation
        debug={false}
        // scaleMultiplier is a scroll-rig setting to scale the entire scene
        scaleMultiplier={0.01}
        // All other props on the R3F Canvas is supported:
        eventSource={eventSource}
        eventPrefix="client"
        flat // disable toneMapping since we have editorial images
        camera={{ fov: 14 }}
        style={{ pointerEvents: "none", zIndex: -1 }}
      >
        {(globalChildren) => (
          <Lens>
            <WebGLBackground />
            <Suspense fallback="">
              {/* 
                Our materials use PBR ligting and requires an environment
              */}
              <Environment files="env/empty_warehouse_01_1k.hdr" />
              {globalChildren}
            </Suspense>
          </Lens>
        )}
      </GlobalCanvas>
      <SmoothScrollbar
        enabled={enabled}
        config={{ syncTouch: true }} // Lenis setting to force smooth scroll on touch devices
      />
      <article>
        <EffectsToggle setEnabled={setEnabled} enabled={enabled} />
        <header className="container">
          <div className="headerLayout">
            <h2>
              <Headline wobble>
                BRYANT CPU {enabled ? "PLACE" : "HTML"}
              </Headline>
            </h2>
            <BodyCopy wobble as="p" className="subline">
            In the realm where art and innovation converge, I stand as the architect transforming visionary concepts into interactive tapestries for the digital age.
            </BodyCopy>
          </div>
        </header>
        <section className="container">
          <Image
            src="images/Kassem El Solh - RMW01575-ARW.jpg"
            className="ImageLandscape"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>Spearheaded the ‘X’ sculpture project for Adriatique,</Subtitle>
            <em>
              <Subtitle>
              blending electronic music with a dynamic physical art form.
              </Subtitle>
            </em>
          </h3>
          <p>
            <BodyCopy>
              Try turning off WebGL using the button in the sticky header.
              You’ll notice smooth scrolling is disabled, and all scroll-bound
              WebGL effects disappears.
            </BodyCopy>
          </p>
        </section>
        <section className="ParallaxContainer">
          <Image
            src="images/TB_Adriatique_X_SP_highres7369.jpg"
            className="aspect-9_13"
            parallaxSpeed={1.08}
          />
          <Image
            src="images/20230514_raulsanchez_Pacha_Adriatique00006.jpg"
            className="aspect-16_11"
            parallaxSpeed={0.92}
          />
        </section>
        <section className="ParallaxContainer">
          <Image
            src="images/20230514_raulsanchez_Pacha_Adriatique00006.jpg"
            className="aspect-9_16"
            parallaxSpeed={1.08}
          />
          <Image
            src="images/TB_Adriatique_X_SP_highres7369.jpg"
            className="aspect-16_9"
            parallaxSpeed={0.92}
          />
        </section>
        <section className="container">
          <h4>
            <BodyCopy>
              Thanks to Threejs we can also render 3D geometry or models. The
              following image is replaced by a box. Try scrolling hard to make
              it wiggle.
            </BodyCopy>
          </h4>
        </section>
        <section>
          <ImageCube
            src="images/TB_Adriatique_X_SP_highres7514.jpg"
            className="JellyPlaceholder"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>Most websites use a mix of WebGL and HTML.</Subtitle>
            <em>
              <Subtitle>
                However, the Lens refraction requires all images and text to be
                WebGL.
              </Subtitle>
            </em>
          </h3>
          <p>
            <a href="https://github.com/14islands/r3f-scroll-rig">
              <BodyCopy>
                You can find the r3f-scroll-rig library on Github. Please use
                WebGL responsibly™.
              </BodyCopy>
            </a>
          </p>
        </section>
        <footer>
          <CodropsFrame />
        </footer>
      </article>

      <Loader
        containerStyles={{
          background: "transparent",
          top: "auto",
          bottom: 0,
          height: "5px",
        }}
        innerStyles={{ background: "white", width: "100vw", height: "5px" }}
        barStyles={{ background: "#6e6bcd", height: "100%" }}
      />
    </div>
  );
}
