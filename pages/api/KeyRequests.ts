import { API } from 'aws-amplify';
import { InputPointData } from '../../AppTypes';

const query = `
  query listGis {
    listGis {
      items {
        id
        tag
        coordinate
        value
        description
      }
    }
  }
`

export async function fetchPoints(){
  const res = await API.graphql({ query })
  //型を変換する
  //@ts-ignore
  const points = res.data.listGis.items.map(point => {
    return {
      ...point,
      coordinate:{
        lat: point.coordinate[0],
        lng: point.coordinate[1]
      },
    }
  }) as InputPointData[]

  return points
}

const mutation = `
  mutation createResearchGis($createresearchgisinput: CreateResearchGisInput!) {
    createResearchGis(input: $createresearchgisinput) {
      id
      tag
      value
      description
    }
  }
`

async function createPoint(point:InputPointData) {
  //coordinateの型を変換する必要
  //とりあえずcreateGis mutationに関してうまくいくようにする
  await API.graphql({
    query: mutation,
    variables: point
  })
  console.log('point',point)
}