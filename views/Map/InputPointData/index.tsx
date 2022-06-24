import React, { useEffect, useState } from "react";
import { Circle, FeatureGroup, Popup, useMapEvents } from "react-leaflet";
import { Coordinate } from "../../../AppTypes";
import { fetchPoints } from "../../../pages/api/KeyRequests";
import { useMapContext } from "../mapContext";
import InputDialog from "./InputDialog";
import { useInputPointDataContext } from "./InputPointDataContext";
import InputPoints from "./InputPoints";

export default function InputPoint():React.ReactElement|null{
  const [coordinate,setCoordinate] = useState<Coordinate|null>(null);
  const [open,setOpen] = useState(false);
  const {ref} = useInputPointDataContext();
  
  const map = useMapEvents({
    click(e){
      //map以外をクリックしたら反応しない
      console.log('e.layerPoint.x',e.layerPoint.x);
      if(e.layerPoint.x<0)return null;
      setCoordinate(e.latlng as Coordinate);
      setOpen(true);
    }
  })

  const handleClose = () =>{
    setOpen(false);
  }

  useEffect(()=>{
    if (ref?.current) {
      
    }
  },[])

  return (
    // <FeatureGroup>
    <>
      <InputDialog open={open} coordinate={coordinate} handleClose = {handleClose}/>
      <InputPoints />      
    </>
    // </FeatureGroup>
  )
}

