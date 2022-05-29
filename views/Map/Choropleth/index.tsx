import React from "react";
import { FeatureGroup, Popup } from "react-leaflet";
import { Feature } from "../../../AppTypes";
import { PolygonFeature } from "../Polygon";
import hsl from 'hsl-to-hex';
import { threeAdjustment, hueMaxMap as hueMax, hueMin, defaultSaturation, defaultLightness } from '../../../utils/Color';
import { useMapContext } from "../mapContext";
import Sidebar from "../../../components/Sidebar";
import ColorScale from "../ColorScale";
import DataSelector from "./dataSelector";
import ChoroplethPopup from "./Popup";

interface Props{
  feature:Feature,
  index:number,
  value:number
}

function valueToColor(value:number, min:number, max:number){
  

  const normalizedMinMax = (max - value) / (max - min) * (hueMax - hueMin) + hueMin - threeAdjustment;
  const result = normalizedMinMax < hueMin ? hueMin : (normalizedMinMax > hueMax ? hueMax : (isNaN(normalizedMinMax) ? hueMax : normalizedMinMax));
  return {
    color: hsl(result*360, defaultSaturation*100, defaultLightness*100),
  }
}

export default function Choropleth({feature,index,value}:Props):React.ReactElement{
  const {min,max,unit,description} = useMapContext();
  
  const polygonElm:number[] = feature.geometry.coordinates[0][0].map(coord=>{
    return [coord[1],coord[0]]
  })

  return (
    <>
      <FeatureGroup key={index}>
        <ChoroplethPopup id={feature.id} value={value} unit={unit} description={description} />
        <PolygonFeature polygon={polygonElm} pathOption={valueToColor(value, min, max)} />
      </FeatureGroup>
    </>
  )
}