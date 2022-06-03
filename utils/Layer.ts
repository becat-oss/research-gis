
export type LayerPayload = {
  userId: string;
  name: string;
  index:string;
  isVisible: boolean;
}

export class Layer{
  name: string;
  color: string;
  index: number;
  isVisible = true;

  constructor(name: string, index: number,isVisible=true,color = '#0000FF',){
    this.name = name;
    this.color = color;
    this.index = index;
    this.isVisible = isVisible;
  }

}