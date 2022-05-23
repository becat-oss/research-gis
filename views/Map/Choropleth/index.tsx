import React from "react";
import { FeatureGroup } from "react-leaflet";
import { Feature } from "../../../AppTypes";
import { PolygonFeature } from "../Polygon";

interface Props{
  feature:Feature,
  index:number,
  value:number
}

export default function Choropleth({feature,index,value}:Props):React.ReactElement{
  // const polygonElm:number[] = feature.geometry.coordinates[0][0].map(coord=>{
  //   return [coord[1],coord[0]]
  // })
  return (
    <FeatureGroup key={index}>
      <PolygonFeature />
    </FeatureGroup>
    
  )
}