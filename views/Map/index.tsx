import Grid from "@mui/material/Grid";
import { height } from "@mui/system";
import LayerPanel from "../../components/Layer/LayerPanel";
import Sidebar from "../../components/Sidebar";
import DataSelector from "./Choropleth/dataSelector";
import ColorScale from "./ColorScale";
import { Map } from "./map";
import { MapProvider } from "./mapContext";

export default function MapIndex() {
  return (
    <MapProvider>
    <Grid container spacing={0.5} columns={12} style={{ height: "100vh" }}>
      <Grid container xs={12} md={3} justifyContent="right">
        <LayerPanel/>
      </Grid>
      <Grid container xs={12} md={9}>
        
          <Map />
      </Grid>
      {/* layerの表示、非表示に応じてsidebarの表示、非表示を切り替えたい */}
      {/* <Sidebar>
          <DataSelector/>
          <ColorScale />
        </Sidebar> */}
    </Grid>
    </MapProvider>
  );
}
