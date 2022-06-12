import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/system/Box";
import React, { useCallback, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { useMapContext } from "../mapContext";
import { Layer } from "../../../utils/Layer";
import {
  createLayer,
  createPoint,
  fetchLayers,
  fetchPoints,
} from "../../../pages/api/KeyRequests";

import { Color, ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

interface Props {
  //layers:string[]
  //layer:string
  layer: Layer;
  //updateLayers:(layer:Layer)=>void
}

//
export function Content({ layer }: Props): React.ReactElement {
  const { updateLayers } = useMapContext(); 

  //const [, setColor] = useState<Color>();
  // const colorChange = (color: Color) => {
  //   //setColor(color);
  //   //console.log(color);
  //   setColor(color);
  //   layer.color = color.hex;
  //   updateLayers(layer);
  // };

  const [color, setColor] = useColor("hex", layer.color);
  const updateColor = () => {
    console.log("Color Set to ", color.hex)
    layer.color = color.hex;
    updateLayers(layer);
    toggleColorPickerVisibility();
  };

  const [isLayerVisible, setLayerVisibility] = useState(layer.isVisible);
  const toggleLayerVisibility = useCallback(() => {
    setLayerVisibility((visible) => {
      layer.isVisible = !visible;
      updateLayers(layer);
      return layer.isVisible;
    });
  }, [layer, updateLayers]);

  let visibilityIcon;
  if (isLayerVisible) {
    visibilityIcon = <VisibilityIcon />;
  } else {
    visibilityIcon = <VisibilityOffIcon />;
  }

  

  const [isColorPickerVisible, setColorPickerVisibility] = useState(false);
  const toggleColorPickerVisibility = useCallback(() => {
    setColorPickerVisibility((visible) => !visible);
  }, [setColorPickerVisibility]);
  return (
    <>
      <Button
        onClick={toggleColorPickerVisibility}
        sx={{
          width: 20,
          height: 20,
          backgroundColor: color.hex,
        }}
      />
      {isColorPickerVisible && (
        <div>
          <ColorPicker
            color={color}
            width={248}
            onChange={setColor}
          />
          <Button variant="contained" onClick={updateColor}>Set Color</Button>
        </div>
      )}

      {/* <ColorPicker width={228} height={228} color={color} onChange={setColor} /> */}
      <Grid item xs={6}>
        {layer.name}
      </Grid>
      <Grid item xs={3}>
        <IconButton aria-label="visibility" onClick={toggleLayerVisibility}>
          {visibilityIcon}
        </IconButton>
      </Grid>
      {/* colorpicker部分の実装をPrasunにしてもらう */}
      {/* <Grid item xs={3}>
          <ColorPicker value={layer.color} onChange={colorChange} />
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
  );
}

export default function NavSidebar(): React.ReactElement {
  const { layers, inputPointSet } = useMapContext();

  //point、layerデータを保存できるようにする
  const uploadData = async () => {
    //既に登録されているデータを確認する
    // fetchPoints().then(res=>{

    // });
    // inputPointSet.forEach(point=>{
    //   //idがない場合はデータがuploadされたことがないということ
    //   if(point.id === undefined){
    //     createPoint(point);
    //   }
    // });
    //TODO:保存がうまくいったかどうかをユーザーに知らせたい
    console.log("checkUploadedData");
    //既に登録されているデータを確認する
    async function checkUploadedData(): Promise<string[]> {
      const resLayers = await fetchLayers();
      return resLayers.map((layer) => layer.name);
    }

    const uploadedLayerName = await checkUploadedData();
    console.log("uploadedLayerName", uploadedLayerName);
    layers.forEach((layer) => {
      console.log("layer", layer);
      //選択的にデータをアップロードする
      if (uploadedLayerName.includes(layer.name)) return;
      createLayer(layer);
      //TODO:graphqlを理解する
      // if(layer.id === undefined){
      //   createLayer(layer);
      // }
    });
  };
  //console.log('layers',layers);
  return (
    <Sidebar anchor="left" swipeable={false}>
      <Grid container spacing={2}>
        {layers.map((layer) => {
          return <Content key={layer.index} layer={layer} />;
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
      <Button
        variant="contained"
        onClick={() => {
          uploadData();
        }}
      >
        保存
      </Button>
    </Sidebar>
  );
}
