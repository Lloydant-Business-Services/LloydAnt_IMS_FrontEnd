import React from "react"
import { graphql } from "gatsby"

const myfiles = ({ data }) => (
  <>
    <h1>Data</h1>
    <table>
      <tbody>
        <tr>
          <td>Extension</td>
          <td>URL</td>
          <td>modifiedTime</td>
        </tr>
        {data
          ? data.allFile.edges.map((datum, key) => {
              return (
                <tr key={key}>
                  <td>{datum.node.extension}</td>
                  <td>{datum.node.publicURL}</td>
                  <td>{datum.node.modifiedTime}</td>
                  <td>{datum.node.extension}</td>
                </tr>
              )
            })
          : null}
      </tbody>
      {console.log(data.allFile)}
    </table>
  </>
)

export default myfiles
export const query = graphql`
  query {
    allFile {
      totalCount
      edges {
        node {
          extension
          dir
          modifiedTime
          publicURL
        }
      }
    }
  }
`
