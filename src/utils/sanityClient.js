import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'h537re3j', // your project ID
  dataset: 'production',
  useCdn: true, // faster for public content
  apiVersion: '2023-01-01', // lock to a specific version
});

export default client;