import React from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { hslHMap,hslH,hslL,hslS } from "../../utils/Color";
import { FormControl, TextField } from "@mui/material";
import { useMapContext } from "./mapContext";

const barHeight = 300;
const barWidth = 6;
const fontSize = 16;
const labelMargin = 8;
const formMaxKey = 'max';
const formMinKey = 'min';
const formWidth = 150;

interface Mark{
  value:number;
  label:string;
}

interface Props{
  marks: Mark[];
}

export default function ColorBar({marks}:Props):React.ReactElement{
  const theme = useTheme();
  const {min,max} = useMapContext();
  const delta = max - min;
  return(
    <Box
      sx={{
        position: 'relative',
        m: 1,
        marginBottom: fontSize + theme.spacing(3),
        height: barHeight,
        width: barWidth,
        borderRadius: barWidth / 2,
        backgroundImage: `linear-gradient(.90turn,\
      hsl(${hslHMap * 1}, ${hslS}%, ${hslL}%) ${100 - 1 * 100}%,\
      hsl(${hslHMap * 0.75}, ${hslS}%, ${hslL}%) ${100 - 0.75 * 100}%,\
      hsl(${hslHMap * 0.5}, ${hslS}%, ${hslL}%) ${100 - 0.5 * 100}%,\
      hsl(${hslHMap * 0.25}, ${hslS}%, ${hslL}%) ${100 - 0.25 * 100}%,\
      hsl(${hslHMap * 0}, ${hslS}%,  ${hslL}%) ${100 - 0 * 100}%)`,
      }}
    >
      <FormControl  style={{ position: 'absolute', top: -fontSize / 2 - 16, left: barWidth + labelMargin, fontSize, width: formWidth}}>
        <TextField
          id="form-max"
          variant="standard"
          onChange={(e)=>{
            console.log("not yet implemented")
          }}
          value ={max}
          sx={{ backgroundColor: 'transparent', p: 1 }}
        />
      </FormControl>
      {marks.map((mark, index) => {
        const top = barHeight * (1 - (mark.value - min) / delta);
        return (
          <React.Fragment key={index}>
            {mark.value !== max && mark.value !== min && (
              <>
                <div style={{ position: 'absolute', top }}>
                  <div style={{ height: 2, width: barWidth, backgroundColor: theme.palette.divider }} />
                </div>
                <div style={{ position: 'absolute', top: top - fontSize / 2, left: barWidth + labelMargin + 8, fontSize }}>{mark.label}</div>
              </>
            )}
          </React.Fragment>
        );
      })}
      <FormControl  style={{ position: 'absolute', top: barHeight - fontSize / 2 - 16, left: barWidth + labelMargin, fontSize, width: formWidth }}>
        <TextField
          id="form-min"
          variant="standard"
          onChange={(e)=>{
            console.log("not yet implemented")
          }}
          value ={min}
          sx={{ backgroundColor: 'transparent', p: 1 }}
        />
      </FormControl>

    </Box>
  )
}