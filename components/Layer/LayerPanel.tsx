import { Grid, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import CssBaseline from '@mui/material/CssBaseline';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { fetchLayers, createLayer } from "../../pages/api/KeyRequests";
import { useMapContext } from "../../views/Map/mapContext";
import Sidebar from "../Sidebar";
import LayerUI from "./LayerUI";

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
