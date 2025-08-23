"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StickyNote from "@/components/ui-engineer/sticky-note";
import Icon from "@/components/ui-engineer/Icon";
import { Badge } from "@/components/ui/badge";
import Separator from "@/components/ui-engineer/separator";
import { CGEditorPreview } from "@/components/ui-engineer/preview-project/cg-editor-preview";

interface CheckpointNote {
   id: string;
   title: string;
   text: React.ReactNode;
   month: string;
   year: string;
   timeAgo: string;
   stackedNotes: {
      id: string;
      title: string;
      text: React.ReactNode;
      timeAgo: string;
   }[];
}

const checkpointNotes: CheckpointNote[] = [
   {
      id: "note-1",
      title: "Technical Summary",
      text: (
         <div className="flex flex-col gap-2">
            <div className="space-y-1">
               <Separator textPosition="center">Tech Stack</Separator>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="nextjs"
                        image={true}
                     />
                     NextJS
                  </Badge>
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="nodejs"
                        image={true}
                     />
                     NodeJS
                  </Badge>
               </div>
            </div>
            <div className="space-y-1">
               <Separator textPosition="center">Link Resource</Separator>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                     <Icon size={15} styles="solid" name="github" />
                     <a
                        href="https://github.com/NV-Phong/CG-Editor"
                        target="_blank"
                        className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                     >
                        GitHub
                     </a>
                  </Badge>
               </div>
            </div>
         </div>
      ),
      month: "May",
      year: "2025",
      timeAgo: "2 weeks ago",
      stackedNotes: [
         {
            id: "note-1-stack-1",
            title: "CG-Editor",
            text: (
               <div className="h-full flex flex-col gap-2">
                  <p className="overflow-y-auto text-foreground">
                     This GitHub Contribution Graph Editor, built with NextJS, provides
                     an intuitive interface with auto-commit functionality to make fake commit.
                  </p>
                  <CGEditorPreview />
               </div>
            ),
            timeAgo: "1 second ago",
         },
      ],
   },
   {
      id: "note-2",
      title: "Technical Summary",
      text: (
         <div className="flex flex-col gap-2">
            <div className="space-y-1">
               <Separator textPosition="center">Tech Stack</Separator>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="nextjs"
                        image={true}
                     />
                     NextJS
                  </Badge>
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="nestjs"
                        image={true}
                     />
                     NesJS
                  </Badge>
               </div>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="mongodb"
                        image={true}
                     />
                     MongoDB
                  </Badge>
               </div>
            </div>
            <div className="space-y-1">
               <Separator textPosition="center">Link Resource</Separator>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                     <Icon size={15} styles="solid" name="github" />
                     <a
                        href="https://github.com/NV-Phong/Workspacex"
                        target="_blank"
                        className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                     >
                        Client
                     </a>
                  </Badge>
                  <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                     <Icon size={15} styles="solid" name="github" />
                     <a
                        href="https://github.com/NV-Phong/WS-CoreServer"
                        target="_blank"
                        className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                     >
                        Server
                     </a>
                  </Badge>
               </div>
            </div>
            <div className="flex items-center justify-center -mt-2">
               <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                  <Icon size={15} styles="solid" name="figma" image={true} />
                  <a
                     href="https://www.figma.com/board/fCejx1ykXQ0Hmrl7xvU6GI/System-Design?node-id=0-1&t=rOWhrYzM8c8pe7oD-1"
                     target="_blank"
                     className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                  >
                     Database Diagram
                  </a>
               </Badge>
            </div>
         </div>
      ),
      month: "Mar",
      year: "2025",
      timeAgo: "1 week ago",
      stackedNotes: [
         {
            id: "note-2-stack-1",
            title: "Workspacex",
            text: "Designed to help individuals and teams organize their work efficiently. It combines note-taking, idea management, and task tracking in a unified workspace",
            timeAgo: "1 week ago",
         },
      ],
   },
   {
      id: "note-3",
      title: "Technical Summary",
      text: (
         <div className="flex flex-col gap-2">
            <div className="space-y-1">
               <Separator textPosition="center">Tech Stack</Separator>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="nextjs"
                        image={true}
                     />
                     NextJS
                  </Badge>
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="nestjs"
                        image={true}
                     />
                     NesJS
                  </Badge>
               </div>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="mongodb"
                        image={true}
                     />
                     MongoDB
                  </Badge>
               </div>
            </div>
            <div className="space-y-1">
               <Separator textPosition="center">Link Resource</Separator>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                     <Icon size={15} styles="solid" name="github" />
                     <a
                        href="https://github.com/NV-Phong/UI-Engineer"
                        target="_blank"
                        className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                     >
                        Client
                     </a>
                  </Badge>
                  <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                     <Icon size={15} styles="solid" name="github" />
                     <a
                        href="https://github.com/NV-Phong/UIE-Server"
                        target="_blank"
                        className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                     >
                        Server
                     </a>
                  </Badge>
               </div>
            </div>
            <div className="flex items-center justify-center -mt-2">
               <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                  <Icon size={15} styles="solid" name="figma" image={true} />
                  <a
                     href="https://www.figma.com/board/EclK9sza1WAQuYoos7FPLv/Database?t=CGilsdxZD3WmMbAp-1"
                     target="_blank"
                     className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                  >
                     Database Diagram
                  </a>
               </Badge>
            </div>
         </div>
      ),
      month: "Dec",
      year: "2024",
      timeAgo: "5 days ago",
      stackedNotes: [
         {
            id: "note-3-stack-1",
            title: "UI Engineer",
            text: "An online platform for front-end developers to store and share HTML and CSS code snippets. It also supports embedding prototypes from Figma, making it easy to create and maintain visual documentation.",
            timeAgo: "5 days ago",
         },
      ],
   },
   {
      id: "note-4",
      title: "Technical Summary",
      text: (
         <div className="flex flex-col gap-2">
            <div className="space-y-1">
               <Separator textPosition="center">Tech Stack</Separator>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="flutter"
                        image={true}
                     />
                     Flutter
                  </Badge>
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="nestjs"
                        image={true}
                     />
                     NesJS
                  </Badge>
               </div>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     <Icon
                        size={15}
                        styles="solid"
                        name="mongodb"
                        image={true}
                     />
                     MongoDB
                  </Badge>
               </div>
            </div>
            <div className="space-y-1">
               <Separator textPosition="center">Link Resource</Separator>
               <div className="flex items-center gap-2 justify-center">
                  <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                     <Icon size={15} styles="solid" name="github" />
                     <a
                        href="https://github.com/NV-Phong/PingMe"
                        target="_blank"
                        className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                     >
                        Client
                     </a>
                  </Badge>
                  <Badge className="text-primary-foreground-darker bg-transparent h-6.5">
                     <Icon size={15} styles="solid" name="github" />
                     <a
                        href="https://github.com/NV-Phong/PM-Server"
                        target="_blank"
                        className="hover:underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2"
                     >
                        Server
                     </a>
                  </Badge>
               </div>
            </div>
         </div>
      ),
      month: "Nov",
      year: "2024",
      timeAgo: "5 days ago",
      stackedNotes: [
         {
            id: "note-4-stack-1",
            title: "PingMe",
            text: "A simple chat application that enables seamless, real-time communication between users. With an intuitive interface, it supports instant messaging, ensuring a smooth and efficient user experience.",
            timeAgo: "5 days ago",
         },
      ],
   },
];

export default function MyWork() {
   const [notePositions, setNotePositions] = useState<
      Record<string, { x: number; y: number }>
   >({});
   const [noteOrder, setNoteOrder] = useState<string[]>([]);
   const [screenWidth, setScreenWidth] = useState(0);

   useEffect(() => {
      setScreenWidth(window.innerWidth);
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   useEffect(() => {
      if (noteOrder.length === 0) {
         const allNoteIds: string[] = [];
         checkpointNotes.forEach((note) => {
            allNoteIds.push(note.id);
            note.stackedNotes.forEach((stackedNote) => {
               allNoteIds.push(stackedNote.id);
            });
         });
         setNoteOrder(allNoteIds);
      }
   }, [noteOrder.length]);

   const handleNoteDragEnd = (noteId: string, x: number, y: number) => {
      setNotePositions((prev) => ({
         ...prev,
         [noteId]: { x, y },
      }));
   };

   const handleNoteDragStart = (noteId: string) => {
      const allNoteIds: string[] = [];
      checkpointNotes.forEach((note) => {
         allNoteIds.push(note.id);
         note.stackedNotes.forEach((stackedNote) => {
            allNoteIds.push(stackedNote.id);
         });
      });

      const otherNotes = allNoteIds.filter((id) => id !== noteId);
      setNoteOrder([...otherNotes, noteId]);
   };

   const getInitialNotePosition = (index: number) => {
      const isLeft = index % 2 === 0;
      const centerX = screenWidth / 2;
      const baseX = isLeft ? centerX - 450 : centerX + 150;
      const baseY = 120 + index * 280;
      return { x: baseX, y: baseY };
   };

   const getNoteRotation = (index: number, stackIndex: number = -1) => {
      const rotations = [
         [-3, 2, -5],
         [4, -2, 6],
         [-2, 5, -4],
         [3, -6, 1],
         [-4, 3, -1],
         [2, -3, 4],
      ];

      const groupRotations = rotations[index % rotations.length];
      return stackIndex === -1
         ? groupRotations[0]
         : groupRotations[stackIndex + 1];
   };

   const getNoteZIndex = (noteId: string, baseZIndex: number) => {
      const orderIndex = noteOrder.indexOf(noteId);
      if (orderIndex === -1) return baseZIndex;
      return 100 + orderIndex;
   };

   const timelineHeight = checkpointNotes.length * 280 + 300;
   const centerX = screenWidth / 2;

   if (screenWidth === 0) return null;

   return (
      <div className="relative" style={{ minHeight: `${timelineHeight}px` }}>
         {/* Central Timeline Line */}
         <div
            className="absolute w-0.5 bg-primary dark:bg-primary/50"
            style={{
               left: `${centerX}px`,
               transform: "translateX(-50%)",
               top: "80px",
               height: `${120 + checkpointNotes.length * 280 + 80 - 80}px`,
            }}
         />

         {/* Present Arrow and Label */}
         <div
            className="absolute z-30"
            style={{
               left: `${centerX}px`,
               transform: "translateX(-50%)",
               top: "20px",
            }}
         >
            <div className="flex flex-col items-center">
               <div className="text-primary-foreground-darker font-semibold mb-5">
                  PRESENT
               </div>
               <Icon
                  styles="solid"
                  className="!bg-primary-foreground-1"
                  name="arrow-up-double-solid-standard"
               />
            </div>
         </div>

         {/* Timeline Checkpoints */}
         {checkpointNotes.map((note, index) => {
            const isLeft = index % 2 === 0;
            const topPosition = 120 + index * 280;
            const dotCenterY = topPosition + 80;

            return (
               <div key={`checkpoint-${index}`}>
                  {/* Horizontal Connection Line */}
                  <div
                     className="absolute h-px bg-primary/30 z-10"
                     style={{
                        left: `${centerX - 100}px`,
                        width: "200px",
                        top: `${dotCenterY}px`,
                     }}
                  />

                  {/* Timeline Dot */}
                  <motion.div
                     className="absolute w-4 h-4 bg-card border-2 border-primary dark:border-primary/50 rounded-full shadow-sm z-20"
                     style={{
                        left: `${centerX - 8}px`,
                        top: `${dotCenterY - 8}px`,
                     }}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: index * 0.1 }}
                  />

                  {/* Date Card */}
                  <motion.div
                     className="absolute bg-card rounded-xl border z-30 p-3 min-w-[70px]"
                     style={{
                        left: isLeft
                           ? `${centerX - 120}px`
                           : `${centerX + 40}px`,
                        top: `${dotCenterY + 20}px`,
                     }}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 + 0.2 }}
                  >
                     <div className="text-center">
                        <p className="text-primary-foreground-1 font-semibold uppercase">
                           <code>{note.month}</code>
                        </p>
                        <p className="text-primary-foreground-darker text-xs font-medium uppercase">
                           <code>{note.year}</code>
                        </p>
                     </div>
                  </motion.div>
               </div>
            );
         })}

         {/* Final Checkpoint Dot */}
         <motion.div
            className="absolute w-4 h-4 bg-card border-2 border-primary rounded-full z-20"
            style={{
               left: `${centerX - 8}px`,
               top: `${120 + checkpointNotes.length * 280 + 80 - 8}px`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: checkpointNotes.length * 0.1 }}
         />

         {/* Checkpoint Notes */}
         <div className="relative">
            {checkpointNotes.map((note, index) => {
               const initialPos = getInitialNotePosition(index);
               const isLeft = index % 2 === 0;

               return (
                  <div key={`checkpoint-group-${index}`}>
                     {/* Main Note */}
                     <motion.div
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.4 }}
                     >
                        <StickyNote
                           text={
                              <div>
                                 <h3 className="font-semibold flex justify-center text-lg text-primary-foreground-1">
                                    {note.title}
                                 </h3>
                                 <div className="text-sm leading-relaxed">
                                    {note.text}
                                 </div>
                              </div>
                           }
                           date=""
                           timeAgo={note.timeAgo}
                           initialX={notePositions[note.id]?.x || initialPos.x}
                           initialY={notePositions[note.id]?.y || initialPos.y}
                           rotation={getNoteRotation(index)}
                           zIndex={getNoteZIndex(note.id, 30 + index * 3)}
                           onDragStart={() => handleNoteDragStart(note.id)}
                           onDragEnd={(x, y) =>
                              handleNoteDragEnd(note.id, x, y)
                           }
                           animation="none"
                        />
                     </motion.div>

                     {/* Stacked Notes */}
                     {note.stackedNotes.map((stackedNote, stackIndex) => {
                        const stackedPos = {
                           x:
                              (notePositions[stackedNote.id]?.x ||
                                 initialPos.x) +
                              (stackIndex + 1) * 8,
                           y:
                              (notePositions[stackedNote.id]?.y ||
                                 initialPos.y) -
                              (stackIndex + 1) * 6,
                        };

                        return (
                           <motion.div
                              key={stackedNote.id}
                              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                 delay: index * 0.2 + (stackIndex + 1) * 0.1,
                                 duration: 0.4,
                              }}
                           >
                              <StickyNote
                                 text={
                                    <div>
                                       <h3 className="font-semibold text-lg text-primary-foreground-1">
                                          {stackedNote.title}
                                       </h3>
                                       <div className="text-foreground text-sm">
                                          {stackedNote.text}
                                       </div>
                                    </div>
                                 }
                                 date=""
                                 timeAgo={stackedNote.timeAgo}
                                 initialX={stackedPos.x}
                                 initialY={stackedPos.y}
                                 rotation={getNoteRotation(index, stackIndex)}
                                 zIndex={getNoteZIndex(
                                    stackedNote.id,
                                    30 + index * 3 - (stackIndex + 1)
                                 )}
                                 onDragStart={() =>
                                    handleNoteDragStart(stackedNote.id)
                                 }
                                 onDragEnd={(x, y) =>
                                    handleNoteDragEnd(stackedNote.id, x, y)
                                 }
                                 animation="none"
                              />
                           </motion.div>
                        );
                     })}
                  </div>
               );
            })}
         </div>
      </div>
   );
}
