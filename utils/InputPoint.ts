import {v4 as uuidv4} from 'uuid';
import { Coordinate, InputPointData, InputPointPayload } from "../AppTypes";


export class InputPoint{
  id: string;
  tag: string;
  coordinate: Coordinate;
  value: number;
  description: string;
  
  constructor(inputPoint:InputPointPayload){
    //自動的にidを生成する
    if (inputPoint.id) {
      this.id = inputPoint.id
    }else{
      this.id = uuidv4();
    }
    this.tag = inputPoint.tag;
    this.coordinate = {
      lat: inputPoint.coordinate[0],
      lng: inputPoint.coordinate[1]
    },
    this.value = inputPoint.value;
    this.description = inputPoint.description;
  }
}