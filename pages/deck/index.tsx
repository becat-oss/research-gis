import dynamic from "next/dynamic";

const Deck = dynamic(() => import("../../views/Deck"),{ssr:false});

export default function DeckIndex(){
  return(
    <Deck />
  )
}