import Sidebar from '../../components/Sidebar';
import ColorScale from './ColorScale';
import {Map} from './map';

export default function MapIndex(){
  return (
    <>
      <Map />
      <Sidebar>
        <ColorScale />
      </Sidebar>
    </> 
  )
}