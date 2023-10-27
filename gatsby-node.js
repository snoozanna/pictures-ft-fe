exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Define a type for CloudinaryMedia
  createTypes(`
    type CloudinaryMedia implements Node @infer {
      public_id: String!
      secure_url: String!
    }
  `);
};
