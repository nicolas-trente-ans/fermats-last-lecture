export interface YTPlayer {
  seekTo(seconds: number, allowSeekAhead: boolean): void
  getCurrentTime(): number
  pauseVideo(): void
  cueVideoById(options: {
    videoId: string
    startSeconds?: number
    endSeconds?: number
  }): void
  destroy(): void
}

export interface YTPlayerOptions {
  videoId: string
  width?: string | number
  height?: string | number
  playerVars?: Record<string, string | number>
  events?: {
    onReady?: (event: { target: YTPlayer }) => void
    onStateChange?: (event: { data: number; target: YTPlayer }) => void
  }
}

export interface YTNamespace {
  Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer
  PlayerState?: {
    PLAYING: number
  }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

export {}
