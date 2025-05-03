import React, { useEffect } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import styled from "styled-components";
import { urlFor } from "../utils/sanityImageUrl.js"; // Adjust path
gsap.registerPlugin(CSSPlugin);

const FlexItemStyles = styled.div`
  min-width: 3vw;
  width: 80%;
  max-width: 20%;
`;

const Highlight = ({ index, totalImages, image }) => {
  useEffect(() => {
    let randomDelay = Math.random() * 6000;
    let animationDuration = 0.5;

    gsap.fromTo(
      `.element-${index}`,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        delay: randomDelay / 1000,
      }
    );
  }, [index]);

  const optimizedUrl = urlFor(image.asset.url)
    .width(600) // adjust based on expected display size
    .format("webp") // modern, smaller image format
    .quality(75) // balance between quality and file size
    .url();

  return (
    <FlexItemStyles
      className={`img-wrapper element-${index} highlight`}
      totalImages={totalImages}
    >
      <img
        className="img"
        src={optimizedUrl}
        alt={`Image ${index}`}
        loading="lazy" // lazy loading
        decoding="async" // hint for async decode
        width="100%" // responsive
      />
    </FlexItemStyles>
  );
};

export default Highlight;
