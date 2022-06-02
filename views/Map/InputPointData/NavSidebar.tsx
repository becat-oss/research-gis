import { Button, Checkbox, FormControlLabel, FormLabel, Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/system/Box";
import React from "react";
import { Color, ColorPicker } from "material-ui-color";
import Sidebar from "../../../components/Sidebar";
import { useMapContext } from "../mapContext";

interface Props{
  //layers:string[]
  layer:string
}

export function Content({layer}:Props):React.ReactElement{
  const {addVisibleLayers,removeVisibleLayers} = useMapContext();
  // const toggleVisibleLayer = (e,layer:string) =>{
    
  // }
  return (
    <>
    
      <Grid item xs={6}>
          {layer}
      </Grid>
      <Grid item xs={3}>
          <FormControlLabel control={<Checkbox checked={layer.isVisible} onChange={visibleChange}/>} label="Visible" />
      </Grid>
      <Grid item xs={3}>
          <ColorPicker value={layer.color} onChange={colorChange} hideTextfield/>
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
  const {layers} = useMapContext();

  return(
    <Sidebar anchor="left" swipeable={false}>
      <Grid container spacing={2}>
        {layers.map((layer)=>{
          return(
            <Content key={layer} layer={layer}/>
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