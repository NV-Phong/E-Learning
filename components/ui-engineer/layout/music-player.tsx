"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
   Minimize2,
   Maximize2,
   Repeat,
   Shuffle,
   SkipBack,
   SkipForward,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Musics from "@/data/musics.json";
import { Song } from "@/types/song";
import { Button } from "@/components/ui/button";
import Icon from "../Icon";
import { SmoothCursor } from "@/components/magicui/smooth-cursor";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function MusicPlayer() {
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTrack, setCurrentTrack] = useState(0);
   const [progress, setProgress] = useState(0);
   const [isCollapsed, setIsCollapsed] = useState(true);
   const [isRepeat, setIsRepeat] = useState(false);
   const [isShuffle, setIsShuffle] = useState(false);
   const [isCursorEnabled, setIsCursorEnabled] = useState(false);
   const audioRef = useRef<HTMLAudioElement>(null);

   const tracks: Song[] = Musics;

   useEffect(() => {
      const audio = audioRef.current;

      const handleTimeUpdate = () => {
         if (audio) {
            setProgress((audio.currentTime / audio.duration) * 100);
         }
      };

      if (audio) {
         if (isPlaying) {
            audio.play();
         } else {
            audio.pause();
         }

         audio.addEventListener("timeupdate", handleTimeUpdate);

         return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            setProgress(0);
         };
      }
   }, [isPlaying, currentTrack]);

   const skipTrack = (forward: boolean) => {
      if (isShuffle) {
         const nextTrack = Math.floor(Math.random() * tracks.length);
         setCurrentTrack(nextTrack);
      } else {
         setCurrentTrack(
            (prevTrack) =>
               (prevTrack + (forward ? 1 : -1) + tracks.length) % tracks.length
         );
      }
      setProgress(0);
   };

   const handleProgressChange = (newProgress: number[]) => {
      const [value] = newProgress;
      setProgress(value);
      if (audioRef.current) {
         audioRef.current.currentTime =
            (audioRef.current.duration / 100) * value;
      }
   };

   const toggleCollapse = useCallback(() => {
      setIsCollapsed((prev) => !prev);
   }, []);

   const toggleRepeat = () => {
      setIsRepeat(!isRepeat);
   };

   const toggleShuffle = () => {
      setIsShuffle(!isShuffle);
   };

   const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
   };

   const CollapsedView = useCallback(
      () => (
         <div className="flex items-center justify-between space-x-2">
            <div className="flex-1 truncate">
               <p className="text-sm font-medium truncate">
                  {tracks[currentTrack].title}
               </p>
               <p className="text-xs text-muted-foreground truncate">
                  {tracks[currentTrack].artist}
               </p>
            </div>
            <Button
               className="bg-primary text-primary-foreground hover:[&>*]:invert dark:bg-white dark:[&>*]:invert dark:hover:[&>*]:invert-0"
               variant="outline"
               size="icon"
               onClick={() => setIsPlaying(!isPlaying)}
            >
               {isPlaying ? (
                  <Icon
                     styles="solid"
                     color="white"
                     name="pause-solid-rounded"
                  />
               ) : (
                  <Icon
                     styles="solid"
                     color="white"
                     name="play-solid-rounded"
                  />
               )}
            </Button>
            <Button
               variant="outline"
               size="icon"
               onClick={toggleCollapse}
               className="bg-transparent"
            >
               <Maximize2 className="h-3 w-3" />
            </Button>
         </div>
      ),
      [currentTrack, isPlaying, toggleCollapse, tracks]
   );

   return (
      <>
         {isCursorEnabled && <SmoothCursor />}
         <Card
            className={`w-full ${
               isCollapsed ? "max-w-xs" : "max-w-md"
            } mx-auto fixed bottom-4 right-4 p-3 bg-card/20 backdrop-blur-xl z-50 hidden md:block`}
         >
            <CardContent className="p-4">
               {isCollapsed ? (
                  <CollapsedView />
               ) : (
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                           <h2 className="text-lg font-bold truncate">
                              {tracks[currentTrack].title}
                           </h2>
                           <p className="text-sm text-muted-foreground truncate">
                              {tracks[currentTrack].artist}
                           </p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                 setIsCursorEnabled(!isCursorEnabled)
                              }
                              className={
                                 isCursorEnabled
                                    ? "!bg-primary text-primary-foreground dark:hover:!bg-transparent"
                                    : "bg-transparent dark:border-primary/10"
                              }
                           >
                              <Icon
                                 styles="solid"
                                 // className="dark:invert"
                                 name="cursor-magic-selection-02-solid-standard"
                              />
                           </Button>
                           <ModeToggle buttonStyle="bg-transparent dark:border-primary/10" />
                           <Button
                              variant="outline"
                              size="icon"
                              onClick={toggleCollapse}
                              className="bg-transparent dark:border-primary/10"
                           >
                              <Minimize2 className="h-3 w-3" />
                           </Button>
                        </div>
                     </div>

                     <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                           {audioRef.current &&
                              formatTime(audioRef.current.currentTime)}
                        </span>
                        <Slider
                           value={[progress]}
                           max={100}
                           step={1}
                           className="flex-grow w-full"
                           onValueChange={handleProgressChange}
                        />
                        <span className="text-xs text-muted-foreground">
                           {audioRef.current &&
                              formatTime(audioRef.current.duration)}
                        </span>
                     </div>
                     <div className="flex justify-center items-center space-x-2">
                        <Button
                           variant="outline"
                           size="icon"
                           onClick={toggleShuffle}
                           className={
                              isShuffle
                                 ? "bg-primary text-primary-foreground"
                                 : "bg-transparent dark:border-primary/10"
                           }
                        >
                           <Shuffle className="h-3 w-3" />
                        </Button>
                        <Button
                           variant="outline"
                           size="icon"
                           className="bg-transparent dark:border-primary/10"
                           onClick={() => skipTrack(false)}
                        >
                           <SkipBack className="h-3 w-3" />
                        </Button>
                        <Button
                           className="bg-primary text-primary-foreground hover:[&>*]:invert dark:bg-white dark:[&>*]:invert dark:hover:[&>*]:invert-0"
                           variant="outline"
                           size="icon"
                           onClick={() => setIsPlaying(!isPlaying)}
                        >
                           {isPlaying ? (
                              <Icon
                                 styles="solid"
                                 color="white"
                                 name="pause-solid-rounded"
                              />
                           ) : (
                              <Icon
                                 styles="solid"
                                 color="white"
                                 name="play-solid-rounded"
                              />
                           )}
                        </Button>
                        <Button
                           variant="outline"
                           size="icon"
                           className="bg-transparent dark:border-primary/10"
                           onClick={() => skipTrack(true)}
                        >
                           <SkipForward className="h-3 w-3" />
                        </Button>
                        <Button
                           variant="outline"
                           size="icon"
                           onClick={toggleRepeat}
                           className={
                              isRepeat
                                 ? "bg-primary text-primary-foreground"
                                 : "bg-transparent dark:border-primary/10"
                           }
                        >
                           <Repeat className="h-3 w-3" />
                        </Button>
                     </div>
                  </div>
               )}
            </CardContent>
            <audio
               ref={audioRef}
               src={tracks[currentTrack].src}
               onEnded={() => {
                  if (isRepeat) {
                     audioRef.current?.play();
                  } else {
                     skipTrack(true);
                  }
               }}
            />
         </Card>
      </>
   );
}
