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

export function drawLayer(inputPointSet:InputPoint[],color:string):JSX.Element[]{
  //const {ref} =useInputPointDataContext();
  console.log('inputPointSet',inputPointSet);
  return(
    inputPointSet.map((pointData:InputPoint,index:number)=>{
      return (
        <FeatureGroup key={index}>      
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
  const {groupedInputPointData,layers,inputPointSet} = useMapContext();
  //groupedInputPointDataSetの生成がうまくいってない
  //前描かれているジオメトリは一度消すようにする
  const visibleLayers = layers.filter(layer => layer.isVisible);
  // const visibleLayerNames = visibleLayers.map(layer => layer.name);
  // const visiblePoints = inputPointSet.filter(obj => visibleLayerNames.includes(obj.tag))
  return(
    <>
      {visibleLayers.map(layer=>{
        return (
          <div key={layer.name}>
            {drawLayer(inputPointSet.filter(obj => layer.name.includes(obj.tag)),layer.color)}
            {/* {drawLayer(Array.from(groupedInputPointData[layer.name].values()),layer.color)} */}
          </div>
          );
      })}
    </>
    
  )

  // return test;
}