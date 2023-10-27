import { gql } from "@apollo/client";
// import gql from 'graphql-tag';
const GET_CLOUD_PEOPLE = gql`
  #  { allCloudinaryMedia(filter: { public_id: { regex: "krishna/" } })
  #         public_id
  #         secure_url

  #   }
  {
    cloud: allCloudinaryMedia {
      nodes {
        totalCount
      }
    }
  }
`;

export default GET_CLOUD_PEOPLE;
