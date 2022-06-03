
export class Layer{
  name: string;
  color: string;
  index: number;
  isVisible = true;

  constructor(name: string, index: number,isVisible=true,color = '#ffffff',){
    this.name = name;
    this.color = color;
    this.index = index;
    this.isVisible = isVisible;
  }

}