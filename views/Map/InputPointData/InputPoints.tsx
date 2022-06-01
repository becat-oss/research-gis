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
          <Tooltip key={pointData.id}>
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

export default function InputPoints():React.ReactElement{
  const {groupedInputPointDataSet,visibleLayers} = useMapContext();
  //groupedInputPointDataSetの生成がうまくいってない
  console.log('groupedInputPointDataSet',groupedInputPointDataSet);
  return(
    <>
      {visibleLayers.map(key=>{
        return drawLayer(Array.from(groupedInputPointDataSet[key].values()));
      })}
    </>
    
  )

  // return test;
}