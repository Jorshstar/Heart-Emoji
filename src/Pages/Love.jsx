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
  const audioRef = useRef(null); // Reference for the audio
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const audioElement = audioRef.current;
    if (audioElement && audioPlaying) {
      audioElement.play(); // Only play if audioPlaying is true
    }

    const fireworks = [];
    const stars = [];
    const text = ["I Love you Bisola", "My stubborn bby"];
    let heartCompleted = false;

    // Heart Path Calculation
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

    // Firework class
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
          const speed = Math.random() * 4 + 2;
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

    // Star class
    class Star {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 5; // Dynamic size for variety
        this.color = `hsl(${Math.random() * 360}, 100%, 80%)`;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
        this.opacity = Math.random();
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1; // Twinkle effect
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

    // Add Fireworks
    const addFirework = () => {
      fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
    };

    // Draw Heart Progressively
    let progress = 0;
    const drawHeart = () => {
      if (progress > 2 * Math.PI) {
        heartCompleted = true;
        return;
      }

      const { x, y } = heartPath(progress);
      stars.push(new Star(x, y));
      progress += 0.05;
    };

    // Draw Text Inside Heart
    const drawText = () => {
      if (heartCompleted) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = "pink";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(text[0], canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillStyle = "pink";
        ctx.fillText(text[1], canvas.width / 2, canvas.height / 2 + 30);
      }
    };

    // Animation Loop
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

    // Fireworks to Introduce the Drawing
    addFirework();
    const fireworkInterval = setInterval(addFirework, 1000);

    animate();

    return () => {
      clearInterval(fireworkInterval);
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [audioPlaying]);

  // Handle Play Music Button
  const handlePlayMusic = () => {
    setAudioPlaying(true); // Set state to true to start the music
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "block", background: "black" }} />
      <audio ref={audioRef} src="/music/Funds.mp3" loop />
      
      {/* Button to play music */}
      {!audioPlaying && (
        <button
          onClick={handlePlayMusic}
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Play Music
        </button>
      )}
    </>
  );
};

export default ShiningHeartWithFireworks;