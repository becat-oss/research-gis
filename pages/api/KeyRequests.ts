import { API, graphqlOperation } from 'aws-amplify';
import { InputPoint } from '../../utils/InputPoint';
import { InputPointData, InputPointPayload } from '../../AppTypes';
import { Layer, LayerPayload } from '../../utils/Layer';

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

export async function fetchPoints(): Promise<InputPoint[]> {
  const res = await API.graphql({ query })
  //型を変換する
  //@ts-ignore
  const points = res.data.listGis.items.map(point => {

    return new InputPoint(point as InputPointPayload)
  })

  return points
}

const layerQuery = `
  query listGisLayers {
    listGisLayers {
      items {
        color
        isVisible
        name
        userId
        index
      }
    }
  }
`

export async function createLayer(layer:LayerPayload) {
  //coordinateの型を変換する必要
  //とりあえずcreateGis mutationに関してうまくいくようにする
  await API.graphql({
    query: mutation,
    variables: layer
  })
}

//TODO: Layerをデータベースから取得するコードを書く
export async function fetchLayers(): Promise<Layer[]> {
  const res = await API.graphql(graphqlOperation(layerQuery))
  //型を変換する
  //@ts-ignore
  const layers = res.data.listGisLayers.items.map((layer:LayerPayload) => {
    console.log('layer',layer)
    return new Layer(layer.name,Number(layer.index),layer.isVisible,layer.color);
  })

  return layers
}

const mutation = `
  mutation createGis($creategisinput: CreateGisInput!) {
    createGis(input: $creategisinput) {
      id
      tag
      coordinate
      value
      description
    }
  }
`

export async function createPoint(point:InputPoint) {
  //coordinateの型を変換する必要
  //とりあえずcreateGis mutationに関してうまくいくようにする

  const params =  {
    "creategisinput": point.toPayload()
  }

  await API.graphql({
    query: mutation,
    variables: params
  })
  console.log('point',point)
}