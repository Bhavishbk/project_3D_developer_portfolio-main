import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Game = () => {
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Game constants
        const GRAVITY = 0.6;
        const JUMP_FORCE = -10;
        const GROUND_HEIGHT = 50;

        // Game state
        let player = {
            x: 50,
            y: canvas.height - GROUND_HEIGHT - 30,
            width: 30,
            height: 30,
            dy: 0,
            grounded: true,
            color: "#915EFF"
        };

        let obstacles = [];
        let frame = 0;
        let gameSpeed = 5;
        let currentScore = 0;

        const spawnObstacle = () => {
            const height = Math.random() * (50 - 20) + 20;
            obstacles.push({
                x: canvas.width,
                y: canvas.height - GROUND_HEIGHT - height,
                width: 20,
                height: height,
                color: "#ff0000"
            });
        };

        const drawPlayer = () => {
            ctx.fillStyle = player.color;
            // Draw minimal "stick man" or box
            ctx.fillRect(player.x, player.y, player.width, player.height);

            // Eyes to make it look alive
            ctx.fillStyle = "white";
            ctx.fillRect(player.x + 20, player.y + 5, 5, 5);
        };

        const drawGround = () => {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, 2);
        };

        const update = () => {
            if (!isPlaying) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update score
            frame++;
            if (frame % 10 === 0) {
                currentScore++;
                setScore(currentScore);
            }

            // Increase speed
            if (frame % 1000 === 0) gameSpeed += 0.5;

            // Player Physics
            if (!player.grounded) {
                player.dy += GRAVITY;
            }
            player.y += player.dy;

            // Ground collision
            if (player.y + player.height > canvas.height - GROUND_HEIGHT) {
                player.y = canvas.height - GROUND_HEIGHT - player.height;
                player.dy = 0;
                player.grounded = true;
            }

            drawGround();
            drawPlayer();

            // Obstacles
            if (frame % 120 === 0 || (frame % 60 === 0 && Math.random() > 0.7 && gameSpeed > 8)) {
                spawnObstacle();
            }

            for (let i = 0; i < obstacles.length; i++) {
                let obs = obstacles[i];
                obs.x -= gameSpeed;
                ctx.fillStyle = obs.color;
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

                // Collision Detection
                if (
                    player.x < obs.x + obs.width &&
                    player.x + player.width > obs.x &&
                    player.y < obs.y + obs.height &&
                    player.y + player.height > obs.y
                ) {
                    setIsPlaying(false);
                    setGameOver(true);
                }

                // Remove off-screen obstacles
                if (obs.x + obs.width < 0) {
                    obstacles.splice(i, 1);
                    i--;
                }
            }

            if (isPlaying) {
                animationFrameId = requestAnimationFrame(update);
            }
        };

        if (isPlaying) {
            // Reset logic if just starting
            if (gameOver) { // This condition is slightly tricky in effect hooks without refs, but for simple logic:
                // We rely on the button click to reset state, this effect handles the loop
            }
            update();
        } else {
            // Draw static frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGround();
            // Reset player pos for visual
            player.y = canvas.height - GROUND_HEIGHT - 30;
            drawPlayer();
        }

        const handleInput = (e) => {
            if ((e.code === "Space" || e.type === "touchstart" || e.type === "click") && player.grounded && isPlaying) {
                player.dy = JUMP_FORCE;
                player.grounded = false;
            }
        };

        window.addEventListener("keydown", handleInput);
        canvas.addEventListener("touchstart", handleInput);
        canvas.addEventListener("click", handleInput);

        return () => {
            window.removeEventListener("keydown", handleInput);
            canvas.removeEventListener("touchstart", handleInput);
            canvas.removeEventListener("click", handleInput);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isPlaying]);

    const startGame = () => {
        setIsPlaying(true);
        setGameOver(false);
        setScore(0);
    };

    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Relax & Play</p>
                <h2 className={styles.sectionHeadText}>Enjoy your time with Bhavish.</h2>
            </motion.div>

            <div className='w-full flex flex-col items-center justify-center mt-10 bg-tertiary rounded-2xl p-8 relative'>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={300}
                    className='max-w-full bg-black-200 rounded-lg cursor-pointer'
                />

                {!isPlaying && (
                    <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-2xl z-10'>
                        <h3 className='text-3xl font-bold text-white mb-4'>
                            {gameOver ? `Game Over! Score: ${score}` : "Ready to Run?"}
                        </h3>
                        <button
                            onClick={startGame}
                            className='bg-[#915EFF] py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary hover:bg-[#804dee] transition-colors'
                        >
                            {gameOver ? "Try Again" : "Start Game"}
                        </button>
                        <p className='text-secondary mt-2 text-sm'>Press Space or Click to Jump</p>
                    </div>
                )}

                {isPlaying && (
                    <div className="absolute top-10 right-10 text-white font-bold text-xl">
                        Score: {score}
                    </div>
                )}
            </div>
        </>
    );
};

export default SectionWrapper(Game, "game");
