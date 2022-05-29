import React, { useState } from "react";
import { Circle, FeatureGroup, Popup, useMapEvents } from "react-leaflet";
import { Coordinate } from "../../../AppTypes";
import { useMapContext } from "../mapContext";
import InputDialog from "./InputDialog";
import InputPoints from "./InputPoints";
import NavSidebar from "./NavSidebar";

export default function InputPoint():React.ReactElement|null{
  const {inputPointData,setInputPointData} = useMapContext();
  const [position,setPosition] = useState<[number,number]|null>(null);
  const [coordinate,setCoordinate] = useState<Coordinate|null>(null);
  const [open,setOpen] = useState(false);
  const map = useMapEvents({
    click(e){
      setPosition([e.latlng.lat,e.latlng.lng]);
      setCoordinate(e.latlng as Coordinate);
      setOpen(true);
    }
  })

  const handleClose = () =>{
    setOpen(false);
  }

  return position === null?null:(
    // <FeatureGroup>
    <>
      <InputDialog open={open} coordinate={coordinate} handleClose = {handleClose}/>
      <Circle center={position}>
      </Circle>
      <InputPoints />
      <NavSidebar />
    </>
    // </FeatureGroup>
  )
}

