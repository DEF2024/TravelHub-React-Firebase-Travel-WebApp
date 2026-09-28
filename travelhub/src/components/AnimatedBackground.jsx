import { useEffect, useRef } from "react";

const blobs = [
  { fx: 0.00021, fy: 0.00017, px: 0, py: 1, radius: 0.55, color: "40, 120, 100", alpha: 0.35 },
  { fx: 0.00015, fy: 0.00025, px: 2, py: 0.5, radius: 0.45, color: "30, 90, 80", alpha: 0.3 },
  { fx: 0.00028, fy: 0.00013, px: 4, py: 3, radius: 0.4, color: "61, 220, 180", alpha: 0.12 },
];

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: width / 2, y: height / 2, sx: width / 2, sy: height / 2 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const moveMouse = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const drawGlow = (x, y, radius, color, alpha) => {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    };

    const draw = (time) => {
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      for (const blob of blobs) {
        const x = width * (0.5 + 0.4 * Math.sin(time * blob.fx + blob.px));
        const y = height * (0.5 + 0.4 * Math.cos(time * blob.fy + blob.py));
        drawGlow(x, y, Math.max(width, height) * blob.radius, blob.color, blob.alpha);
      }

      mouse.sx += (mouse.x - mouse.sx) * 0.08;
      mouse.sy += (mouse.y - mouse.sy) * 0.08;
      drawGlow(mouse.sx, mouse.sy, 260, "61, 220, 180", 0.22);
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", moveMouse);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", moveMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" aria-hidden="true" />;
}

export default AnimatedBackground;