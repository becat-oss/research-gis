import React,{useRef} from "react";
import { FeatureGroup, LayersControl, Popup, Tooltip } from "react-leaflet";
import { Circle } from "react-leaflet";
import { InputPointData } from "../../../AppTypes";
import { useMapContext } from "../mapContext";
import { useInputPointDataContext } from "./InputPointDataContext";

// interface Props{
//   inputPointDataSet:InputPointData[];
// }

export function drawLayer(inputPointDataSet:InputPointData[]):JSX.Element[]{
  const {ref} =useInputPointDataContext();
  return(
    inputPointDataSet.map((pointData:InputPointData,index:number)=>{

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
  const {groupedInputPointDataSet,visibleLayers} = useMapContext();
  const {ref} = useInputPointDataContext();
  //groupedInputPointDataSetの生成がうまくいってない
  console.log('groupedInputPointDataSet',groupedInputPointDataSet);
  //前描かれているジオメトリは一度消すようにする
  return(
    <>
      {visibleLayers.map(key=>{
        return (
          <div key={key}>
            {drawLayer(Array.from(groupedInputPointDataSet[key].values()))}
          </div>
          );
      })}
    </>
    
  )

  // return test;
}