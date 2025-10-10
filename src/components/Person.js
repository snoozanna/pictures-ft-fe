// import React, { useEffect } from "react";
// import { gsap } from "gsap";
// import { CSSPlugin } from "gsap/CSSPlugin";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import styled from "styled-components";
// import { urlFor } from "../utils/sanityImageUrl.js"; // Adjust path

// const FlexItemStyles = styled.div`
//   min-width: 3vw;
//   width: 100%;
// `;

// const Person = ({ index, totalImages, totalImagesSqInt, image }) => {
//   const imgWidth = Math.round(100 / totalImagesSqInt);
//   gsap.registerPlugin(ScrollToPlugin, CSSPlugin);

//   useEffect(() => {
//     let randomDelay = Math.random() * 10000;
//     let animationDuration = 2;

//     gsap.fromTo(
//       `.element-${index}`,
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: animationDuration,
//         delay: randomDelay / 1000,
//       }
//     );
//   }, []);

//   useEffect(() => {
//     gsap.to(window, {
//       duration: 20,
//       scrollTo: { y: "#target", offsetY: 50 },
//       delay: 2,
//       ease: "linear",
//       // ease: "none",
//     });
//   }, []);

//   const optimizedUrl = urlFor(image.asset.url)
//     .width(400) // Or base on imgWidth or screen size
//     .format("webp")
//     .quality(75)
//     .url();

//   return (
//     <FlexItemStyles
//       className={`img-wrapper element-${index}`}
//       totalImages={totalImages}
//       $imgWidth={imgWidth}
//     >
//       <img
//         className="img"
//         src={optimizedUrl}
//         alt={`Image ${index}`}
//         loading="lazy"
//         decoding="async"
//         width="100%"
//       />
//     </FlexItemStyles>
//   );
// };

// export default Person;


import React, { useEffect } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import styled from "styled-components";
import { urlFor } from "../utils/sanityImageUrl.js"; // Adjust path

gsap.registerPlugin(CSSPlugin);

const FlexItemStyles = styled.div`
  min-width: 3vw;
  width: 100%;
`;

const Person = ({ index, totalImages, totalImagesSqInt, image }) => {
  const imgWidth = Math.round(100 / totalImagesSqInt);

  useEffect(() => {
    let randomDelay = Math.random() * 1000;
    let animationDuration = 2;

    gsap.fromTo(
      `.element-${index}`,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        delay: 0
      }
    );
  }, [index]);

  const optimizedUrl = urlFor(image.asset.url)
    .width(400) // Or base on imgWidth or screen size
    .format("webp")
    .quality(75)
    .url();

  return (
    <FlexItemStyles
      className={`img-wrapper element-${index}`}
      totalImages={totalImages}
      $imgWidth={imgWidth}
    >
      <img
        className="img"
        src={optimizedUrl}
        alt={`Image ${index}`}
        loading="lazy"
        decoding="async"
        width="100%"
      />
    </FlexItemStyles>
  );
};

export default Person;