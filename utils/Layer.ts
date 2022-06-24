
export type LayerPayload = {
  id?: string;
  userId: string;
  name: string;
  index:string;
  isVisible: boolean;
  color: string;
}

export class Layer{
  id: string|undefined;
  name: string;
  color: string;
  index: number;
  isVisible = true;

  constructor(name: string, index:number, id:string|undefined=undefined,isVisible=true,color = '#0000FF',){
    this.name = name;
    if (id) {
      this.id = id
    }
    this.color = color;
    this.index = index;
    this.isVisible = isVisible;
  }

  clone():Layer{
    return new Layer(this.name, this.index, this.id, this.isVisible, this.color);
  }

  toPayload():LayerPayload{
    return{
      userId: 'admin',
      name: this.name,
      index: this.index.toString(),
      isVisible: this.isVisible,
      color: this.color
    }
  }
}