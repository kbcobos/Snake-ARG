import { useRef, useEffect } from "react";
import { CELL_COUNT, PALETA, ESTADO } from "../data/constants";

export default function Board({ snake, comida, canvasSize, status, snakeSkin, foodSkin }) {
  const canvasRef = useRef(null);
  const cellSize  = canvasSize / CELL_COUNT;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = PALETA.BG;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.strokeStyle = PALETA.GRID;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= CELL_COUNT; i++) {
      ctx.beginPath(); ctx.moveTo(i * cellSize, 0); ctx.lineTo(i * cellSize, canvasSize); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * cellSize); ctx.lineTo(canvasSize, i * cellSize); ctx.stroke();
    }

    const fx = comida.x * cellSize;
    const fy = comida.y * cellSize;
    const fp = Math.max(2, cellSize * 0.1);
    ctx.fillStyle = foodSkin.color;
    ctx.fillRect(fx + fp, fy + fp, cellSize - fp * 2, cellSize - fp * 2);
    ctx.fillStyle = foodSkin.highlight;
    ctx.fillRect(fx + fp, fy + fp, cellSize * 0.25, cellSize * 0.25);

    snake.forEach((seg, i) => {
      const sx = seg.x * cellSize;
      const sy = seg.y * cellSize;
      const sp = Math.max(1, cellSize * 0.06);

      if (i === 0) {
        ctx.fillStyle = snakeSkin.head;
        ctx.fillRect(sx + sp, sy + sp, cellSize - sp * 2, cellSize - sp * 2);
        if (status === ESTADO.JUGANDO) {
          ctx.fillStyle = PALETA.BG;
          const eyeSize = Math.max(1.5, cellSize * 0.12);
          ctx.fillRect(sx + cellSize * 0.25, sy + cellSize * 0.25, eyeSize, eyeSize);
          ctx.fillRect(sx + cellSize * 0.6,  sy + cellSize * 0.25, eyeSize, eyeSize);
        }
      } else {
        ctx.fillStyle = i % 2 === 0 ? snakeSkin.body : snakeSkin.bodyAlt;
        ctx.fillRect(sx + sp, sy + sp, cellSize - sp * 2, cellSize - sp * 2);
      }
    });

    if (status === ESTADO.PAUSADO) {
      ctx.fillStyle = "rgba(15,56,15,0.78)";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      ctx.fillStyle = "#E0F8CF";
      ctx.font = `bold ${Math.floor(canvasSize * 0.07)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("PAUSADO", canvasSize / 2, canvasSize / 2 - 10);
      ctx.font = `${Math.floor(canvasSize * 0.038)}px monospace`;
      ctx.fillText("ESPACIO para continuar", canvasSize / 2, canvasSize / 2 + 26);
    }
  }, [snake, comida, canvasSize, cellSize, status, snakeSkin, foodSkin]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{
        border:         `3px solid ${PALETA.BORDER}`,
        borderRadius:   4,
        display:        "block",
        imageRendering: "pixelated",
      }}
    />
  );
}
