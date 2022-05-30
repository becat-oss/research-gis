import React,{useMemo, useState} from "react";
import { Coordinate, InputPointData } from "../../../AppTypes";

// interface InputPointDataState{
//   inputPointDataSet:InputPointData[];
//   addInputPointDataSet:React.Dispatch<React.SetStateAction<InputPointData[]>>;
// }

// const initialState:InputPointDataState = {
//   inputPointDataSet:[],
//   addInputPointDataSet:(InputPointData)=>{},
// }

// export const InputPointDataContext = React.createContext<InputPointDataState>(initialState);

// interface InputPointDataProviderProps{
//   children: React.ReactNode;
// }

// export function InputPointDataProvider({children}:InputPointDataProviderProps):React.ReactElement{
//   const [inputPointDataSet,setInputPointDataSet]=useState(initialState.inputPointDataSet);

//   const addInputPointDataSet =(point:Coordinate,tag:string,description:string,value:number)=>{
//     addInputPointDataSet([...inputPointDataSet,{
//       point:point,
//       tag:tag,
//       description:description,
//       value:value,
//     }]);
//   }

//   const InputPointDataState = useMemo(():InputPointDataState=>{
//     return{
//       inputPointDataSet,
//       addInputPointDataSet,
//     }
//   },[inputPointDataSet])
//   return(
//     <InputPointDataContext.Provider value={InputPointDataState}>
//       {children}
//     </InputPointDataContext.Provider>
//   )
// }

// export function useInputPointDataContext():InputPointDataState{
//   return React.useContext(InputPointDataContext);
// }

