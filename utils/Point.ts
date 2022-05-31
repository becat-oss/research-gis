import {v4 as uuidv4} from 'uuid';
import { Coordinate, InputPointData } from "../AppTypes";


export class Point{
  id: string;
  tag: string;
  coordinate: Coordinate;
  value: number;
  description: string;
  constructor(inputPoint:InputPointData){
    //自動的にidを生成する
    this.id = uuidv4();
    this.tag = inputPoint.tag;
    this.coordinate = inputPoint.coordinate;
    this.value = inputPoint.value;
    this.description = inputPoint.description;
  }
}