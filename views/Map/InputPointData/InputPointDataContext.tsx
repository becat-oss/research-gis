import React,{useMemo,  RefObject, useRef} from "react";
import { Coordinate, InputPointData } from "../../../AppTypes";

interface InputPointDataState{
  ref: RefObject<HTMLDivElement> | null;
}

const initialState:InputPointDataState = {
  ref: null
}

export const InputPointDataContext = React.createContext<InputPointDataState>(initialState);

interface InputPointDataProviderProps{
  children: React.ReactNode;
}

export function InputPointDataProvider({children}:InputPointDataProviderProps):React.ReactElement{
  const ref = useRef<HTMLDivElement | null>(null);

  const InputPointDataState = useMemo(():InputPointDataState=>{
    return{
      ref
    }
  },[])
  return(
    <InputPointDataContext.Provider value={InputPointDataState}>
      {children}
    </InputPointDataContext.Provider>
  )
}

export function useInputPointDataContext():InputPointDataState{
  return React.useContext(InputPointDataContext);
}


