import { Button, Checkbox, FormControlLabel, FormLabel, Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/system/Box";
import React, { useCallback, useState } from "react";
import { Color, ColorPicker } from "material-ui-color";
import Sidebar from "../../../components/Sidebar";
import { useMapContext } from "../mapContext";
import { Layer } from "../../../utils/Layer";
import { createLayer, createPoint, fetchPoints } from "../../../pages/api/KeyRequests";

interface Props{
  //layers:string[]
  //layer:string
  layer:Layer
  //updateLayers:(layer:Layer)=>void
}


// 
export function Content({layer}:Props):React.ReactElement{
  const { updateLayers } = useMapContext();

  //const [, setColor] = useState<Color>();
  const colorChange = (color: Color) => {
    //setColor(color);
    //console.log(color);
    layer.color = "#" + color.hex;
    updateLayers(layer);
};

  return (
    <>
      <Grid item xs={6}>
        {layer.name}
      </Grid>
      <Grid item xs={3}>
        <FormControlLabel control={<Checkbox  defaultChecked 
          onChange={e=>{
            layer.isVisible = e.target.checked;
            updateLayers(layer);
          }}/>} label="Visible" />
      </Grid>
      {/* colorpicker部分の実装をPrasunにしてもらう */}
      <Grid item xs={3}>
        <ColorPicker value={layer.color} onChange={colorChange} deferred/>
      </Grid>
    </>
    // <FormGroup>
    //   <FormLabel component="label">Tags</FormLabel>
    //   {
    //     layers.map((layer)=>{
    //       return(
    //         <FormControlLabel key={layer} label={layer} control={
    //         <Checkbox defaultChecked 
    //           onChange={e=>{
    //             if(e.target.checked){
    //               addVisibleLayers(layer);
    //             }else{
    //               removeVisibleLayers(layer);
    //             }
    //           }}
    //         />
    //         } />
    //       )
    //     })
    //   }
    // </FormGroup>
  )
}



export default function NavSidebar():React.ReactElement{
  const {layers,inputPointSet} = useMapContext();

  //point、layerデータを保存できるようにする
  const uploadData = () =>{
    //既に登録されているデータを確認する
    // fetchPoints().then(res=>{

    // });
    inputPointSet.forEach(point=>{
      //idがない場合はデータがuploadされたことがないということ
      if(point.id === undefined){
        createPoint(point);
      }
    });
    //TODO:保存がうまくいったかどうかをユーザーに知らせたい
    layers.forEach(layer=>{
      console.log('layer',layer);

      //TODO:graphqlを理解する
      // if(layer.id === undefined){
      //   createLayer(layer);
      // }
    });
  }
  //console.log('layers',layers);
  return(
    <Sidebar anchor="left" swipeable={false}>
      <Grid container spacing={2}>
        {layers.map((layer)=>{
          return(
            <Content layer={layer}/>
          )
        })}
      </Grid>
      {/* <Box
        sx={{
          display: 'flex',
          flex: '1 0',
          flexDirection: 'column',
          height: (theme) => `calc(100vh - 100px)`,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Content layers={layers}/>
      </Box> */}
      <Button variant="contained" onClick={() => {
        uploadData();
      }}>
        保存
      </Button>
    </Sidebar>
  )
}