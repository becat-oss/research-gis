import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useMapContext } from '../mapContext';
import { Coordinate, InputPointData } from '../../../AppTypes';

interface Props{
  open:boolean,
  handleClose:()=>void,
  coordinate:Coordinate|null
}

export default function InputDialog({open,handleClose,coordinate}:Props):React.ReactElement{
  const [tag,setTag] = useState('');
  const [value,setValue] = useState<number|string>('');
  const [description,setDescription] = useState('');
  const {setInputPointData} = useMapContext();

  const handleSubmit = () =>{
    if(coordinate === null) return;
    const inputPointData:InputPointData ={
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
          onChange={(event)=>setValue(event.target.value)}
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