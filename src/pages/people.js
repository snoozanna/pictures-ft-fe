
import React, {useState } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Loader from "../components/Loader/index.js";
import Footer from "../components/Footer.js";
import Person from "../components/Person.js";
import GET_PEOPLE from "../queries/GET_PEOPLE.js";



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
  &.large {
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
    grid-template-columns: repeat(auto-fill, minmax(7.5%, 1fr));
    grid-gap: 1rem;
  }
  &.xxxsmall {
    grid-template-columns: repeat(auto-fill, minmax(7%, 1fr));
    grid-gap: 1rem;
  }
  &.xxxxsmall {
    grid-template-columns: repeat(auto-fill, minmax(6.5%, 1fr));
    grid-gap: 1rem;
  }
`;



const CloudPage = () => {
  const [showPics, setShowPics] = useState("");
  //   // const [getPeople, { loading, error, data }] = useLazyQuery(GET_CLOUD_PEOPLE);
  const { loading, error, data } = useQuery(GET_PEOPLE);
console.log("running cloud again")
  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  console.log(data);
  let images = [];
  if (showPics === "highlights" && data.highlights.length > 0) {
    images = [...data.highlights[0].images];
    console.log("images in if", images);
  } else if (showPics === "participants" && data.participants.length > 0) {
    images = [...data.participants[0].images];
    console.log("images in if", images);
  } else{
    console.log("error with if statement", showPics, data.participants.length )
  }

  console.log("showPics", showPics);
  console.log("images", images);
  const reversed = images.reverse(); // Reverse the order of the copied array
  // console.log("reversed", reversed);

  let flexSize = "xlarge";
  if (images.length <= 12) {
    flexSize = "xlarge";
  } else if (images.length >= 13 && images.length <= 24) {
    flexSize = "large";
  } else if (images.length >= 25 && images.length <= 35) {
    flexSize = "medium";
  } else if (images.length >= 36 && images.length <= 48) {
    flexSize = "med";
  } else if (images.length >= 49 && images.length <= 70) {
    flexSize = "small";
  } else if (images.length >= 71 && images.length <= 88) {
    flexSize = "xsmall";
  } else if (images.length >= 89 && images.length <= 108) {
    flexSize = "xxsmall";
  } else if (images.length >= 109 && images.length <= 160) {
    flexSize = "xxxsmall";
  } else if (images.length >= 161 && images.length <= 250) {
    flexSize = "xxxxsmall";
  }

  // console.log("flexSize", flexSize);
  console.log("totalImages", images.length);
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
                showPics={showPics}
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

