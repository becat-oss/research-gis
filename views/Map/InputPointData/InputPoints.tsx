import React from "react";
import { LayersControl, Popup, Tooltip } from "react-leaflet";
import { Circle } from "react-leaflet";
import { InputPointData } from "../../../AppTypes";
import { useMapContext } from "../mapContext";

// interface Props{
//   inputPointDataSet:InputPointData[];
// }

export function drawLayer(inputPointDataSet:InputPointData[]):JSX.Element[]{
  return(
    inputPointDataSet.map((pointData:InputPointData,index:number)=>{
      return (
        <>
          <Tooltip key={pointData.description}>
            <p>{pointData.value}</p>
            <p>{pointData.description}</p>
          </Tooltip>
          <Circle 
            radius = {50}
            center={[pointData.coordinate.lat, pointData.coordinate.lng]}
            key={pointData.description}
          >
          </Circle>
        </>
      )
    })
  )
}

export default function InputPoints():JSX.Element[][]{
  const {groupedInputPointDataSet,visibleLayers,inputPointDataSet} = useMapContext();

  //こっちだとうまくいく
  // return(
  //   inputPointDataSet.map((pointData:InputPointData,index:number)=>{
  //     return (
  //       <>
  //         <Tooltip key={pointData.description}>
  //           <p>{pointData.value}</p>
  //           <p>{pointData.description}</p>
  //         </Tooltip>
  //         <Circle 
  //           radius = {50}
  //           center={[pointData.coordinate.lat, pointData.coordinate.lng]}
  //           key={pointData.description}
  //         >
  //         </Circle>
  //       </>
  //     )
  //   })
  // )
  return(
    visibleLayers.map(key=>{
      return drawLayer(groupedInputPointDataSet[key])
    })
  )

  // return test;
}