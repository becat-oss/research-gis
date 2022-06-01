import React, { useState } from "react";
import { Circle, FeatureGroup, Popup, useMapEvents } from "react-leaflet";
import { Coordinate } from "../../../AppTypes";
import { fetchPoints } from "../../../pages/api/KeyRequests";
import { useMapContext } from "../mapContext";
import InputDialog from "./InputDialog";
import InputPoints from "./InputPoints";
import NavSidebar from "./NavSidebar";

export default function InputPoint():React.ReactElement|null{
  const [coordinate,setCoordinate] = useState<Coordinate|null>(null);
  const [open,setOpen] = useState(false);
  
  const map = useMapEvents({
    click(e){
      setCoordinate(e.latlng as Coordinate);
      setOpen(true);
    }
  })

  const handleClose = () =>{
    setOpen(false);
  }

  return (
    // <FeatureGroup>
    <>
      <InputDialog open={open} coordinate={coordinate} handleClose = {handleClose}/>
      <InputPoints />
      <NavSidebar />
    </>
    // </FeatureGroup>
  )
}

