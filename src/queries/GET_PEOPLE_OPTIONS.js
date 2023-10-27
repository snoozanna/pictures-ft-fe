import { gql } from "@apollo/client";
// import gql from 'graphql-tag';
const GET_PEOPLE_OPTIONS = gql`
  {
    options: allOptions {
      images {
        asset {
          _id
          url
          # gatsbyImageData
          # gatsbyImage(width: 10)
        }
      }
    }
  }
`;

export default GET_PEOPLE_OPTIONS;
