import React from "react";
import { Popup } from "react-leaflet";

interface Props{
  id:string,
  value:number,
  unit:string,
  description:string,
}

export default function ChoroplethPopup({id,value,unit,description}:Props):React.ReactElement{
  return (
    <Popup>
      <p>{id}</p>
      <p>{description}</p>
      <p>{value}{unit}</p>
    </Popup>
  )
}