import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {v4 as uuidv4} from 'uuid';
import { useMapContext } from '../mapContext';
import { Coordinate, InputPointData } from '../../../AppTypes';
import { Point } from '../../../utils/InputPoint';

interface Props{
  open:boolean,
  handleClose:()=>void,
  coordinate:Coordinate|null
}

export default function InputDialog({open,handleClose,coordinate}:Props):React.ReactElement{
  const [tag,setTag] = useState('');
  const [value,setValue] = useState<number>(0);
  const [description,setDescription] = useState('');
  const {setInputPointData} = useMapContext();

  const handleSubmit = () =>{
    if(coordinate === null) return;
    //IDを自動的にassignにするようにする
    const inputPointData:InputPointData ={
      id: uuidv4(),
      coordinate,
      tag,
      description,
      value,
    }
    setInputPointData(inputPointData);
    handleClose();
  }

  return(
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Input research data</DialogTitle>
      <FormControl sx={{ minWidth: 300 }}>
        <TextField
          id="tag"
          label="タグ"
          onChange={(event)=>setTag(event.target.value)}
        />
        <TextField
          id="data"
          label="データ"
          onChange={(event)=>setValue(Number(event.target.value))}
        />
        <TextField
          id="description"
          label="説明"
          onChange={(event)=>setDescription(event.target.value)}
        />
        <Button>画像アップロード</Button>
        <Button
          onClick={handleSubmit}
        >
          保存
        </Button>
      </FormControl>
    </Dialog>
  )
}