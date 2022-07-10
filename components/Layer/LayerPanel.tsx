import { Grid, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import CssBaseline from '@mui/material/CssBaseline';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { fetchLayers, createLayer } from "../../pages/api/KeyRequests";
import { useMapContext } from "../../views/Map/mapContext";
import Sidebar from "../Sidebar";
import LayerUI from "./LayerUI";
import { Layer } from "../../utils/Layer";

export default function LayerPanel(): React.ReactElement {
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
    async function filterChangedLayers(editedLayers:Layer[]): Promise<Layer[]> {
      const resLayers = await fetchLayers(); //Todo Optimization can be done by fetching the related layers only.
      const filteredLayers = editedLayers.slice();
      for(const layer of resLayers){
        const index = filteredLayers.findIndex(l=>l.isEqual(layer))
        if(index !== -1){
          filteredLayers.splice(index,1);
        }
      }
      return filteredLayers;
    }

    const editedLayers = await filterChangedLayers(layers);
    editedLayers.forEach((layer) => {
      createLayer(layer);
    });
  };
  //console.log('layers',layers);
  return (
    <Sidebar anchor="left" swipeable={false}>
      <List style={{ padding: "0 5px 0 5px" }}>
        {layers.map((layer) => {
          return (
            <ListItem key={layer.index} divider={true}>
              <LayerUI layer={layer} />
            </ListItem>
          );
        })}
      </List>
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
        style={{ margin: "10px" }}
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
