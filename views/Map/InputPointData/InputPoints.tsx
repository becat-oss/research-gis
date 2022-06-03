import React,{useRef} from "react";
import { FeatureGroup, LayersControl, Popup, Tooltip } from "react-leaflet";
import { Circle } from "react-leaflet";
import { InputPointData } from "../../../AppTypes";
import { InputPoint } from "../../../utils/InputPoint";
import { useMapContext } from "../mapContext";
import { useInputPointDataContext } from "./InputPointDataContext";

// interface Props{
//   inputPointDataSet:InputPoint[];
//   //color: string
// }

export function drawLayer(inputPointDataSet:InputPoint[],color:string):JSX.Element[]{
  //const {ref} =useInputPointDataContext();

  return(
    inputPointDataSet.map((pointData:InputPoint,index:number)=>{

      return (
        <FeatureGroup>      
          <Circle 
            radius = {pointData.value*10}
            center={[pointData.coordinate.lat, pointData.coordinate.lng]}
            key={pointData.id}
            color ={color}
          >
            <Tooltip key={pointData.id}>
              <p>タグ:{pointData.tag}</p>
              <p>値：{pointData.value}</p>
              <p>説明:{pointData.description}</p>
            </Tooltip>
          </Circle>
        </FeatureGroup>
      )
    })
  )
}

export default function InputPoints():React.ReactElement{
  const {groupedInputPointData,layers} = useMapContext();
  //groupedInputPointDataSetの生成がうまくいってない
  //前描かれているジオメトリは一度消すようにする
  const visibleLayers = layers.filter(layer => layer.isVisible);
  return(
    <>
      {visibleLayers.map(layer=>{
        return (
          <div key={layer.name}>
            {drawLayer(Array.from(groupedInputPointData[layer.name].values()),layer.color)}
          </div>
          );
      })}
    </>
    
  )

  // return test;
}