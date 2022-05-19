import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
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
    <main>
      <GatsbyImage image={image.gatsbyImageData} />
      <h1>{title}</h1>
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
    </main>
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
export async function config() {
  return ({ params }) => {
    return {
      defer: true,
    };
  };
}
