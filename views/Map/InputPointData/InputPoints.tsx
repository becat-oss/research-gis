import React,{useRef} from "react";
import { FeatureGroup, LayersControl, Popup, Tooltip } from "react-leaflet";
import { Circle } from "react-leaflet";
import { InputPointData } from "../../../AppTypes";
import { InputPoint } from "../../../utils/InputPoint";
import { useMapContext } from "../mapContext";
import { useInputPointDataContext } from "./InputPointDataContext";

// interface Props{
//   inputPointDataSet:InputPointData[];
// }

export function drawLayer(inputPointDataSet:InputPoint[]):JSX.Element[]{
  const {ref} =useInputPointDataContext();
  console.log('inputPointDataSet',inputPointDataSet);
  return(
    inputPointDataSet.map((pointData:InputPoint,index:number)=>{

      return (
        <FeatureGroup ref={ref}>      
          <Circle 
            radius = {pointData.value*10}
            center={[pointData.coordinate.lat, pointData.coordinate.lng]}
            key={pointData.id}
            
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
  console.log('groupedInputPointDataSet',groupedInputPointData);
  //前描かれているジオメトリは一度消すようにする
  const visibleLayers = layers.filter(layer => layer.isVisible).map(layer => layer.name);
  // console.log('visibleLayers',visibleLayers);
  return(
    <>
      {visibleLayers.map(key=>{
        return (
          <div key={key}>
            {drawLayer(Array.from(groupedInputPointData[key].values()))}
          </div>
          );
      })}
    </>
    
  )

  // return test;
}