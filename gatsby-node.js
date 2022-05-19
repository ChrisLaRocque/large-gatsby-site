const fetch = require('node-fetch');

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
	const multiplier = 200
  const response = await fetch(
    `https://www.defense.gov/data.json`
  );

  const data = await response.json();
	data.dataset.forEach((item)=>{
		for(let i = 0; i < multiplier; i++){
			createNode({
				...item,
				id: `${item.identifier}-${i}`,
				internal: {
					type: 'DODDataItem',
					contentDigest: createContentDigest(item)
				}
			});
		}
		// createNode({
    //   ...item,
    //   id: item.identifier,
    //   internal: {
    //     type: 'DODDataItem',
    //     contentDigest: createContentDigest(item)
    //   }
    // });
	})
};