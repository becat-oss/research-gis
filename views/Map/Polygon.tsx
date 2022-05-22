import React from "react";
import { FeatureGroup, Polygon } from "react-leaflet";
import { Attribute, Feature } from "../../AppTypes";

interface Props{
  feature:Feature,
  index:number,
  value:number
}

const blackOptions = { color: 'black' }

//TODO: color barの作り方をBAUES Analysisから学ぶ
function getColor(d:number){
  return d > 1000 ? '#800026' :
         d > 900  ? '#BD0026' :
         d > 800  ? '#E31A1C' :
         d > 700  ? '#FC4E2A' :
         d > 600   ? '#FD8D3C' :
         d > 500   ? '#FEB24C' :
         d > 400   ? '#FED976' :
                    '#FFEDA0';
}

function style( value:number){

  return {
    color: getColor(value),
  }
}

export function PolygonFeature({feature,index,value}:Props):React.ReactElement{
  const polygonElm = feature.geometry.coordinates[0][0].map(coord=>{
    return [coord[1],coord[0]]
  })

  return(
    <FeatureGroup key={index}>
      <Polygon pathOptions={style(value)} positions={polygonElm}/>
    </FeatureGroup>
  )
}