import { Feature } from "../../AppTypes";
import { FeatureGroup,Popup, Circle } from "react-leaflet"
import 'leaflet/dist/leaflet.css';

interface Props{
  feature:Feature,
  index:number,
}

//TODO:リファクタリング必要
export function GeoJsonFeature({feature,index}:Props):React.ReactElement{
  return (
    <FeatureGroup key={index}>
      <Popup>
        <p>{feature.properties.Title}</p>
        <button
          id="button"
          className="btn btn-primary"
          onClick={()=>{
            console.log("not yet implemented");
            // toggle();
            // setSelectedFeature(feature);
          }}
        >
          More Info
        </button>
      </Popup>
      {/* <Circle
        center={[
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0]
        ]}
        radius ={100}
        color={"#000"}
        fillColor = {"#eb3434"}
        weight={0.5}
        fillOpacity={0.8}
      ></Circle> */}
    </FeatureGroup>
  )
}