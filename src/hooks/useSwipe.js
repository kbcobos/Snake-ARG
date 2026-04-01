import { useEffect } from "react";

export function useSwipe(onSwipe, minDistance = 30) {
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < minDistance) return;

      if (absDx > absDy) {
        onSwipe(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        onSwipe(dy > 0 ? "DOWN" : "UP");
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [onSwipe, minDistance]);
}
