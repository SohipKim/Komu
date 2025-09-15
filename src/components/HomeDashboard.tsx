import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import {
  Calendar,
  MessageSquare,
  Settings,
  Heart,
  Plus,
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppScreen } from "../../../../Commu Final Ver. (explore)/src/App";

interface HomeDashboardProps {
  onNavigate: (screen: AppScreen) => void;
  onViewContributions: () => void;
  onViewCommuNotes: () => void;
  onCreateCleaningPlan: () => void;
}

// Heart Progress Component
function HeartProgressMeter({
  contributors,
  onHeartFeed,
  totalProgress,
  feedingAnimation,
  feedMessage,
}: {
  contributors: any[];
  onHeartFeed: (hearts: number) => void;
  totalProgress: number;
  feedingAnimation: boolean;
  feedMessage: string;
}) {
  const [{ isOver }, drop] = useDrop({
    accept: "heart",
    drop: (item: { hearts: number }) => {
      onHeartFeed(item.hearts);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="flex flex-col items-center">
      {/* Feeding Message */}
      {feedMessage && (
        <div className="mb-4 bg-gradient-to-r from-pink-100 to-red-100 border border-pink-300 rounded-full px-4 py-2 animate-bounce">
          <h4 className="text-center font-medium text-pink-800">
            {feedMessage}
          </h4>
        </div>
      )}

      {/* Total Progress Above Heart */}
      <div className="mb-4 text-center">
        <h1>{totalProgress}/100</h1>
        <p className="text-muted-foreground">Total Progress</p>
      </div>

      <div
        ref={drop}
        className={`relative flex justify-center items-center mb-4 transition-all duration-300 ${
          feedingAnimation ? "scale-110 animate-pulse" : ""
        } ${
          isOver
            ? "scale-105 ring-4 ring-pink-300 ring-opacity-50 rounded-full"
            : ""
        }`}
      >
        {/* Heart Container */}
        <div className="relative">
          {/* Heart Shape */}
          <div className="w-48 h-48 relative">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              {/* Heart Path */}
              <path
                d="M50,25 C50,25 25,10 15,25 C5,40 15,55 50,85 C85,55 95,40 85,25 C75,10 50,25 50,25 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
                className="opacity-30"
              />

              {/* Contribution Fill Lines */}
              <defs>
                <clipPath id="heartClip">
                  <path d="M50,25 C50,25 25,10 15,25 C5,40 15,55 50,85 C85,55 95,40 85,25 C75,10 50,25 50,25 Z" />
                </clipPath>
              </defs>

              {/* Fill based on contributions */}
              <g clipPath="url(#heartClip)">
                {/* Sohee's contribution (red) - bottom 40% */}
                <rect
                  x="0"
                  y={100 - (contributors[0]?.score || 0)}
                  width="100"
                  height={contributors[0]?.score || 0}
                  fill="#ef4444"
                  opacity="0.8"
                />

                {/* Sue's contribution (purple) - middle 30% */}
                <rect
                  x="0"
                  y={
                    100 -
                    (contributors[0]?.score || 0) -
                    (contributors[1]?.score || 0)
                  }
                  width="100"
                  height={contributors[1]?.score || 0}
                  fill="#a855f7"
                  opacity="0.8"
                />

                {/* Min's contribution (blue) - top 20% */}
                <rect
                  x="0"
                  y={
                    100 -
                    (contributors[0]?.score || 0) -
                    (contributors[1]?.score || 0) -
                    (contributors[2]?.score || 0)
                  }
                  width="100"
                  height={contributors[2]?.score || 0}
                  fill="#3b82f6"
                  opacity="0.8"
                />
              </g>

              {/* Heart Outline */}
              <path
                d="M50,25 C50,25 25,10 15,25 C5,40 15,55 50,85 C85,55 95,40 85,25 C75,10 50,25 50,25 Z"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Cute Pet Inside Heart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`relative z-10 transition-all duration-500 ${feedingAnimation ? "animate-bounce scale-125" : ""}`}
            >
              {/* Pet Body */}
              <div
                className={`w-12 h-12 bg-orange-300 rounded-full relative flex items-center justify-center border-2 border-orange-400 transition-all duration-300 ${
                  feedingAnimation
                    ? "bg-orange-200 shadow-lg"
                    : ""
                }`}
              >
                {/* Pet Face */}
                <div className="absolute">
                  {/* Eyes */}
                  <div className="flex space-x-1 mb-1">
                    <div
                      className={`w-1.5 h-1.5 bg-black rounded-full ${feedingAnimation ? "animate-ping" : "animate-pulse"}`}
                    ></div>
                    <div
                      className={`w-1.5 h-1.5 bg-black rounded-full ${feedingAnimation ? "animate-ping" : "animate-pulse"}`}
                    ></div>
                  </div>
                  {/* Smile - bigger when feeding */}
                  <div
                    className={`border-b-2 border-black rounded-full mx-auto transition-all duration-300 ${
                      feedingAnimation ? "w-3 h-2" : "w-2 h-1"
                    }`}
                  ></div>
                </div>

                {/* Ears */}
                <div
                  className={`absolute -top-2 -left-1 w-2 h-3 bg-orange-400 rounded-full transform rotate-45 transition-all duration-300 ${
                    feedingAnimation ? "animate-wiggle" : ""
                  }`}
                ></div>
                <div
                  className={`absolute -top-2 -right-1 w-2 h-3 bg-orange-400 rounded-full transform -rotate-45 transition-all duration-300 ${
                    feedingAnimation ? "animate-wiggle" : ""
                  }`}
                ></div>
              </div>

              {/* Pet Status */}
              {totalProgress > 60 && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1 shadow-lg">
                    <Heart className="w-2 h-2 text-red-500 fill-current" />
                    <p className="text-xs">Happy!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating Hearts Animation when pet is happy */}
          {totalProgress > 70 && (
            <div className="absolute inset-0 pointer-events-none">
              <Heart className="absolute top-8 left-12 w-3 h-3 text-pink-400 fill-current animate-bounce" />
              <Heart className="absolute top-12 right-8 w-2 h-2 text-red-400 fill-current animate-pulse" />
              <Heart className="absolute bottom-16 left-8 w-4 h-4 text-pink-500 fill-current animate-bounce delay-200" />
            </div>
          )}

          {/* Feeding Particle Effects */}
          {feedingAnimation && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${30 + ((i * 15) % 50)}%`,
                    top: `${30 + ((i * 20) % 40)}%`,
                    animationDelay: `${i * 200}ms`,
                    animationDuration: "1s",
                  }}
                >
                  <Heart className="w-2 h-2 text-pink-500 fill-current" />
                </div>
              ))}
              {/* Sparkles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={`sparkle-${i}`}
                  className="absolute text-yellow-400 animate-bounce"
                  style={{
                    left: `${40 + ((i * 10) % 30)}%`,
                    top: `${40 + ((i * 15) % 30)}%`,
                    animationDelay: `${i * 300}ms`,
                    animationDuration: "2s",
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Draggable Heart Component
function DraggableHeart({
  hearts,
  color,
}: {
  hearts: number;
  color: string;
}) {
  const [, drag] = useDrag({
    type: "heart",
    item: { hearts },
  });

  return (
    <div
      ref={drag}
      className={`${color} rounded-full flex items-center justify-center text-white text-sm cursor-grab active:cursor-grabbing transform hover:scale-105 transition-transform w-12 h-12`}
    >
      {hearts}
    </div>
  );
}

// Draggable User Heart Component (for top heart display)
function DraggableUserHeart({ hearts }: { hearts: number }) {
  const [, drag] = useDrag({
    type: "heart",
    item: { hearts },
  });

  return (
    <div
      ref={drag}
      className="flex items-center space-x-2 p-3 border rounded-lg w-fit cursor-grab active:cursor-grabbing transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:border-red-300 bg-gradient-to-r from-red-50 to-pink-50"
    >
      <Heart className="h-5 w-5 fill-red-500 text-red-500 animate-pulse" />
      <h5 className="font-medium">x{hearts}</h5>
      <p className="text-xs text-muted-foreground ml-2">
        Drag me!
      </p>
    </div>
  );
}

export function HomeDashboard({
  onNavigate,
  onViewContributions,
  onViewCommuNotes,
  onCreateCleaningPlan,
}: HomeDashboardProps) {
  const [showOnlyYours, setShowOnlyYours] = useState(false);
  const [contributors, setContributors] = useState([
    { name: "Sohee", score: 40, color: "bg-red-500" },
    { name: "Sue", score: 30, color: "bg-purple-500" },
    { name: "Min", score: 20, color: "bg-blue-500" },
  ]);
  const [userHearts, setUserHearts] = useState(30);
  const [feedingAnimation, setFeedingAnimation] =
    useState(false);
  const [feedMessage, setFeedMessage] = useState("");

  const totalProgress = contributors.reduce(
    (sum, contributor) => sum + contributor.score,
    0,
  );

  const tasks = [
    {
      id: 1,
      area: "Area",
      frequency: "Frequency",
      task: "Vacuum the floor",
      hearts: 30,
      assigned: false,
    },
    {
      id: 2,
      area: "All",
      frequency: "Weekly",
      task: "Vacuum the floor",
      hearts: 30,
      assigned: false,
    },
    {
      id: 3,
      area: "All",
      frequency: "Weekly",
      task: "Vacuum the floor",
      hearts: 30,
      assigned: false,
    },
  ];

  const handleHeartFeed = (hearts: number) => {
    // Handle feeding hearts to the pet
    console.log(`Fed ${hearts} hearts to the pet!`);

    // Trigger feeding animation
    setFeedingAnimation(true);

    // Set encouraging message
    const messages = [
      "Your pet loves it! 🥰",
      "Nom nom nom! 😋",
      "Pet is so happy! ✨",
      "Hearts make everything better! 💕",
      "Such a good pet parent! 🌟",
    ];
    setFeedMessage(
      messages[Math.floor(Math.random() * messages.length)],
    );

    // Reduce user hearts (optional - for now we'll keep it)
    // setUserHearts(prev => Math.max(0, prev - hearts));

    // Clear animation after duration
    setTimeout(() => {
      setFeedingAnimation(false);
      setFeedMessage("");
    }, 3000);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewContributions}
            >
              <Calendar className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewCommuNotes}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Draggable Heart Icon with X30 */}
        <div className="px-4 mb-4">
          <DraggableUserHeart hearts={userHearts} />
        </div>

        {/* Main Content - Horizontal Layout */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left Column - Gamified Heart Progress Section */}
            <div className="relative">
              {/* Heart-shaped Chart with Pet */}
              <HeartProgressMeter
                contributors={contributors}
                onHeartFeed={handleHeartFeed}
                totalProgress={totalProgress}
                feedingAnimation={feedingAnimation}
                feedMessage={feedMessage}
              />

              {/* Legend with Draggable Hearts */}
              <div className="flex justify-center space-x-8 mb-4">
                {contributors.map((contributor) => (
                  <div
                    key={contributor.name}
                    className="flex flex-col items-center space-y-2"
                  >
                    <DraggableHeart
                      hearts={contributor.score}
                      color={contributor.color}
                    />
                    <h4>{contributor.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 fill-red-400 text-red-400" />
                      <p className="text-xs text-muted-foreground">
                        {contributor.score}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeframe */}
              <p className="text-center text-muted-foreground">
                July 28 - Aug 3 (weekly)
              </p>
            </div>

            {/* Right Column - House Contribution Section */}
            <div className="bg-muted/50 rounded-lg">
              <div className="p-4">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2>House contribution</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                {/* Filter Toggle */}
                <div className="flex items-center space-x-3 mb-4">
                  <p>All</p>
                  <Switch
                    checked={showOnlyYours}
                    onCheckedChange={setShowOnlyYours}
                  />
                  <p>View only yours</p>
                </div>

                {/* Task List */}
                <div className="space-y-3 mb-4">
                  {tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="p-4 rounded-lg border-2"
                    >
                      {/* Category Tags */}
                      <div className="flex space-x-2 mb-3">
                        <Badge
                          variant="secondary"
                          className={`${
                            task.area === "Area"
                              ? "bg-green-100 text-green-800"
                              : task.area === "All"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100"
                          }`}
                        >
                          {task.area}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`${
                            task.frequency === "Frequency"
                              ? "bg-yellow-100 text-yellow-800"
                              : task.frequency === "Weekly"
                                ? "bg-yellow-400 text-white"
                                : "bg-gray-100"
                          }`}
                        >
                          {task.frequency}
                        </Badge>
                      </div>

                      {/* Task Content */}
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-2 border-gray-300"
                          />
                          <p>{task.task}</p>
                        </label>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          <p>x{task.hearts}</p>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-dashed border-2 text-muted-foreground"
                        >
                          + assign person
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Invite a Roommate Button */}
                <Button
                  variant="outline"
                  className="w-full border-dashed border-2 text-muted-foreground hover:border-primary hover:text-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Invite a roommate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}