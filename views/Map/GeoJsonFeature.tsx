import { Feature, GeoJsonData } from "../../AppTypes";
import { FeatureGroup, GeoJSON, MapContainer,TileLayer,useMap,Popup, Circle } from "react-leaflet"
import 'leaflet/dist/leaflet.css';

interface Props{
  feature:Feature,
  index:number,
}

export function GeoJsonFeature({feature,index}:Props):React.ReactElement{
  return (
    <FeatureGroup color="purple" key={index}>
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
      <Circle
        center={[
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0]
        ]}
        fillColor="#ff7800"
        radius ={200}
        color={"#000"}
        weight={1}
        fillOpacity={0.8}
      ></Circle>
    </FeatureGroup>
  )
}