// import React, { useEffect, useRef } from "react";

// const ShiningHeartWithFireworks = () => {
//   const canvasRef = useRef(null);
//   const audioRef = useRef(null); // Reference for the audio

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const audioElement = audioRef.current;
//     if (audioElement) {
//       audioElement.play()
//     }

//     const fireworks = [];
//     const stars = [];
//     const text = ["I Love you Bisola", "My stubborn bby"];
//     let heartCompleted = false;


//     // Heart Path Calculation
//     const heartPath = (t) => {
//       const x = canvas.width / 2 + 250 * Math.sin(t) ** 3;
//       const y =
//         canvas.height / 2 -
//         (150 * Math.cos(t) -
//           60 * Math.cos(2 * t) -
//           30 * Math.cos(3 * t) -
//           15 * Math.cos(4 * t));
//       return { x, y };
//     };

//     // Firework class
//     class Firework {
//       constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.particles = [];
//         this.createParticles();
//       }

//       createParticles() {
//         for (let i = 0; i < 50; i++) {
//           const angle = (Math.PI * 2 * i) / 50;
//           const speed = Math.random() * 4 + 2;
//           this.particles.push({
//             x: this.x,
//             y: this.y,
//             vx: speed * Math.cos(angle),
//             vy: speed * Math.sin(angle),
//             opacity: 1,
//           });
//         }
//       }

//       update() {
//         this.particles.forEach((p) => {
//           p.x += p.vx;
//           p.y += p.vy;
//           p.opacity -= 0.02;
//         });
//       }

//       draw() {
//         this.particles.forEach((p) => {
//           if (p.opacity > 0) {
//             ctx.globalAlpha = p.opacity;
//             ctx.beginPath();
//             ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
//             ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
//             ctx.fill();
//           }
//         });
//       }
//     }

//     // Star class
//     class Star {
//       constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.size = Math.random() * 5 + 5; // Dynamic size for variety
//         this.color = `hsl(${Math.random() * 360}, 100%, 80%)`;
//         this.twinkleSpeed = Math.random() * 0.05 + 0.02;
//         this.opacity = Math.random();
//         this.twinkleDirection = Math.random() > 0.5 ? 1 : -1; // Twinkle effect
//       }

//       update() {
//         this.opacity += this.twinkleSpeed * this.twinkleDirection;
//         if (this.opacity > 1 || this.opacity < 0.2) {
//           this.twinkleDirection *= -1;
//         }
//       }

//       draw() {
//         ctx.globalAlpha = this.opacity;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//       }
//     }

//     // Add Fireworks
//     const addFirework = () => {
//       fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
//     };

//     // Draw Heart Progressively
//     let progress = 0;
//     const drawHeart = () => {
//       if (progress > 2 * Math.PI) {
//         heartCompleted = true;
//         return;
//       }

//       const { x, y } = heartPath(progress);
//       stars.push(new Star(x, y));
//       progress += 0.05;
//     };

//     // Draw Text Inside Heart
//     const drawText = () => {
//       if (heartCompleted) {
//         ctx.globalAlpha = 1;
//         ctx.fillStyle = "white";
//         ctx.font = "bold 30px Arial";
//         ctx.textAlign = "center";
//         ctx.fillText(text[0], canvas.width / 2, canvas.height / 2 - 20);
//         ctx.fillStyle = "pink";
//         ctx.fillText(text[1], canvas.width / 2, canvas.height / 2 + 30);
//       }
//     };

//     // Animation Loop
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       fireworks.forEach((firework, index) => {
//         firework.update();
//         firework.draw();
//         if (firework.particles.every((p) => p.opacity <= 0)) {
//           fireworks.splice(index, 1);
//         }
//       });

//       if (!heartCompleted) drawHeart();

//       stars.forEach((star) => {
//         star.update();
//         star.draw();
//       });

//       drawText();

//       requestAnimationFrame(animate);
//     };

//     // Fireworks to Introduce the Drawing
//     addFirework();
//     const fireworkInterval = setInterval(addFirework, 1000);

//     animate();

//     return () => {
//       clearInterval(fireworkInterval);
//       if (audioElement) {
//         audioElement.pause();
//         audioElement.currentTime = 0;
//       }
//     };
//   }, []);

//   return (
//     <>
//       <canvas ref={canvasRef} style={{ display: "block", background: "black" }} />
//       <audio
//         ref={audioRef}
//         src="/music/Funds.mp3" // Replace with your music file
//         loop // Loop the music
//       />
//     </>
//   );
// };

// export default ShiningHeartWithFireworks;

import React, { useEffect, useRef, useState } from "react";

const ShiningHeartWithFireworks = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const audioElement = audioRef.current;
    if (audioElement && isPlaying) {
      audioElement.play();
    }

    const fireworks = [];
    const stars = [];
    const text = ["I Love you Bisola", "My stubborn bby"];
    let heartCompleted = false;

    const heartPath = (t) => {
      const x = canvas.width / 2 + 250 * Math.sin(t) ** 3;
      const y =
        canvas.height / 2 -
        (150 * Math.cos(t) -
          60 * Math.cos(2 * t) -
          30 * Math.cos(3 * t) -
          15 * Math.cos(4 * t));
      return { x, y };
    };

    class Firework {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
      }

      createParticles() {
        for (let i = 0; i < 50; i++) {
          const angle = (Math.PI * 2 * i) / 50;
          const speed = Math.random() * 5 + 2;
          this.particles.push({
            x: this.x,
            y: this.y,
            vx: speed * Math.cos(angle),
            vy: speed * Math.sin(angle),
            opacity: 1,
          });
        }
      }

      update() {
        this.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.opacity -= 0.02;
        });
      }

      draw() {
        this.particles.forEach((p) => {
          if (p.opacity > 0) {
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
            ctx.fill();
          }
        });
      }
    }

    class Star {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 80%)`;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
        this.opacity = Math.random();
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity > 1 || this.opacity < 0.2) {
          this.twinkleDirection *= -1;
        }
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const addFirework = (x, y) => {
      fireworks.push(new Firework(x, y));
    };

    let progress = 0;
    const drawHeart = () => {
      if (progress > 2 * Math.PI) {
        heartCompleted = true;
        return;
      }

      const { x, y } = heartPath(progress);
      stars.push(new Star(x, y));
      progress += 0.05;

      // Add a moderate number of fireworks while drawing the heart
      for (let i = 0; i < 3; i++) {
        addFirework(x, y);
      }
    };

    const drawText = () => {
      if (heartCompleted) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(text[0], canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillStyle = "pink";
        ctx.fillText(text[1], canvas.width / 2, canvas.height / 2 + 30);

        // Reduce fireworks around the text
        for (let i = 0; i < 2; i++) {
          addFirework(canvas.width / 2, canvas.height / 2 - 20);
          addFirework(canvas.width / 2, canvas.height / 2 + 30);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles.every((p) => p.opacity <= 0)) {
          fireworks.splice(index, 1);
        }
      });

      if (!heartCompleted) drawHeart();

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      drawText();

      requestAnimationFrame(animate);
    };

    const fireworkInterval = setInterval(() => {
      if (heartCompleted) {
        // Reduce fireworks frequency after heart is complete
        addFirework(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      } else {
        // Frequent fireworks during heart drawing
        addFirework(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
        addFirework(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }
    }, 1000);

    animate();

    return () => {
      clearInterval(fireworkInterval);
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [isPlaying]);

  const handleAudioToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "block", background: "black" }} />
      <audio ref={audioRef} src="/music/Funds.mp4" loop />
      <button
        onClick={handleAudioToggle}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "rgba(255, 0, 0, 0.7)",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
    </>
  );
};

export default ShiningHeartWithFireworks;
