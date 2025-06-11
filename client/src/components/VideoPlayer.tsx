import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoPlayerProps {
  width?: string;
  height?: string;
  url: string;
  onProgressUpdate?: (data: ProgressData) => void;
  progressData?: ProgressData;
}

interface ProgressData {
  progressValue: number;
  [key: string]: any;
}

// Add progress state interface
interface ProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;
type VideoQuality = "auto" | "1080p" | "720p" | "480p" | "360p";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  width = "100%",
  height = "100%",
  url,
  onProgressUpdate,
  progressData,
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
  const [quality, setQuality] = useState<VideoQuality>("auto");

  const playerRef = useRef<ReactPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handlePlayAndPause() {
    setPlaying(!playing);
  }

  function handleProgress(state: ProgressState) {
    if (!seeking) {
      setPlayed(state.played);
    }
  }

  function handleRewind() {
    playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 5);
  }

  function handleForward() {
    playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 5);
  }

  function handleToggleMute() {
    setMuted(!muted);
  }

  function handleSeekChange(newValue: number[]) {
    setPlayed(newValue[0]);
    setSeeking(true);
  }

  function handleSeekMouseUp() {
    setSeeking(false);
    playerRef.current?.seekTo(played);
  }

  function handleVolumeChange(newValue: number[]) {
    setVolume(newValue[0]);
  }

  // Fix pad type
  function pad(string: number): string {
    return ("0" + string).slice(-2);
  }

  function formatTime(seconds: number): string {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());

    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }

    return `${mm}:${ss}`;
  }

  const handleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      if (playerContainerRef?.current.requestFullscreen) {
        playerContainerRef?.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullScreen]);

  function handleMouseMove() {
    setShowControls(true);
    if (!isSettingsOpen) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        3000
      );
    }
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  // Fix played effect type safety
  useEffect(() => {
    if (played === 1 && onProgressUpdate && progressData) {
      onProgressUpdate({
        ...progressData,
        progressValue: played,
      });
    }
  }, [played, onProgressUpdate, progressData]);

  useEffect(() => {
    if (played === 1) {
      // onProgressUpdate({
      //   ...progressData,
      //   progressValue: played,
      // });
      setPlaying(false);
    }
  }, [played]);

  const playbackSpeeds: PlaybackSpeed[] = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const videoQualities: VideoQuality[] = [
    "auto",
    "1080p",
    "720p",
    "480p",
    "360p",
  ];

  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out 
      ${isFullScreen ? "w-screen h-screen" : ""}
      `}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackSpeed}
        onProgress={handleProgress}
      />
      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={(value) => handleSeekChange([value[0] / 100])}
            onValueCommit={handleSeekMouseUp}
            className="w-full mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayAndPause}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button
                onClick={handleRewind}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                onClick={handleForward}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
              >
                <RotateCw className="h-6 w-6" />
              </Button>
              <Button
                onClick={handleToggleMute}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
              >
                {muted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => handleVolumeChange([value[0] / 100])}
                className="w-24 "
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-white">
                {formatTime(played * (playerRef?.current?.getDuration() || 0))}/{" "}
                {formatTime(playerRef?.current?.getDuration() || 0)}
              </div>
              <DropdownMenu
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                  >
                    <Settings className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="p-2">
                    <div className="mb-2">
                      <span className="text-sm font-semibold">
                        Playback Speed
                      </span>
                      {playbackSpeeds.map((speed) => (
                        <DropdownMenuItem
                          key={speed}
                          onClick={() => setPlaybackSpeed(speed)}
                          className={`${
                            playbackSpeed === speed ? "bg-gray-100" : ""
                          }`}
                        >
                          {speed}x
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <div>
                      <span className="text-sm font-semibold">Quality</span>
                      {videoQualities.map((q) => (
                        <DropdownMenuItem
                          key={q}
                          onClick={() => setQuality(q)}
                          className={`${quality === q ? "bg-gray-100" : ""}`}
                        >
                          {q}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
                onClick={handleFullScreen}
              >
                {isFullScreen ? (
                  <Minimize className="h-6 w-6" />
                ) : (
                  <Maximize className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
