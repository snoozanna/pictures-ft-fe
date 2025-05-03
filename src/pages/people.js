
import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Loader from "../components/Loader/index.js";
import Footer from "../components/Footer.js";
import test from "./../assets/images/test.jpg";
import GET_PEOPLE from "../queries/GET_PEOPLE.js";
import Person from "../components/Person.js";
import Highlight from "../components/Highlight.js";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';




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
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(${(props) => Math.min(props.$totalImagesSqInt, 14)}, 1fr);
  grid-template-rows: repeat(${(props) => Math.min(props.$totalImagesSqInt, 14)}, 1fr);
    gap: 2rem;
  &.highlight{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`



const CloudPage = () => {

  const [showPics, setShowPics] = useState("");
  // const [llength, setLlength] = useState(200);
  // const [images, setImages] = useState([]);
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  let images = []


console.log("data",data)
  // useEffect(() => {

  if (showPics === "highlights" && data.highlights[0].images.length > 0) {
    images = ([...data.highlights[0].images]);
    // setImages([...data.highlights[0].images]);
    console.log("re-rendering with highlights", images)
    
  } else if (showPics === "participants" && data.participants[0].images.length > 0) {
    images = [...data.participants[0].images];
    // setImages([...data.participants[0].images]);
    console.log("totalImages", images.length);
    // setImages[[]];
  //  images = (Array.from({ length: llength }));
   console.log("re-rendering with participants", images)
    
  } else{
    console.log("showpics is", showPics, data.participants[0].images.length )
    // setImages([]);
    images = []
  }
// }, [showPics]);t
 // const reversed = images.reverse(); Reverse the order of the copied array
// // console.log("reversed", reversed);
const totalImages = images.length;
const totalImagesSq = Math.sqrt(totalImages);
const totalImagesSqInt = Math.round(totalImagesSq)





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


  return (
    <CloudPageStyles>
       {showPics === "participants" ? (
        <>
        <FlexContainerStyles 
        className={`${flexSize}`} 
        $totalImagesSqInt={totalImagesSqInt}>  
          {images.map((image, index) => {
         console.log("showing image");
          return (
            <Person key={index}
                index={index}
                totalImagesSqInt={totalImagesSqInt}
                totalImages={images.length}
                image={image}
                showPics={showPics}/>
          );  
        })}   
        </FlexContainerStyles>
        <div id="target" style={{ height: '1vh' }}>
      </div>
      </>
    ) : showPics === "highlights" ? (
      <>
        <FlexContainerStyles className={`${flexSize} highlight`} $totalImagesSqInt={totalImagesSqInt}>
  
          {images.map((image, index) => {
         console.log("showing image");
          return (
            <Highlight key={index}
                index={index}
                image={image}
                totalImages={images.length}
                showPics={showPics}/>
          );  
        })}   
        </FlexContainerStyles>
        <div id="target" style={{ height: '1vh' }}>
        {/* <h1>Target Section</h1> */}
      </div>
      </>
      ) : null}
      <Footer showPics={showPics} setShowPics={setShowPics} />
    </CloudPageStyles>
  );
};


export default CloudPage;

