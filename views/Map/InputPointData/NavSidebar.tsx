import { Button, Checkbox, FormControlLabel, FormLabel, Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/system/Box";
import React, { useCallback, useState } from "react";
import { Color, ColorPicker } from "material-ui-color";
import Sidebar from "../../../components/Sidebar";
import { useMapContext } from "../mapContext";
import { Layer } from "../../../utils/Layer";

interface Props{
  //layers:string[]
  layer:Layer
  updateLayers:(layer:Layer)=>void
}



export function Content({layer,updateLayers}:Props):React.ReactElement{
  //const { layers,setLayers } = useMapContext();

  const [, setVisible] = useState<boolean>(layer.isVisible);
  const visibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(event.target.checked);
    layer.isVisible = event.target.checked;
    updateLayers(layer);
    //layers[layer.index]=layer;
    //console.log('layers',layers);
    //setLayers(layers);
  };
  // const toggleVisibleLayer = (e,layer:string) =>{
  
  // }
  return (
    <>
      <Grid item xs={6}>
          {layer.name}
      </Grid>
      <Grid item xs={3}>
          <FormControlLabel control={<Checkbox checked={layer.isVisible} onChange={visibleChange}/>} label="Visible" />
      </Grid>
      {/* <Grid item xs={3}>
          <ColorPicker value={layer.color} onChange={colorChange} hideTextfield/>
      </Grid> */}
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
  const {layers,setLayers} = useMapContext();

  const updateLayer = useCallback((layer:Layer)=>{
    layers[layer.index]=layer;
    setLayers(layers);
  },[layers])

  return(
    <Sidebar anchor="left" swipeable={false}>
      <Grid container spacing={2}>
        {layers.map((layer)=>{
          return(
            <Content layer={layer} updateLayers={updateLayer}/>
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
      <Button variant="contained">
        保存
      </Button>
    </Sidebar>
  )
}