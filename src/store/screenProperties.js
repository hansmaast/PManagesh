import create from 'zustand'
import { smallScreen } from "../style/dimensions";

export const useScreenProperties = create( set => ( {
  width: window.innerWidth,
  height: window.innerHeight,
  isSmallScreen: false,
  setIsSmallScreen: (s) => {
    window.innerWidth < smallScreen
        ? set( { isSmallScreen: true } )
        : set( { isSmallScreen: false } )
  },
  setWidth: () => {
    console.log( 'setting width:', window.innerWidth )
    set( { width: window.innerWidth } )
  },
  setHeight: () => {
    set( { height: window.innerHeight } )
  },
} ) )