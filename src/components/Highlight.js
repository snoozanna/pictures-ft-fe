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

const Highlight = ({ index, image }) => {
  useEffect(() => {
    let randomDelay = Math.random() * 6000;

    gsap.fromTo(
      `.element-${index}`,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: randomDelay / 1000,
      }
    );
  }, [index]);

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




{/* <img
className="img"
src={optimizedUrl}
alt={`Image ${index}`}
loading="lazy" // lazy loading
decoding="async" // hint for async decode
width="100%" // responsive
/> */}