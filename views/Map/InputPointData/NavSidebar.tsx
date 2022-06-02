import { Button, Checkbox, FormControlLabel, FormLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/system/Box";
import React from "react";
import Sidebar from "../../../components/Sidebar";
import { useMapContext } from "../mapContext";

interface Props{
  layers:string[]
}

export function Content({layers}:Props):React.ReactElement{
  const {addVisibleLayers,removeVisibleLayers} = useMapContext();
  // const toggleVisibleLayer = (e,layer:string) =>{
    
  // }
  return (
    <FormGroup>
      <FormLabel component="label">Tags</FormLabel>
      {
        layers.map((layer)=>{
          return(
            //TODO:checkbox押したら、レイヤーの表示、非表示切り替わるようにする
            <FormControlLabel key={layer} label={layer} control={
            <Checkbox defaultChecked 
              onChange={e=>{
                if(e.target.checked){
                  addVisibleLayers(layer);
                }else{
                  removeVisibleLayers(layer);
                }
              }}
            />
            } />
          )
        })
      }
    </FormGroup>
  )
}

export default function NavSidebar():React.ReactElement{
  const {layers} = useMapContext();

  return(
    <Sidebar anchor="left" swipeable={false}>
      <Box
        sx={{
          display: 'flex',
          flex: '1 0',
          flexDirection: 'column',
          height: (theme) => `calc(100vh - 100px)`,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Content layers={layers}/>
      </Box>
      <Button variant="contained">
        保存
      </Button>
    </Sidebar>
  )
}