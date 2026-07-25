let apiPromise: Promise<void> | null = null

export function useYoutubeApi() {
  function loadYoutubeApi(): Promise<void> {
    if (window.YT?.Player) return Promise.resolve()
    if (apiPromise) return apiPromise
    apiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previous?.()
        resolve()
      }
      if (!document.querySelector('script[data-yt-api]')) {
        const script = document.createElement('script')
        script.src = 'https://www.youtube.com/iframe_api'
        script.async = true
        script.dataset.ytApi = '1'
        document.head.appendChild(script)
      }
      if (window.YT?.Player) resolve()
    })
    return apiPromise
  }

  return { loadYoutubeApi }
}
