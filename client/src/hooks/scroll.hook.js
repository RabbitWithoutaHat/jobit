import { useState, useEffect } from 'react'

const useInfiniteScroll = (callback, isDesableHook) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (!isDesableHook) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!isFetching || isDesableHook) return
    callback(() => {})
  }, [isFetching])

  function handleScroll() {
    if (!isDesableHook) {
      if (
        window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 150 ||
        isFetching
      )
        return
      setIsFetching(true)
    }
  }

  return [isFetching, setIsFetching]
}

export default useInfiniteScroll
