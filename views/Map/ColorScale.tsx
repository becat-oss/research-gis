
// interface Props{

import ColorBar from "./ColorBar";

// }

export default function ColorScale(){
  //minとmaxを計算する
  //今はとりあえず仮で置いておく
  const max = 1100;
  const min = 700;
  const unit = '万円';
  const precision = 0;

  const delta = max - min;

  const marks = [
    {
      value:max,
      label:`${max}${unit || ''}`,
    },
    {
      value: delta * 0.75 + min,
      label: `${(delta * 0.75 + min).toFixed(precision + 1)}`,
    },
    {
      value: delta * 0.5 + min,
      label: `${(delta * 0.5 + min).toFixed(precision + 1)}`,
    },
    {
      value: delta * 0.25 + min,
      label: `${(delta * 0.25 + min).toFixed(precision + 1)}`,
    },
    {
      value: Number(min),
      label: `${min}`,
    },
  ]

  return (
    <div>
      <ColorBar marks = {marks} />
    </div>
  )
}