import { FeatureGroup, GeoJSON, MapContainer,TileLayer,useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
//import { EditControl } from 'react-leaflet-draw';
import { useMapContext } from "./mapContext";
import { SiteOutline } from "../../AppTypes";
import { useState } from "react";
import { teamB } from "../../public/static/teamB";

export function Map(){
  const { siteOutline,setSiteOutline } = useMapContext();
  const [test,setTest] = useState({ lat: "", lng: "" });

  return(
    <MapContainer center={[33.58,130.22]} zoom={10} scrollWheelZoom={true}  style={{ height: "100vh" }}>
      {/* <FeatureGroup>
        <EditControl 
          position="topright" 
          draw={{rectangle:false}}
          onCreated={(e)=>{
            console.log(e.layer);
            setSiteOutline(e.layer._latlngs[0] as SiteOutline)
            //setTest(e.layer._latlngs[0])
          }}
        />
      </FeatureGroup> */}
      <GeoJSON data = {teamB} eventHandlers = {{
        click:()=>{
          console.log('clicked');
        }
      }} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}