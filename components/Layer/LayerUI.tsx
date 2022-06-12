import { Button, Grid, ButtonGroup } from "@mui/material";
import { useState, useCallback } from "react";
import { useColor, ColorPicker } from "react-color-palette";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMapContext } from "../../views/Map/mapContext";
import { Layer } from "../../utils/Layer";
import "react-color-palette/lib/css/styles.css";
import { alignProperty } from "@mui/material/styles/cssUtils";

interface Props {
  //layers:string[]
  //layer:string
  layer: Layer;
  //updateLayers:(layer:Layer)=>void
}

//
export default function LayerUI({ layer }: Props): React.ReactElement {
  const { updateLayers } = useMapContext();
  const clonedLayer = layer.clone();

  const [color, setColor] = useColor("hex", clonedLayer.color);
  const [isLayerVisible, setLayerVisibility] = useState(clonedLayer.isVisible);
  const toggleLayerVisibility = useCallback(() => {
    setLayerVisibility((visible: boolean) => {
      clonedLayer.isVisible = !visible;
      updateLayers(clonedLayer);
      return clonedLayer.isVisible;
    });
  }, [clonedLayer, updateLayers]);

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

  const updateColor = useCallback(() => {
    clonedLayer.color = color.hex;
    updateLayers(clonedLayer);
    toggleColorPickerVisibility();
  },[color.hex, clonedLayer, toggleColorPickerVisibility, updateLayers]);

  return (
    <Grid container xs={12} justifyContent="right" alignItems="center">
      <Grid item xs={7} justifyContent="left">
        <h3>{clonedLayer.name}</h3>
      </Grid>
      <Grid item xs={5} justifyContent="right" >
        <ButtonGroup variant="contained" aria-label="outlined button group">
          <IconButton aria-label="visibility" onClick={toggleLayerVisibility}>
            {visibilityIcon}
          </IconButton>
          <Button
            onClick={toggleColorPickerVisibility}
            fullWidth={false}
            sx={{
              Width: 40,
              Height: 40,
              border: "10px solid white",              
              backgroundColor: color.hex,
            }}
          />
        </ButtonGroup>
      </Grid>
      {isColorPickerVisible && (
        <Grid item xs={12}>
          <ColorPicker color={color} width={248} onChange={setColor} />
          <Button variant="contained" onClick={updateColor}>
            Set Color
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
