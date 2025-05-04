import React, { useEffect } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import styled from "styled-components";
import { urlFor } from "../utils/sanityImageUrl.js";
import test from "./../assets/images/test.jpg";

gsap.registerPlugin(CSSPlugin);

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;

  img {
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Highlight = ({ index, image, addFadeClassToHighlights }) => {
  useEffect(() => {
    const selector = `.element-${index}`;
    const delay = Math.random() * 3; // Random delay for staggered effect

    // Fade in when the component is first rendered
    if (!addFadeClassToHighlights) {
    gsap.fromTo(
      selector,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay }
    );
  }

    // If the fade-out class is passed, trigger the fade-out animation
    if (addFadeClassToHighlights) {
      gsap.to(selector, { opacity: 0, duration: 1, delay: 0 }); // Fade out after 2 seconds
    }
  }, [index, addFadeClassToHighlights]);

  const optimizedUrl = urlFor(image.asset.url)
    .width(1200)
    .format("webp")
    .quality(75)
    .url();

  return (
    <ImageWrapper className={`element-${index}`}>
        {/* <img src={test} alt={`Test image ${index}`} /> */}
      <img
        src={optimizedUrl}
        alt={`Image ${index}`}
        loading="lazy"
        decoding="async"
      />
    </ImageWrapper>
  );
};

export default Highlight;