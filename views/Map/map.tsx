import { FeatureGroup, GeoJSON, MapContainer,TileLayer,useMap,Popup, Circle, LayersControl, LayerGroup, Marker } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
//import { EditControl } from 'react-leaflet-draw';
import { useMapContext } from "./mapContext";
import { SiteOutline } from "../../AppTypes";
import { useState } from "react";
import { teamB } from "../../public/static/teamB";
import { GeoJsonFeature } from "./GeoJsonFeature";

export function Map(){
  const { siteOutline,setSiteOutline } = useMapContext();
  const [modal,setModal] = useState(false);
  const [selectedFeature,setSelectedFeature] = useState({});

  const toggle = () => setModal(!modal);

  return(
    <MapContainer center={[33.58,130.22]} zoom={10} scrollWheelZoom={true}  style={{ height: "100vh" }}>
      <LayersControl position="topright">
        <LayersControl.Overlay name="team A">
          <Marker position={[33.58,130.22]}>
            
          </Marker>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="team B" checked>
          <LayerGroup>
            {teamB.features.map((feature,index)=>{
              return <GeoJsonFeature feature={feature} index={index}/>
            })}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}