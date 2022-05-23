import { SiteOutline, Coordinate } from "../../AppTypes";
import React, { useState, useMemo, useContext, useEffect } from "react";

interface MapState{
  siteOutline: SiteOutline;
  setSiteOutline: (siteOutline: SiteOutline) => void;
  siteCenter: Coordinate;
  setSiteCenter: (siteCenter:Coordinate)=>void;
  min: number;
  setMin: (min:number)=>void;
  max: number;
  setMax: (max:number)=>void;
  unit: string;
  setUnit: (unit:string)=>void;
}

const initialState: MapState = {
  siteOutline:[{"lat":33.58,"lng":130.22}],
  setSiteOutline:()=>{},
  siteCenter:{"lat":33.58,"lng":130.22},
  setSiteCenter:()=>{},
  min:700,
  setMin:()=>{},
  max:1100,
  setMax:()=>{},
  unit:"万円",
  setUnit:()=>{}
}

export const MapContext = React.createContext<MapState>(initialState);

interface MapProviderProps{
  children: React.ReactNode;
}

export function MapProvider({children}:MapProviderProps):React.ReactElement{
  const [siteOutline,setSiteOutline] = useState(initialState.siteOutline);
  const [siteCenter,setSiteCenter]=useState(initialState.siteCenter);
  const [min,setMin]=useState(initialState.min);
  const [max,setMax]=useState(initialState.max);
  const [unit,setUnit]=useState(initialState.unit);

  useEffect(()=>{
    let lat=0;
    let lng=0;
    siteOutline.forEach((ol:Coordinate)=>{
      lat += ol.lat;
      lng += ol.lng;
    });
    
    setSiteCenter({'lat':lat/siteOutline.length,'lng':lng/siteOutline.length});
    
  },[siteOutline])

  const mapState = useMemo(():MapState=>{
    return{
      siteOutline,
      setSiteOutline,
      siteCenter,
      setSiteCenter,
      min,
      setMin,
      max,
      setMax,
      unit,
      setUnit
    }
  },[siteOutline,siteCenter,]);

  return <MapContext.Provider value={mapState}>{children}</MapContext.Provider>
}

export function useMapContext():MapState{
  return useContext(MapContext);
}