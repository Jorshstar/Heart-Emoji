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
  const canvasRef = useRef(null); // Reference to the canvas element
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false); // State to track whether the audio is playing

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Function to resize the canvas to fit the screen dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas(); // Initial canvas size setup
    window.addEventListener("resize", resizeCanvas); // Adjust canvas size on window resize

    // Play audio if the state indicates it's playing
    const audioElement = audioRef.current;
    if (audioElement && isPlaying) {
      audioElement.play();
    }

    const fireworks = []; // Array to store active fireworks
    const stars = []; // Array to store star particles forming the heart
    const text = ["I Love you Bisola", "My stubborn bby"]; // Text to display inside the heart
    let heartCompleted = false; // Flag to indicate if the heart drawing is complete

    // Function to calculate points on the heart path
    const heartPath = (t) => {
      const x = canvas.width / 2 + 250 * Math.sin(t) ** 3; // X-coordinate formula for the heart
      const y =
        canvas.height / 2 -
        (150 * Math.cos(t) -
          60 * Math.cos(2 * t) -
          30 * Math.cos(3 * t) -
          15 * Math.cos(4 * t)); // Y-coordinate formula for the heart
      return { x, y };
    };

    // Class to define a firework
    class Firework {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = []; // Particles making up the firework
        this.createParticles();
      }

      // Create particles for the firework
      createParticles() {
        for (let i = 0; i < 50; i++) {
          const angle = (Math.PI * 2 * i) / 50; // Distribute particles in a circular pattern
          const speed = Math.random() * 5 + 2; // Random speed for particles
          this.particles.push({
            x: this.x,
            y: this.y,
            vx: speed * Math.cos(angle), // X-velocity
            vy: speed * Math.sin(angle), // Y-velocity
            opacity: 1, // Initial opacity
          });
        }
      }

      // Update particle positions and reduce opacity
      update() {
        this.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.opacity -= 0.02; // Fade out particles
        });
      }

      // Draw particles on the canvas
      draw() {
        this.particles.forEach((p) => {
          if (p.opacity > 0) {
            ctx.globalAlpha = p.opacity; // Set particle opacity
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); // Draw a circular particle
            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`; // Random color
            ctx.fill();
          }
        });
      }
    }

    // Class to define a star particle
    class Star {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 5; // Random size for the star
        this.color = `hsl(${Math.random() * 360}, 100%, 80%)`; // Random color
        this.twinkleSpeed = Math.random() * 0.05 + 0.02; // Speed of the twinkle effect
        this.opacity = Math.random(); // Initial opacity
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1; // Direction of the twinkle effect
      }

      // Update the star's opacity for the twinkle effect
      update() {
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity > 1 || this.opacity < 0.2) {
          this.twinkleDirection *= -1; // Reverse direction if opacity limits are reached
        }
      }

      // Draw the star on the canvas
      draw() {
        ctx.globalAlpha = this.opacity; // Set star opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Draw a circular star
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Add a new firework to the fireworks array
    const addFirework = (x, y) => {
      fireworks.push(new Firework(x, y));
    };

    let progress = 0; // Tracks the progress of the heart drawing

    // Function to draw the heart incrementally
    const drawHeart = () => {
      if (progress > 2 * Math.PI) {
        heartCompleted = true; // Mark heart as completed
        return;
      }

      const { x, y } = heartPath(progress);
      stars.push(new Star(x, y)); // Add a star at the current heart position
      progress += 0.03; // Reduce speed of the heart drawing (smaller increment)

      // Add moderate fireworks during heart drawing
      for (let i = 0; i < 2; i++) {
        addFirework(x, y);
      }
    };

    // Function to display text and add fireworks on text
    const drawText = () => {
      if (heartCompleted) {
        ctx.globalAlpha = 1; // Reset opacity for text
        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(text[0], canvas.width / 2, canvas.height / 2 - 20); // First line of text
        ctx.fillStyle = "pink";
        ctx.fillText(text[1], canvas.width / 2, canvas.height / 2 + 30); // Second line of text

        // Add limited fireworks near the text
        for (let i = 0; i < 1; i++) {
          addFirework(canvas.width / 2, canvas.height / 2 - 20);
          addFirework(canvas.width / 2, canvas.height / 2 + 30);
        }
      }
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for the next frame

      fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        // Remove fireworks with fully faded particles
        if (firework.particles.every((p) => p.opacity <= 0)) {
          fireworks.splice(index, 1);
        }
      });

      if (!heartCompleted) drawHeart(); // Continue drawing the heart until complete

      stars.forEach((star) => {
        star.update();
        star.draw(); // Draw all stars
      });

      drawText(); // Display text when heart is complete

      requestAnimationFrame(animate); // Loop the animation
    };

    // Firework intervals: Reduce after heart is completed
    const fireworkInterval = setInterval(() => {
      if (heartCompleted) {
        // Reduced fireworks frequency
        addFirework(Math.random() * canvas.width, Math.random() * canvas.height);
      } else {
        // Frequent fireworks during heart drawing
        addFirework(Math.random() * canvas.width, Math.random() * canvas.height);
        addFirework(Math.random() * canvas.width, Math.random() * canvas.height);
      }
    }, 1000);

    animate(); // Start the animation loop

    return () => {
      clearInterval(fireworkInterval); // Clear intervals when component unmounts
      if (audioElement) {
        audioElement.pause(); // Stop the audio
        audioElement.currentTime = 0; // Reset audio playback
      }
    };
  }, [isPlaying]);

  // Toggle audio play/pause
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
