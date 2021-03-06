import { Attribute,AttributeData } from "../../AppTypes";

const GdpDeltaPerCapitaData:AttributeData = {
  "北九州市": 2.2,
  "福岡市": 0.2,
  "大牟田市": -0.3,
  "久留米市": -0.4,
  "直方市": 0.5,
  "飯塚市": -0.9,
  "田川市": 2.2,
  "柳川市": 2.3,
  "八女市": -2.2,
  "筑後市": -4.9,
  "大川市": -2.7,
  "行橋市": -5.1,
  "豊前市": 0.1,
  "中間市": -0.4,
  "小郡市": -0.7,
  "筑紫野市": -15.1,
  "春日市": -1.3,
  "大野城市": 3.8,
  "宗像市": -1.6,
  "太宰府市": 0.7,
  "古賀市": 2.3,
  "福津市": -0.9,
  "うきは市": -1.3,
  "宮若市": -0.5,
  "嘉麻市": 1.5,
  "朝倉市": 5.3,
  "みやま市": 4.0,
  "糸島市": -1.3,
  "那珂川市": 1.4,
  "宇美町": -0.5,
  "篠栗町": -1.5,
  "志免町": -0.2,
  "須恵町": 0.7,
  "新宮町": -2.1,
  "久山町": 5.7,
  "粕屋町": 1.3,
  "芦屋町": 0.5,
  "水巻町": -2.4,
  "岡垣町": 3.0,
  "遠賀町": -2.2,
  "小竹町": 12.4,
  "鞍手町": 0.9,
  "桂川町": 9.8,
  "筑前町": -0.8,
  "東峰村": 80.4,
  "大刀洗町": 3.4,
  "大木町": 0.0,
  "広川町": -0.4,
  "香春町": -5.9,
  "添田町": -8.7,
  "糸田町": -7.6,
  "川崎町": -1.7,
  "大任町": -16.4,
  "赤村": 0.3,
  "福智町": -5.7,
  "苅田町": -11.7,
  "みやこ町": -0.9,
  "吉富町": -3.2,
  "上毛町": -11.5,
  "築上町": -2.5
}

export const GdpDeltaPerCapita:Attribute = {
  title: "一人当たりGDP増加率",
  description: "一人当たりGDP増加率（令和元年）",
  unit:"[%]",
  data:GdpDeltaPerCapitaData
}

