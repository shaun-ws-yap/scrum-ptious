import { useEffect, useState } from 'react';

export default function useSidePanel() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [openPanel, setOpenPanel] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions)
    updateWindowDimensions()
    return () => window.removeEventListener('resize', updateWindowDimensions)
  })

  useEffect(() => {
    if (windowWidth > 1300 && openPanel) {
      setOpenPanel(false);
      return
    }
    if (windowWidth <= 1300 && openPanel ) {
      setOpenPanel(false);
      return;
    }
  }, [openPanel, windowWidth])

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth)
  }

  return {
    windowWidth,
    openPanel,
    setOpenPanel,
  }
}