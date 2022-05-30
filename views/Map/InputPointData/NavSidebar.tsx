import { Checkbox, FormControlLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/system/Box";
import React from "react";
import Sidebar from "../../../components/Sidebar";
import { useMapContext } from "../mapContext";

export function Content():React.ReactElement{
  const {layers} = useMapContext();

  //checkboxのレイヤーをクリックできないようにする必要
  const toggleVisibleLayer = (e,layer:string) =>{
    
  }

  return (
    <FormGroup>
      {
        layers.map((layer)=>{
          return(
            //TODO:checkbox押したら、レイヤーの表示、非表示切り替わるようにする
            <FormControlLabel label={layer} control={
            <Checkbox defaultChecked 
              onChange={e=>{

              }}
            />}  
            />
          )
        })
      }
    </FormGroup>
  )
}

export default function NavSidebar():React.ReactElement{
  return(
    <Sidebar anchor="left" swipeable={false}>
      <Box
        sx={{
          display: 'flex',
          flex: '1 0',
          flexDirection: 'column',
          height: (theme) => `calc(100vh - 50px)`,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Content />
      </Box>
    </Sidebar>
  )
}