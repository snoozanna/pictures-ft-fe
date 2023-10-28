const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

module.exports = {
  siteMetadata: {
    title: `Randomiser Test`,
    siteUrl: "https://first.trimester",
    description: "First Trimester by Krisha Istha",
    twitter: "@KrishnaIstha",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    // "gatsby-plugin-transitions",
    {
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
        threshold: 0.1, // Percentage of an element's area that needs to be visible to launch animation
        once: true, // Defines if animation needs to be launched once
        disable: false, // Flag for disabling animations

        // Advanced Options
        selector: "[data-sal]", // Selector of the elements to be animated
        animateClassName: "sal-animate", // Class name which triggers animation
        disabledClassName: "sal-disabled", // Class name which defines the disabled state
        rootMargin: "0% 50%", // Corresponds to root's bounding box margin
        enterEventName: "sal:in", // Enter event name
        exitEventName: "sal:out", // Exit event name
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100,
        },
      },
    },
    "gatsby-plugin-apollo",
    {
      resolve: "gatsby-source-cloudinary",
      options: {
        cloudName: "dcwl3hold",
        apiKey: "815496554688796",
        apiSecret: "00USunOTeGn_pfeaT2eov9RPsPI",
        resourceType: "image", // Adjust as needed
        type: "upload", // Adjust as needed
        prefix: `krishna/`,
        maxResults: 150,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -50,
      },
    },
    {
      // this is the name of the plugin you are adding
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "xjzg01oo",
        dataset: "production",
        watchMode: true,
        apiVersion: "2023-08-01", // use a UTC date string
        token: process.env.GATSBY_SANITY_TOKEN,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
          },
          {
            name: `Glory`,
            file: `https://fonts.googleapis.com/css2?family=Glory:ital,wght@0,300;0,600;0,700;1,300;1,500&display=swap`,
          },
          {
            name: `Inconsolata`,
            file: `https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;600;700;800;900&display=swap`,
          },
          {
            name: `Roboto`,
            file: `https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400;1,700&display=swap`,
          },
        ],
      },
    },
  ],
};
