import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Loader from "../components/Loader/index.js";
import Footer from "../components/Footer.js";
import GET_PEOPLE from "../queries/GET_PEOPLE.js";
import Person from "../components/Person.js";
import Highlight from "../components/Highlight.js";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin, CSSPlugin);

const PageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 90vh;
  margin-bottom: 10rem;
`;

const FlexContainerStyles = styled.div`
    display: grid;
    &.highlights {
      display: grid;
      width: 100vw;
      height: 80vh;
      gap: 1rem;
      grid-template-columns: repeat(${(props) => props.$cols }, 1fr);
      grid-template-rows: repeat(${(props) => props.$rows }, 1fr);
}
    &.participants{
      ${'' /* width: 100vw; */}
      grid-auto-rows: 1fr;
      grid-template-columns: repeat(${(props) => Math.min(props.$cols, 14)}, 1fr);
      grid-template-rows: repeat(${(props) => Math.min(props.$rows, 14)}, 1fr);
        gap: 2rem;
}
`

const Page = () => {

  const [showPics, setShowPics] = useState("");
  const [addFadeClassToHighlights, setAddFadeClassToHighlights] = useState(false);
  const { loading, error, data } = useQuery(GET_PEOPLE);


  
  let images = []

  const getGridDimensions = (imageCount, maxCols = 4) => {
    if (imageCount === 0) return { cols: 1, rows: 1 };

    const squareRoot = Math.sqrt(imageCount);
    const cols = Math.min(Math.ceil(squareRoot), maxCols);
    const rows = Math.ceil(imageCount / cols);
    return { cols, rows };
  };

  if (showPics === "highlights" && data.highlights[0].images.length > 0) {
    images = ([...data.highlights[0].images]);
  } else if (showPics === "participants" && data.participants[0].images.length > 0) {
    images = [...data.participants[0].images];
  } else{
    images = []
  }

  const totalImages = images.length;
  const totalImagesSq = Math.sqrt(totalImages);
  const totalImagesSqInt = Math.round(totalImagesSq)
  const { cols, rows } = getGridDimensions(totalImages, 4);

  // Trigger scroll animation only for participants section
  useEffect(() => {
    if (showPics === "participants" && totalImages > 0) {
      console.log("in ue")
      // Reset scroll to top first
      window.scrollTo(0, 0);
      
      // Calculate scroll duration based on rows
      // delayPerRow should match the stagger in Person component
      const delayPerRow = 0.3;
      const fadeInDuration = 0.8;
      const totalRevealTime = (rows * delayPerRow) + fadeInDuration;
      
      // Scroll duration = reveal time + extra time to see all content
      // const scrollDuration = totalRevealTime + Math.max(10, rows * 1.5);
      // console.log("totalRevealTime", totalRevealTime)
      const scrollDuration = totalRevealTime + 120;
      console.log("scrollDuration", scrollDuration)
      // Start scrolling immediately with small delay for DOM ready 
      const timer = setTimeout(() => {
        gsap.to(window, {
          duration: scrollDuration,
          scrollTo: { y: "#target", offsetY: 50 },
          ease: "none", // Linear easing for constant speed
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showPics, totalImages, rows]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;


  let flexSize = "xlarge";
  if (totalImages <= 12) {
    flexSize = "xlarge";
  } else if (totalImages >= 13 && totalImages <= 24) {
    flexSize = "large";
  } else if (totalImages >= 25 && totalImages <= 35) {
    flexSize = "medium";
  } else if (totalImages >= 36 && totalImages <= 48) {
    flexSize = "med";
  } else if (totalImages >= 49 && totalImages <= 70) {
    flexSize = "small";
  } else if (totalImages >= 71 && totalImages <= 88) {
    flexSize = "xsmall";
  } else if (totalImages >= 89 && totalImages <= 108) {
    flexSize = "xxsmall";
  } else if (totalImages >= 109 && totalImages <= 160) {
    flexSize = "xxxsmall";
  } else if (totalImages >= 161 && totalImages <= 250) {
    flexSize = "xxxxsmall";
  }

  return (
    <PageStyles>
       {showPics === "participants" ? (
        <>
        <FlexContainerStyles
          className={`${flexSize} participants`}
          $cols={cols}
          $rows={rows}
        >
          {images.map((image, index) => {
            console.log("showing image");
            return (
              <Person 
                key={index}
                index={index}
                totalImagesSqInt={totalImagesSqInt}
                totalImages={images.length}
                image={image}
                showPics={showPics}
                cols={cols}
              />
            );  
          })}   
        </FlexContainerStyles>
        <div id="target" style={{ height: '1vh' }}>
        </div>
        </>
      ) : showPics === "highlights" ? (
        <>
          <FlexContainerStyles 
            className={`${flexSize} highlights`} 
            $cols={cols}
            $rows={rows}
            $totalImagesSqInt={totalImagesSqInt}
          >
            {images.map((image, index) => {
              console.log("showing image");
              return (
                <Highlight 
                  key={index}
                  index={index}
                  image={image}
                  addFadeClassToHighlights={addFadeClassToHighlights}
                />
              ); 
            })}    
          </FlexContainerStyles>
          <div id="target" style={{ height: '1vh' }}>
          </div>
        </>
      ) : null}
      <Footer 
        showPics={showPics} 
        setShowPics={setShowPics} 
        setAddFadeClassToHighlights={setAddFadeClassToHighlights} 
      />
    </PageStyles>
  );
};

export default Page;