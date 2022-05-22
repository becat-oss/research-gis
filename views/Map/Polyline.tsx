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

  return(
    <Polyline pathOptions={blackOptions} positions={polyline}></Polyline>
  )
}