import { useEffect, useState } from 'react';

export default function useSidebar() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions)
    updateWindowDimensions()
    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [])

  useEffect(() => {
    if (windowWidth < 950) {
      console.log('close')
      return
    }
    console.log('open');
  }, [windowWidth])

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth)
  }

  return {
    windowWidth,
  }
}