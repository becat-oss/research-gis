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
  console.log('res',res);
  //型を変換する
  //@ts-ignore
  const points = res.data.listGis.items.map(point => {
    return new InputPoint(point as InputPointPayload)
  })

  return points
}

const layerQuery = `
  query listGisLayerDevs {
    listGisLayerDevs {
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

//TODO: Layerをデータベースから取得するコードを書く
export async function fetchLayers(): Promise<Layer[]> {
  const res = await API.graphql(graphqlOperation(layerQuery))
  console.log('res',res);
  //型を変換する
  //@ts-ignore
  const layers = res.data.listGisLayerDevs.items.map((layer:LayerPayload) => {
    return new Layer(layer.name,Number(layer.index),layer.id,layer.isVisible,layer.color);
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

const layerMutation = `
  mutation createGisLayerDev($creategislayerinput: CreateGisLayerDevInput!) {
    createGisLayerDev(input: $creategislayerinput){
      color
      index
      isVisible
      name
      userId
    }
  }
`

export async function createLayer(layer:Layer) {
  //coordinateの型を変換する必要
  //とりあえずcreateGis mutationに関してうまくいくようにする
  console.log('layer.toPayload()',layer.toPayload());
  const params =  {
    "creategislayerinput": layer.toPayload()
  }

  await API.graphql({
    query: layerMutation,
    variables: params
  })
  
}