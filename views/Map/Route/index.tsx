import React from "react";
import PolylineComponent from "../Polyline";
import { googleMaps } from "../../../public/static/googleMap";
import { Circle, FeatureGroup, Popup } from "react-leaflet";

export default function Route():React.ReactElement{
  const polyline:number[][] =[]
  googleMaps.routes[0].legs[0].steps.forEach(step => {
    polyline.push([step.start_location.lat,step.start_location.lng])
    polyline.push([step.end_location.lat,step.end_location.lng])
  })

  const startLoc = googleMaps.routes[0].legs[0].start_location;
  const endLoc = googleMaps.routes[0].legs[0].end_location;

  return (
    <FeatureGroup>
      <Popup>
        <p>距離 {googleMaps.routes[0].legs[0].distance.text}</p>
        <p>所要時間 {googleMaps.routes[0].legs[0].duration.text}</p>
      </Popup>
      <PolylineComponent polyline={polyline}/>
      <Circle
        center={[startLoc.lat,startLoc.lng]}
        radius ={100}
        color ={"#000"}
        fillColor = {"#eb3434"}
        weight={0.5}
      ></Circle>
      <Circle
        center={[endLoc.lat,endLoc.lng]}
        radius ={100}
        color ={"#000"}
        fillColor = {"#eb3434"}
        weight={0.5}
      ></Circle>
    </FeatureGroup>
    
  )
}