import { graphql, Link } from "gatsby"
import * as React from "react"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const PageButtons = ({numOfPages}) =>{
  const array =[]
  for(let i = 1; i <numOfPages; i++){
    array.push(i)
    // return <Link to={`/page=${i}`}>{i}</Link>
  }
  return(<>
    {array.map(num=><Link to={`/page=${num}`}>{num}</Link>)}
  </>)
}
export default function IndexPage({data, location}) {
  const paths = data.allSitePage.edges.map(({node}) => node.path)
  const search = new URLSearchParams(location.search)
  const pageNumber = search.get('page')
  const itemsPerPage = 250
  const pathsByPage = pageNumber ? paths.slice(itemsPerPage*(pageNumber-1), itemsPerPage*pageNumber):paths.slice(0, itemsPerPage)
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>Gatsby test site w/large number of pages</Typography>
     <small>total pages: {paths.length}</small><br />
     <Box sx={{mw: 50, overflow: 'scroll'}}>
     <PageButtons numOfPages={paths.length/itemsPerPage} />
     </Box>
     <p>Uses random large data set (<a href="https://www.defense.gov/data.json">https://www.defense.gov/data.json</a>) to build large number of pages with Gatsby.</p>
     {pathsByPage.map(path=><Link to={`${path}`} style={{display: 'block'}}>{`${path}`}</Link>)}
     </Box>
    </Container>
  )
}
export const query = graphql`
  query HomepageQuery {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`


