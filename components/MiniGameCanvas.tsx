"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";

type GameState = "idle" | "playing" | "gameover";

interface Obstacle {
  x: number;
  width: number;
  height: number;
  passed: boolean;
}

export default function MiniGameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const stateRef = useRef<{
    status: GameState;
    playerY: number;
    playerVy: number;
    jumpsRemaining: number;
    obstacles: Obstacle[];
    spawnTimer: number;
    speed: number;
    score: number;
    lastTime: number;
  }>({
    status: "idle",
    playerY: 0,
    playerVy: 0,
    jumpsRemaining: 2,
    obstacles: [],
    spawnTimer: 0,
    speed: 330,
    score: 0,
    lastTime: 0,
  });

  const startOrJump = useCallback(() => {
    const s = stateRef.current;
    if (s.status === "idle") {
      s.status = "playing";
      s.playerY = 0;
      s.playerVy = 460;
      s.jumpsRemaining = 1;
      s.obstacles = [];
      s.spawnTimer = 0.8;
      s.speed = 340;
      s.score = 0;
      setScore(0);
      setGameState("playing");
      return;
    }

    if (s.status === "playing" && s.jumpsRemaining > 0) {
      s.playerVy = 460;
      s.jumpsRemaining -= 1;
    }
  }, []);

  const restartGame = useCallback(() => {
    const s = stateRef.current;
    s.status = "playing";
    s.playerY = 0;
    s.playerVy = 0;
    s.jumpsRemaining = 2;
    s.obstacles = [];
    s.spawnTimer = 0.9;
    s.speed = 340;
    s.score = 0;
    s.lastTime = 0;
    setScore(0);
    setGameState("playing");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (
        activeTag === "input" ||
        activeTag === "textarea" ||
        activeTag === "select"
      ) {
        return;
      }

      if (e.code === "Space" || e.code === "ArrowUp") {
        // Trigger jump when game is active or canvas container is in viewport
        const rect = containerRef.current?.getBoundingClientRect();
        if (
          rect &&
          rect.top < window.innerHeight * 0.85 &&
          rect.bottom > window.innerHeight * 0.15
        ) {
          e.preventDefault();
          if (stateRef.current.status === "gameover") {
            restartGame();
          } else {
            startOrJump();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [restartGame, startOrJump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const WIDTH = 840;
    const HEIGHT = 280;
    const GROUND_Y = HEIGHT - 42;
    const PLAYER_SIZE = 32;
    const PLAYER_X = 92;
    const GRAVITY = 1320;

    const render = (timestamp: number) => {
      const s = stateRef.current;
      if (!s.lastTime) s.lastTime = timestamp;
      const dt = Math.min((timestamp - s.lastTime) / 1000, 0.05);
      s.lastTime = timestamp;

      // Clear white canvas
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Subtle background grid lines
      ctx.strokeStyle = "#F3F4F6";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < WIDTH; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, GROUND_Y);
        ctx.stroke();
      }
      for (let gy = 0; gy < GROUND_Y; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(WIDTH, gy);
        ctx.stroke();
      }

      // Ground baseline
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(WIDTH, GROUND_Y);
      ctx.stroke();

      if (s.status === "playing") {
        // Player vertical physics (playerY is height above ground)
        s.playerY += s.playerVy * dt;
        s.playerVy -= GRAVITY * dt;
        if (s.playerY <= 0) {
          s.playerY = 0;
          s.playerVy = 0;
          s.jumpsRemaining = 2;
        }

        // Speed ramps smoothly with score
        s.speed = Math.min(620, 340 + s.score * 9);

        // Spawn obstacles
        s.spawnTimer -= dt;
        if (s.spawnTimer <= 0) {
          const h = 30 + Math.floor(Math.random() * 34);
          const w = 22 + Math.floor(Math.random() * 18);
          s.obstacles.push({
            x: WIDTH + 20,
            width: w,
            height: h,
            passed: false,
          });
          s.spawnTimer = Math.max(0.68, 1.35 - s.score * 0.015) + Math.random() * 0.45;
        }

        // Move & check collisions
        const pLeft = PLAYER_X + 3;
        const pRight = PLAYER_X + PLAYER_SIZE - 3;
        const pBottom = GROUND_Y - s.playerY;
        const pTop = pBottom - PLAYER_SIZE + 3;

        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.x -= s.speed * dt;

          const oLeft = obs.x;
          const oRight = obs.x + obs.width;
          const oTop = GROUND_Y - obs.height;
          const oBottom = GROUND_Y;

          // Score check
          if (!obs.passed && oRight < PLAYER_X) {
            obs.passed = true;
            s.score += 1;
            setScore(s.score);
            setHighScore((prev) => Math.max(prev, s.score));
          }

          // AABB Collision check
          if (
            pRight > oLeft &&
            pLeft < oRight &&
            pBottom > oTop &&
            pTop < oBottom
          ) {
            s.status = "gameover";
            setGameState("gameover");
          }

          if (obs.x + obs.width < -40) {
            s.obstacles.splice(i, 1);
          }
        }
      }

      // Draw Obstacles (#4361EE Electric Blue)
      ctx.fillStyle = "#4361EE";
      for (const obs of s.obstacles) {
        const oy = GROUND_Y - obs.height;
        ctx.beginPath();
        ctx.roundRect(obs.x, oy, obs.width, obs.height, 6);
        ctx.fill();
      }

      // Draw Player (#7B2FF7 Neon Purple)
      const drawPlayerY = GROUND_Y - PLAYER_SIZE - s.playerY;
      ctx.fillStyle = "#7B2FF7";
      ctx.beginPath();
      ctx.roundRect(PLAYER_X, drawPlayerY, PLAYER_SIZE, PLAYER_SIZE, 7);
      ctx.fill();

      // Tiny visor eye on player for personality
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(PLAYER_X + 20, drawPlayerY + 9, 6, 6);

      // Score Counter Top-Right: "Score: 000"
      const paddedScore = String(s.score).padStart(3, "0");
      ctx.font = "700 16px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = "#1A1A2E";
      ctx.textAlign = "right";
      ctx.fillText(`Score: ${paddedScore}`, WIDTH - 24, 34);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-white/15"
    >
      <canvas
        ref={canvasRef}
        width={840}
        height={280}
        onClick={() => {
          if (gameState !== "gameover") startOrJump();
        }}
        aria-label="AZYMAR Jump Runner Mini-Game Canvas. Click or press Spacebar to jump."
        className="block h-[230px] w-full cursor-pointer bg-white sm:h-[280px]"
      />

      {/* Top-Left Mini HUD */}
      <div className="pointer-events-none absolute left-5 top-4 flex items-center gap-3 text-xs font-semibold text-[#6B7280]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-[#1A1A2E]">
          <span className="h-2 w-2 rounded-sm bg-[#7B2FF7]" />
          Click / Spacebar to Jump (Double-Jump Enabled!)
        </span>
        {highScore > 0 && (
          <span className="hidden items-center gap-1 rounded-full bg-[#4361EE]/10 px-2.5 py-1 text-[#4361EE] sm:inline-flex">
            <Trophy className="h-3.5 w-3.5" /> Best:{" "}
            {String(highScore).padStart(3, "0")}
          </span>
        )}
      </div>

      {/* Idle Overlay */}
      {gameState === "idle" && (
        <div
          onClick={startOrJump}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-white/65 p-6 text-center backdrop-blur-[2px]"
        >
          <span className="rounded-full bg-[#7B2FF7]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#7B2FF7]">
            Interactive Prototype
          </span>
          <p className="mt-2 font-display text-xl font-bold text-[#1A1A2E] sm:text-2xl">
            Click Anywhere or Press Space to Launch
          </p>
          <p className="mt-1 text-xs font-medium text-[#6B7280]">
            Leap over Electric Blue firewalls — double-tap for mid-air boost!
          </p>
        </div>
      )}

      {/* Game Over Screen Overlay */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/92 p-6 text-center backdrop-blur-sm">
          <p className="max-w-lg font-display text-lg font-bold text-[#1A1A2E] sm:text-2xl">
            Game Over! Score: {String(score).padStart(2, "0")} — Nice reflexes!
            Now imagine what we build at full scale.
          </p>
          <button
            type="button"
            onClick={restartGame}
            aria-label="Restart mini-game"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#4361EE] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-[#3551d4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE]"
          >
            <RotateCcw className="h-4 w-4" />
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
