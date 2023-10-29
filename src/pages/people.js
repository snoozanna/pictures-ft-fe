
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { devices } from "../styles/breakpoints.js";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import Loader from "../components/Loader/index.js";
import GET_PEOPLE_OPTIONS from "../queries/GET_PEOPLE_OPTIONS.js";
import Footer from "../components/Footer.js";

const CloudPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  /* align-items: center; */
  min-height: 90vh;
  margin-bottom: 10rem;
`;

const FlexContainerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: auto;
  gap: 1.5rem;
  height: 70vh;
`;



const FlexItemStyles = styled.div`
  /* flex: calc(100% / ${(props) => props.totalImages}); */
  width: calc(100% / ${(props) => props.totalImages}*100);
  /* flex: 1; */
  /* width: 100px; */
  max-width: 100%;
  /* min-width: 100px; */
  box-sizing: border-box;
  overflow: hidden;
`;



const Person = ({ index, image, totalImages }) => {
  useEffect(() => {
    gsap.registerPlugin(CSSPlugin);

    // Generate a random delay value between 0 and 10 seconds.
    const randomDelay = Math.random() * 10000;

    // Calculate the animation duration for each element to ensure the total duration is 10 seconds.
    const animationDuration = 0.5;

    gsap.fromTo(
      `.element-${index}`,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        delay: randomDelay / 1000,
      },
    );
  }, [index]);

  // const imgStyles = {
  //   width: `${100 / totalImages}%`,
  // };
  // console.log("totalImages", totalImages);

  return (
    <FlexItemStyles className={`img-wrapper element-${index}`} 
    // style={imgStyles}
     totalImages={totalImages}
     >
      <img className="img" src={image.asset.url} alt={`Image ${index}`} />
    </FlexItemStyles>
  );
};

const CloudPage = () => {
  const [showPics, setShowPics] = useState(false);
  // const [getPeople, { loading, error, data }] = useLazyQuery(GET_CLOUD_PEOPLE);
  const { loading, error, data } = useQuery(GET_PEOPLE_OPTIONS);

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
console.log(data)
  const images = data.options[0].images;
  console.log(images.length)


  return (
    <CloudPageStyles>
      {showPics ? (
        <FlexContainerStyles>
          {images.map((image, index) => {
            return (
              <Person
                key={index}
                index={index}
                image={image}
                totalImages={images.length}
              />
            );
          })}
        </FlexContainerStyles>
      ) : null}
      <Footer showPics={showPics} setShowPics={setShowPics}/>
    </CloudPageStyles>
  );
};


export default CloudPage;


// import { Link, graphql, useStaticQuery } from "gatsby";
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { devices } from "../styles/breakpoints.js";
// import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

// import { useQuery, useLazyQuery, gql } from "@apollo/client";
// import { gsap } from "gsap";
// import { CSSPlugin } from "gsap/CSSPlugin";
// import Loader from "../components/Loader/index.js";
// import GET_PEOPLE_OPTIONS from "../queries/GET_PEOPLE_OPTIONS.js";

// const CloudPageStyles = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   width: 100%;
//   align-items: center;
//   min-height: 90vh;
//   .img-group-container {
//     display: flex;
//     flex-wrap: wrap;
//     width: 100%;
//     gap: 2rem;
//     height: 100%;
//     position: relative;
//   }
//   .img-wrapper {
//     position: absolute;
//   }
//   .img {
//     max-width: 100%;
//   }
//   .element {
//     opacity: 0;
//     transform: translateY(20px);
//     transition:
//       opacity 0.5s,
//       transform 0.5s;
//   }
//   .animate {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const getRandomPosition = () => {
//   const randomX = Math.floor(Math.random() * 90); // Random horizontal position (0-90%)
//   const randomY = Math.floor(Math.random() * 90); // Random vertical position (0-90%)
//   return { left: `${randomX}%`, top: `${randomY}%` };
// };

// const shuffleArray = (array) => {
//   const shuffledArray = [...array];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// };

// const Person = ({ index, image, totalImages }) => {
//   useEffect(() => {
//     gsap.registerPlugin(CSSPlugin);

//     gsap.fromTo(
//       `.element-${index}`,
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 0.5, delay: 0.2 * index },
//     );
//   }, [index]);

//   const imgStyles = {
//     width: `${300 / totalImages}%`,
//     ...getRandomPosition(), // Apply random position to each image
//   };

//   return (
//     <div className={`img-wrapper element-${index}`} style={imgStyles}>
//       <img className="img" src={image.asset.url} alt={`Image ${index}`} />
//     </div>
//   );
// };

// const CloudPage = () => {
//   const [showPics, setShowPics] = useState(false);
//   const { loading, error, data } = useQuery(GET_PEOPLE_OPTIONS);

//   if (loading) return <Loader />;
//   if (error) return <p>Error: {JSON.stringify(error)}</p>;
//   if (!data) return <p>Could not find data</p>;

//   const images = data.options[0].images;
//   const shuffledImages = shuffleArray(images);

//   const clickHandler = () => {
//     setShowPics(!showPics);
//   };

//   return (
//     <CloudPageStyles>
//       {showPics ? (
//         <div className="img-group-container">
//           {shuffledImages.map((image, index) => {
//             return (
//               <Person
//                 key={index}
//                 index={index}
//                 image={image}
//                 totalImages={shuffledImages.length}
//               />
//             );
//           })}
//         </div>
//       ) : null}
//       <button onClick={clickHandler}>Go</button>
//     </CloudPageStyles>
//   );
// };

// export default CloudPage;
