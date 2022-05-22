import React from "react";
import { FeatureGroup, Polygon, Popup } from "react-leaflet";
import { Attribute, Feature } from "../../AppTypes";
import hsl from 'hsl-to-hex';
import { objectOpacity, threeAdjustment, hueMaxMap as hueMax, hueMin, defaultSaturation, defaultLightness } from '../../utils/Color';

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
  const maximum = 1100;
  const minimum = 700;
  const normalizedMinMax = (maximum - value) / (maximum - minimum) * (hueMax - hueMin) + hueMin - threeAdjustment;
  const result = normalizedMinMax < hueMin ? hueMin : (normalizedMinMax > hueMax ? hueMax : (isNaN(normalizedMinMax) ? hueMax : normalizedMinMax));
  return {
    color: hsl(result*360, defaultSaturation*100, defaultLightness*100),
  }
}

export function PolygonFeature({feature,index,value}:Props):React.ReactElement{
  const polygonElm = feature.geometry.coordinates[0][0].map(coord=>{
    return [coord[1],coord[0]]
  })

  return(
    <FeatureGroup key={index}>
      <Popup>
        <p>{feature.id}</p>
        <p>一人当たり総生産（令和1年度）</p>
        <p>{value}万円</p>
      </Popup>
      <Polygon pathOptions={style(value)} positions={polygonElm}/>
    </FeatureGroup>
  )
}