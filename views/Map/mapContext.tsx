import { SiteOutline, Coordinate, Attribute, MinMax, AttributeData, InputPointData, GroupedInputPoint } from "../../AppTypes";
import React, { useState, useMemo, useContext, useEffect, useCallback, RefObject, useRef } from "react";
import { GdpPerCapita } from "../../public/static/gdpPerCapita";
import { GdpDeltaPerCapita } from "../../public/static/gdpDeltaPerCapita";
import { Tag } from "@mui/icons-material";
import { fetchLayers, fetchPoints } from "../../pages/api/KeyRequests";
import { Layer } from "../../utils/Layer";
import { InputPoint } from "../../utils/InputPoint";

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
  inputPointSet:InputPoint[];
  inputPoint:InputPoint|null;
  setInputPoint: (inputPoint:InputPoint)=>void,
  groupedInputPointData:GroupedInputPoint;
  layers:Layer[];
  setLayers: (layers:Layer[])=>void;
  updateLayers: (layers:Layer)=>void;
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
  inputPointSet:[],
  //inputPointData:{id:'1',coordinate:{"lat":33.58,"lng":130.22},tag:'default',description:'',value:1},
  inputPoint:null,
  setInputPoint:()=>{},
  groupedInputPointData:{},
  layers:[],
  setLayers:()=>{},
  updateLayers:()=>{},
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
  const [inputPointSet,setInputPointSet]=useState(initialState.inputPointSet);
  const [inputPoint,setInputPoint]=useState(initialState.inputPoint);
  const [groupedInputPointData,setGroupedInputPointData]=useState(initialState.groupedInputPointData);
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

  const updateLayers = useCallback((layer:Layer)=>{
    //こうやらないといけない必要性はimmutableを理解する必要
    const clone:Layer[] = layers.map(l=>l.clone());
    //clone[layer.index]=layer;
    const index = clone.findIndex(l=>l.index===layer.index);
    if(index>=0){
      clone[index] = layer;
      console.log("update layers from mapContext")
      setLayers(clone);
    }
    // clone.filter(l=>l.index===layer.index)[0]=layer;
    // console.log(clone);
    // setLayers(layers);
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
    async function initializeData(){
      const response = await fetchPoints();
      setInputPointSet(response);

      const resLayers = await fetchLayers();
      console.log(" useEffect1 from mapContext.tsx");

      setLayers(resLayers);

    };
    //FIXME:なぜか2回呼ばれている。初期描画時に一回だけ呼ぶようにしたい
    initializeData();
    console.log('get data from server');
  },[])

  //inputPointDataが追加されたとき
  useEffect(()=>{
    if (inputPoint === null) return;
    setInputPointSet([...inputPointSet,inputPoint]);
    //TODO: layerも追加する
    if (layers.filter(layer=>layer.name.includes(inputPoint.tag)).length > 0) return;
    console.log(" useEffect2 from mapContext.tsx");
    setLayers([...layers,new Layer(inputPoint.tag,layers.length)]);
    //groupInputPointDataSet(inputPoint,groupedInputPointData);
  },[inputPoint])

  useEffect(()=>{
    console.log('layers',layers)
  },[layers])

  useEffect(()=>{
    console.log('inputPointSet',inputPointSet)
  },[inputPointSet])

  useEffect(()=>{
    console.log('GroupedInputPointData',groupedInputPointData);
  },[groupedInputPointData])

  function groupInputPointDataSet(input:InputPoint,clone:GroupedInputPoint){
    //console.log('groupInputPointDataSet',input,groupedInputPointDataSet);
    const groupTag = input.tag;
    //const clone = Object.assign(Object.create(Object.getPrototypeOf(groupedInputPointData)), groupedInputPointData);
    // console.log('groupedInputPointDataSet[groupTag]',groupedInputPointDataSet[groupTag]);
    if (clone[groupTag]){
      //既にgroupTagがある場合
      clone[groupTag].add(input);
    }else{
      clone[groupTag]=new Set([input]);
      //setVisibleLayers([...visibleLayers,groupTag]);
    }
    setGroupedInputPointData(clone);
  }

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
      inputPoint,
      setInputPoint,
      inputPointSet,
      groupedInputPointData,
      layers,
      setLayers,
      updateLayers,
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
    inputPoint,
    inputPointSet,
    groupedInputPointData,
    layers,
    visibleLayers,
  ]);

  return <MapContext.Provider value={mapState}>{children}</MapContext.Provider>
}

export function useMapContext():MapState{
  return useContext(MapContext);
}