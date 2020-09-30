import create from 'zustand'

window.onresize = () => {
  console.log( 'global screen: ', window.innerWidth );
}

export const useScreenProperties = create( set => ( {
  width: window.innerWidth,
  height: window.innerHeight,
  isSmallScreen: false,
  setIsSmallScreen: (s) => {
    window.innerWidth < 795
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