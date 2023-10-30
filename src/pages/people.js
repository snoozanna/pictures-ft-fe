
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
  /* display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: auto;
  gap: 1.5rem;
  height: 70vh; */
  display: grid;

  grid-auto-rows: 1fr; /* Set the height of each row to 1fr for equal distribution */
  /* Adjust the gap as needed */
  justify-content: space-evenly;
  align-content: start; /* Adjust this as needed to control vertical alignment */
  overflow: auto;
  grid-auto-flow: dense; /* Controls how items are placed in the grid */
  &.xlarge {
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
    grid-gap: 2rem;
  }
  s &.large {
    grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
    grid-gap: 2rem;
  }
  &.medium {
    grid-template-columns: repeat(auto-fill, minmax(12%, 1fr));
    grid-gap: 2rem;
  }
  &.med {
    grid-template-columns: repeat(auto-fill, minmax(11%, 1fr));
    grid-gap: 2rem;
  }
  &.small {
    grid-template-columns: repeat(auto-fill, minmax(9%, 1fr));
    grid-gap: 2rem;
  }
  &.xsmall {
    grid-template-columns: repeat(auto-fill, minmax(8%, 1fr));
    grid-gap: 2rem;
  }
  &.xxsmall {
    grid-template-columns: repeat(auto-fill,minmax(7.5%,1fr));
    grid-gap: 1rem;
  }
   &.xxxsmall {
    grid-template-columns: repeat(auto-fill,minmax(7.5%,1fr));
    grid-gap: 1rem;
  }
`;



const FlexItemStyles = styled.div`
  /* flex: calc(100% / ${(props) => props.totalImages}); */
  width: calc(100% / ${(props) => props.totalImages}*100);
  /* flex: 1; */
  /* width: 100px; */
  max-width: 100%;
  /* min-width: 100px; */
  box-sizing: border-box;
  /* overflow: hidden; */
  object-fit: cover;
`;

// const FlexItemStyles = styled.div`
  
//   width: calc(100% / ${(props) => props.totalImages}*100);

//   max-width: 100%;

//   box-sizing: border-box;

//   object-fit: cover;
//   border: 3px solid white;
// `;



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
    <FlexItemStyles
      className={`img-wrapper element-${index}`}
      // style={imgStyles}
      totalImages={totalImages}
    >
      <img className="img" src={image.asset.url} alt={`Image ${index}`} />
    </FlexItemStyles>
  );
};

const CloudPage = () => {
  const [showPics, setShowPics] = useState(false);
//   // const [getPeople, { loading, error, data }] = useLazyQuery(GET_CLOUD_PEOPLE);
  const { loading, error, data } = useQuery(GET_PEOPLE_OPTIONS);

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
console.log(data)
  const images = data.options[0].images;
  console.log(images.length)
// const images = ["test", "test", "test", "test", "test", "test", "test", "test", "test",];

  let flexSize = "xlarge"
if (images.length <= 12) {
    flexSize = "xlarge"
}else if (images.length >= 13 && images.length <= 24) {
    flexSize = "large"
  } else if (images.length >= 25 && images.length <= 35) {
    flexSize = "medium";
  }  else if (images.length >= 36 && images.length <= 48) {
    flexSize = "med";
  } else if (images.length >= 49 && images.length <= 70) {
    flexSize = "small";
  } else if (images.length >= 71 && images.length <= 88) {
    flexSize = "xsmall";
  } else if (images.length >= 89 && images.length <= 108) {
    flexSize = "xxsmall";
  } else if (images.length >= 109 && images.length <= 160) {
    flexSize = "xxxsmall";
  }

  console.log("flexSize", flexSize)
    return (
      <CloudPageStyles>
        {showPics ? (
          <FlexContainerStyles className={`${flexSize}`}>
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
        <Footer showPics={showPics} setShowPics={setShowPics} />
      </CloudPageStyles>
    );
};


export default CloudPage;

