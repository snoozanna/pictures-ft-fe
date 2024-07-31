import { gql } from "@apollo/client";
// import gql from 'graphql-tag';
const GET_PEOPLE = gql`
  {
    participants: allParticipants{
      name
      images{
        asset{
          url
        }
      }
    }
    highlights: allHighlight{
      name
      images{
        asset{
          url
        }
      }
    }
  }
`;

export default GET_PEOPLE;
