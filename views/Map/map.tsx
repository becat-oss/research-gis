import { FeatureGroup, GeoJSON, MapContainer,TileLayer,useMap,Popup, Circle, LayersControl, LayerGroup, Marker } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

//import { EditControl } from 'react-leaflet-draw';
import { useMapContext } from "./mapContext";
import { useState } from "react";
import { teamB } from "../../public/static/teamB";
import { GeoJsonFeature } from "./GeoJsonFeature";
import VectorTileLayer from "react-leaflet-vector-tile-layer";
import PolylineComponent from "./Polyline";

export function Map(){
  const { siteOutline,setSiteOutline } = useMapContext();
  const [modal,setModal] = useState(false);
  const [selectedFeature,setSelectedFeature] = useState({});

  const toggle = () => setModal(!modal);

  return(
    <MapContainer center={[33.58,130.22]} zoom={12} scrollWheelZoom={true}  style={{ height: "100vh" }}>
      <PolylineComponent />
      <LayersControl position="topright">
        <LayersControl.Overlay name="team B" checked>
          <LayerGroup>
            {teamB.features.map((feature,index)=>{
              return <GeoJsonFeature feature={feature} index={index}/>
            })}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="道路">
          
        </LayersControl.Overlay>
        <LayersControl.Overlay name="土地条件">
          {/* Legendを入れたいhttps://cyberjapandata.gsi.go.jp/legend/lcm25k_2012/lc_legend.pdf */}
          <TileLayer
            opacity={0.5}
            url="https://cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/{z}/{x}/{y}.png"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="傾斜量図">
          <TileLayer
            opacity={0.5}
            url="https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="色別標高図">
          <TileLayer
            opacity={0.5}
            attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>'
            url='https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png'
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="洪水浸水想定区域">
          <TileLayer
            attribution='国土地理院：洪水浸水想定区域（想定最大規模）'
            url='https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png'
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="土砂災害警戒区域">
          <TileLayer
            attribution='国土地理院：土砂災害警戒区域（土石流）'
            url='https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png'
          />
        </LayersControl.Overlay>
      </LayersControl>
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}