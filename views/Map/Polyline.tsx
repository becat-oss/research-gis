import { LatLngExpression } from "leaflet";
import { Polyline } from "react-leaflet";
import { googleMaps } from "../../public/static/googleMap";

const blackOptions = { color: 'red' }

interface Props{
  polyline:LatLngExpression[]
}

export default function PolylineComponent({polyline}:Props){

  return(
    <Polyline pathOptions={blackOptions} positions={polyline}></Polyline>
  )
}