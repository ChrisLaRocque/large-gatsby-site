import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
export default function DodPage({ data }) {
  const {
    title,
    description,
    keyword,
    modified,
    publisher,
    distribution,
    image,
  } = data.dodDataItem;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <GatsbyImage image={image.gatsbyImageData} />
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <small>Modified: {modified}</small>
        <p>{description}</p>
        <p>
          <strong>Publisher: {publisher.name}</strong>
        </p>
        <p>
          <strong>
            Download URL: <a href={distribution[0].downloadURL}>Download</a>
          </strong>
        </p>

        {keyword && (
          <>
            <p>Keywords</p>
            <ul>
              {keyword.map((word) => (
                <li>{word}</li>
              ))}
            </ul>
          </>
        )}
      </Box>
    </Container>
  );
}
export const query = graphql`
  query ($id: String) {
    dodDataItem(id: { eq: $id }) {
      title
      description
      keyword
      modified
      publisher {
        name
      }
      distribution {
        downloadURL
      }
      image {
        gatsbyImageData
      }
    }
  }
`;
// export async function config() {
//   return ({ params }) => {
//     return {
//       defer: true,
//     };
//   };
// }
