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
  layer:string
  //layer:Layer
  //updateLayers:(layer:Layer)=>void
}



export function Content({layer}:Props):React.ReactElement{
  const { addVisibleLayers,removeVisibleLayers } = useMapContext();

  //const [, setVisible] = useState<boolean>(layer.isVisible);
  // const visibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setVisible(event.target.checked);
  //   layer.isVisible = event.target.checked;
  //   updateLayers(layer);

  // };

  return (
    <>
      <Grid item xs={6}>
          {layer}
      </Grid>
      <Grid item xs={3}>
          <FormControlLabel control={<Checkbox  defaultChecked 
            onChange={e=>{
              if(e.target.checked){
                addVisibleLayers(layer);
              }else{
                removeVisibleLayers(layer);
              }
            }}/>} label="Visible" />
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
  const {layers} = useMapContext();

  // const updateLayer = useCallback((layer:Layer)=>{
  //   layers[layer.index]=layer;
  //   setLayers(layers);
  // },[layers])

  return(
    <Sidebar anchor="left" swipeable={false}>
      <Grid container spacing={2}>
        {layers.map((layer)=>{
          return(
            <Content layer={layer.name}/>
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