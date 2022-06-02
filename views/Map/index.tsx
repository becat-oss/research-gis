import Sidebar from '../../components/Sidebar';
import DataSelector from './Choropleth/dataSelector';
import ColorScale from './ColorScale';
import {Map} from './map';
import { MapProvider } from './mapContext';

export default function MapIndex(){
  return (
    <>
      <MapProvider>
        <Map />
        {/* layerの表示、非表示に応じてsidebarの表示、非表示を切り替えたい */}
        {/* <Sidebar>
          <DataSelector/>
          <ColorScale />
        </Sidebar> */}
      </MapProvider>
    </> 
  )
}