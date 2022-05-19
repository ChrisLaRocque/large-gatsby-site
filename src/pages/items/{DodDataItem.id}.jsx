import { graphql } from "gatsby";
import React from "react";

export default function DodPage({ data }) {
  console.log("data", data);
  const { title, description } = data.dodDataItem;
  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}
export const query = graphql`
  query ($id: String) {
    dodDataItem(id: { eq: $id }) {
      title
      description
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
