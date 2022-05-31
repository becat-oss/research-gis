import axios from "axios"
import {GeoJSON} from "react-leaflet"

//道路とかのベクタータイル表示用
async function getGeoJson(url:string){
  const response = await fetch(url);
  return response.json;
}

// const getStaticPaths=async ()=>{
//   const geoJson = await getGeoJson();

//   return geoJson
// }

// getStaticProps=async ({params})=>{

// export function VectorTile(){
//   const data = getGeoJson("https://cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/{z}/{x}/{y}.geojson");
//   console.log(data);
//   return(
//     <GeoJSON data={data} />
//   )
  
// }