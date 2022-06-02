import { SiteOutline, Coordinate, Attribute, MinMax, AttributeData, InputPointData, GroupedInputPointData, Layer } from "../../AppTypes";
import React, { useState, useMemo, useContext, useEffect, useCallback, RefObject, useRef } from "react";
import { GdpPerCapita } from "../../public/static/gdpPerCapita";
import { GdpDeltaPerCapita } from "../../public/static/gdpDeltaPerCapita";
import { Tag } from "@mui/icons-material";
import { fetchPoints } from "../../pages/api/KeyRequests";

export const choroplethKeys = ["gdpPerCapita","gdpDeltaPerCapita"] as const;
export type ChoroplethKey = typeof choroplethKeys[number];

const choroplethValues = [GdpPerCapita,GdpDeltaPerCapita] as const;
type ChoroplethValues = typeof choroplethValues[number];

type ChoroplethDataSet={
  [key in ChoroplethKey]:ChoroplethValues
}

const choroplethDataSet:ChoroplethDataSet ={
  "gdpPerCapita":GdpPerCapita,
  "gdpDeltaPerCapita":GdpDeltaPerCapita
}


function calcMinMaxFromAttributeData(data:AttributeData):[number,number]{
  const values = Object.values(data);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return [min,max];
}

interface MapState{
  siteOutline: SiteOutline;
  setSiteOutline: (siteOutline: SiteOutline) => void;
  siteCenter: Coordinate;
  setSiteCenter: (siteCenter:Coordinate)=>void;
  choroplethKey:ChoroplethKey,
  setChoroplethKey: (choroplethKey:ChoroplethKey)=>void,
  choroplethData:any,
  setChoroplethData: (choroplethData:any)=>void,
  min: number;
  setMin: (min:number)=>void;
  max: number;
  setMax: (max:number)=>void;
  unit: string;
  setUnit: (unit:string)=>void;
  description:string;
  setDescription: (description:string)=>void;
  //InputPointData用
  inputPointDataSet:InputPointData[];
  inputPointData:InputPointData|null;
  setInputPointData: (inputPointData:InputPointData)=>void,
  groupedInputPointDataSet:GroupedInputPointData;
  layers:string[];
  visibleLayers:string[];
  addVisibleLayers: (layer:string)=>void;
  removeVisibleLayers: (layer:string)=>void;
  ref: RefObject<HTMLDivElement> | null;
}

const initialState: MapState = {
  siteOutline:[{"lat":33.58,"lng":130.22}],
  setSiteOutline:()=>{},
  siteCenter:{"lat":33.58,"lng":130.22},
  setSiteCenter:()=>{},
  choroplethKey:"gdpPerCapita",
  setChoroplethKey:()=>{},
  choroplethData:{},
  setChoroplethData:()=>{},
  min:700,
  setMin:()=>{},
  max:1100,
  setMax:()=>{},
  unit:"万円",
  setUnit:()=>{},
  description:'一人当たり総生産（令和1年度）',
  setDescription:()=>{},
  inputPointDataSet:[],
  //inputPointData:{id:'1',coordinate:{"lat":33.58,"lng":130.22},tag:'default',description:'',value:1},
  inputPointData:null,
  setInputPointData:()=>{},
  groupedInputPointDataSet:{},
  layers:[],
  visibleLayers:[],
  addVisibleLayers:()=>{},
  removeVisibleLayers:()=>{},
  ref: null
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
  const [description,setDescription]=useState(initialState.description);
  const [choroplethKey,setChoroplethKey]=useState(initialState.choroplethKey);
  const [choroplethData,setChoroplethData]=useState(initialState.choroplethData);
  const [inputPointDataSet,setInputPointDataSet]=useState(initialState.inputPointDataSet);
  const [inputPointData,setInputPointData]=useState(initialState.inputPointData);
  const [groupedInputPointDataSet,setGroupedInputPointDataSet]=useState(initialState.groupedInputPointDataSet);
  const [layers,setLayers]=useState(initialState.layers);
  const [visibleLayers,setVisibleLayers]=useState(initialState.visibleLayers);
  const ref = useRef<HTMLDivElement | null>(null);

  const addVisibleLayers=useCallback((layer:string)=>{
    const newVisibleLayers=visibleLayers.concat(layer);
    setVisibleLayers(newVisibleLayers);
  },[layers])

  const removeVisibleLayers=useCallback((layer:string)=>{
    const newVisibleLayers=visibleLayers.filter(visibleLayer=>visibleLayer!==layer);
    setVisibleLayers(newVisibleLayers);
  },[layers])

  useEffect(()=>{
    let lat=0;
    let lng=0;
    siteOutline.forEach((ol:Coordinate)=>{
      lat += ol.lat;
      lng += ol.lng;
    });
    
    setSiteCenter({'lat':lat/siteOutline.length,'lng':lng/siteOutline.length});
    
  },[siteOutline])

  //choroplethKeyが変更されたとき
  useEffect(()=>{
    setChoroplethData(choroplethDataSet[choroplethKey].data);

    //min,maxをsetする
    const [min,max]=calcMinMaxFromAttributeData(choroplethDataSet[choroplethKey].data);
    setMin(min);
    setMax(max);

    //unit,title,descriptionをsetする
    setUnit(choroplethDataSet[choroplethKey].unit);
    setDescription(choroplethDataSet[choroplethKey].description);
    
  },[choroplethKey])

  //画面を初期描画時
  useEffect(()=>{
    async function getPoints(){
      const response = await fetchPoints();
      response.map(data=>{
        if (data === null) return;
        groupInputPointDataSet(data,groupedInputPointDataSet);
        setLayers(Object.keys(groupedInputPointDataSet));
      })
    };
    //FIXME:なぜか2回呼ばれている。初期描画時に一回だけ呼ぶようにしたい
    getPoints();
    console.log('get data from server');
  },[])

  useEffect(()=>{
    console.log('layers',layers);
  },[layers])

  // useEffect(()=>{
  //   console.log('groupedInputPointDataSet',groupedInputPointDataSet);
  // },[groupedInputPointDataSet])

  //inputPointDataが追加されたとき
  useEffect(()=>{
    if (inputPointData === null) return;
    //setInputPointDataSet([...inputPointDataSet,inputPointData]);

    groupInputPointDataSet(inputPointData,groupedInputPointDataSet);
    setLayers(Object.keys(groupedInputPointDataSet));
  },[inputPointData])

  function groupInputPointDataSet(input:InputPointData,groupedInputPointDataSet:GroupedInputPointData){
    //console.log('groupInputPointDataSet',input,groupedInputPointDataSet);
    const groupTag = input.tag;
    // console.log('groupedInputPointDataSet[groupTag]',groupedInputPointDataSet[groupTag]);
    if (groupedInputPointDataSet[groupTag]){
      //既にgroupTagがある場合
      groupedInputPointDataSet[groupTag].add(input);
    }else{
      groupedInputPointDataSet[groupTag]=new Set([input]);
      setVisibleLayers([...visibleLayers,groupTag]);
    }
    setGroupedInputPointDataSet(groupedInputPointDataSet);
  }

  // useEffect(()=>{
  //   inputPointDataSet.map(data=>{
  //     if (data === null) return;
  //     console.log('initialization',data,groupedInputPointDataSet);
  //     groupInputPointDataSet(data,groupedInputPointDataSet);
  //   })
  //   setLayers(Object.keys(groupedInputPointDataSet));
  // },[inputPointDataSet])

  const mapState = useMemo(():MapState=>{
    return{
      siteOutline,
      setSiteOutline,
      siteCenter,
      setSiteCenter,
      choroplethKey,
      setChoroplethKey,
      choroplethData,
      setChoroplethData,
      min,
      setMin,
      max,
      setMax,
      unit,
      setUnit,
      description,
      setDescription,
      inputPointData,
      setInputPointData,
      inputPointDataSet,
      groupedInputPointDataSet,
      layers,
      visibleLayers,
      addVisibleLayers,
      removeVisibleLayers,
      ref
    }
  },[
    siteOutline,
    siteCenter,
    choroplethKey,
    setChoroplethKey,
    choroplethData,
    min,
    max,
    unit,
    description,
    inputPointData,
    inputPointDataSet,
    groupedInputPointDataSet,
    layers,
    visibleLayers,
  ]);

  return <MapContext.Provider value={mapState}>{children}</MapContext.Provider>
}

export function useMapContext():MapState{
  return useContext(MapContext);
}