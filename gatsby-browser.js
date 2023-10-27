import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./src/gatsby-plugin-apollo/client";
import Layout from "./src/components/Layout";


export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
{element}
  </ApolloProvider>
);
