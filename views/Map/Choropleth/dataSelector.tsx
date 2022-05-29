import { FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from "react";
import MenuItem from '@mui/material/MenuItem';
import { choroplethKeys, ChoroplethKey,useMapContext } from "../mapContext";

export default function DataSelector():React.ReactElement{
  const {choroplethKey,setChoroplethKey,setChoroplethData} = useMapContext();

  const handleChange = (event: SelectChangeEvent<ChoroplethKey>):void => {
    setChoroplethKey(event.target.value as ChoroplethKey);
  }
  
  return(
    <FormControl>
      <Select value={choroplethKey} onChange={handleChange}>
        {choroplethKeys.map((key:ChoroplethKey)=>{
          return(
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}