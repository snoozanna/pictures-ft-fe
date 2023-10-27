import { gql } from "@apollo/client";
// import gql from 'graphql-tag';
const GET_PEOPLE = gql`
  {
    people: allPerson {
      caption
      image {
        asset {
          url
        }
      }
    }
  }
`;

export default GET_PEOPLE;
