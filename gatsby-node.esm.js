import { generateImageData } from "gatsby-plugin-image"
import { getGatsbyImageResolver } from "gatsby-plugin-image/graphql-utils"

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});
const fetch = require('node-fetch');

// Image stuff
const generateImageSource = (baseURL, width, height, format, quality) => {
  const src = `${baseURL}?w=${width}&h=${height}&fmt=${format}&q=${quality || 80}`
  return { src, width, height, format }
}
const resolveGatsbyImageData = async (image, options) => {
	const chosenURL = image.urls.raw
	const getURL = chosenURL.split('?')[0]
	const params = new URLSearchParams(chosenURL.split('?')[1])
	const format = params.get('fm')
	const quality = params.get('q')
	const parsedImage = {
		src: getURL,
		format:format,
		quality: quality,
		...image
	}

 const filename = parsedImage.src

 const sourceMetadata = {
	width: parsedImage.width,
	height: parsedImage.height,
	format: parsedImage.format,
	quality: parsedImage.quality
 }
 const imageDataArgs = {
	 ...options,
	 // Passing the plugin name allows for better error messages
	 pluginName: `gatsby-source-pain`,
	 sourceMetadata,
	 filename,
	 generateImageSource,
	 options,
	 backgroundColor: parsedImage.color
 }

 return generateImageData(imageDataArgs)
}
export function createSchemaCustomization({actions}){
	const { createTypes } = actions
  createTypes(`
    type DODDataItem implements Node {
      image: UnsplashImage @link(from: "loopIndex", by: "loopIndex")
    }
  `)
}
export function createResolvers({ createResolvers }) {
  createResolvers({
    UnsplashImage: {
      gatsbyImageData: getGatsbyImageResolver(resolveGatsbyImageData, {
        quality: "Int",
      }),
    },
  })
}
export async function sourceNodes({
  actions: { createNode },
  createContentDigest
}){
	const multiplier = 250
	const imageFetch = await fetch(
    `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_KEY}&page=1&per_page=${multiplier}&query=office`
  );
  const response = await fetch(
    `https://www.defense.gov/data.json`
  );
	
	// Resolve gatsby image data + create image nodes
	const imageData = await imageFetch.json()
	imageData.results.forEach((image, index)=>{
		createNode({
			...image,
			loopIndex: index,
			internal: {
				type: 'UnsplashImage',
				contentDigest: createContentDigest(image)
			}
		});
	})
	// Create nodes for dataset
  const data = await response.json();
	data.dataset.forEach((item, index)=>{
		for(let i = 1; i < multiplier; i++){
			createNode({
				...item,
				id: `${item.identifier}-${i}`,
				loopIndex: i,
				pageNumber: (index+1)*i,
				internal: {
					type: 'DODDataItem',
					contentDigest: createContentDigest(item)
				}
			});
		}
	})

};