import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../views/Map"),{ssr:false});

export default function MapIndex(){
  return(
    <Map />
  )
}