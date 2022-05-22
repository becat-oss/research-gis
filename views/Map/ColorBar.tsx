import React from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { hslHMap,hslH,hslL,hslS } from "../../utils/Color";

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
    ></Box>
  )
}