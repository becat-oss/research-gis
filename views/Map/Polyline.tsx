import { LatLngExpression } from "leaflet";
import { Polyline } from "react-leaflet";
import { googleMaps } from "../../public/static/googleMap";

const blackOptions = { color: 'black' }

export default function PolylineComponent(){
  const polyline:number[][] =[]
  googleMaps.routes[0].legs[0].steps.forEach(step => {
    polyline.push([step.start_location.lat,step.start_location.lng])
    polyline.push([step.end_location.lat,step.end_location.lng])
  })
  // console.log('polyline',polyline);
  // const polyline1=[
  //   [33.5783878,130.2599621],
  //   [33.6220035,130.4260974]
  // ]

  return(
    <Polyline pathOptions={blackOptions} positions={polyline}></Polyline>
  )
}