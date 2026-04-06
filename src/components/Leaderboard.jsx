import { TEMA_CLARO, TEMA_OSCURO } from "../data/constants";

const medallas = ["🥇","🥈","🥉","4°","5°","6°","7°","8°","9°","10°"];

export default function Leaderboard({ highscores, darkMode }) {
  const t = darkMode ? TEMA_OSCURO : TEMA_CLARO;

  return (
    <div style={{
      background:   t.panelBg,
      border:       `2px solid ${t.panelBorder}`,
      borderRadius: 8,
      padding:      "14px 16px",
      fontFamily:   "monospace",
      color:        t.textMain,
      minWidth:     165,
      maxHeight:    520,
      overflowY:    "auto",
      boxShadow:    darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.07)",
      transition:   "background 0.3s, border-color 0.3s",
    }}>
      <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 2, marginBottom: 10 }}>
        🏆 TOP 10
      </div>

      {highscores.length === 0 ? (
        <div style={{ fontSize: 11, color: t.textFaint, lineHeight: 1.7 }}>
          Sin registros<br />¡Jugá!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {highscores.map((entry, i) => (
            <div key={i} style={{
              display:        "flex",
              alignItems:     "center",
              gap:            6,
              padding:        "5px 6px",
              background:     i === 0
                ? darkMode ? "rgba(139,172,15,0.15)" : "rgba(74,122,74,0.1)"
                : "transparent",
              borderRadius:   4,
              border:         `1px solid ${i === 0 ? (darkMode ? "rgba(139,172,15,0.3)" : "rgba(74,122,74,0.2)") : "transparent"}`,
            }}>
              <span style={{ fontSize: i < 3 ? 14 : 11, minWidth: 22, textAlign: "center" }}>
                {medallas[i]}
              </span>
              <span style={{
                flex:         1,
                fontSize:     11,
                overflow:     "hidden",
                textOverflow: "ellipsis",
                whiteSpace:   "nowrap",
                color:        i === 0 ? t.accent : t.textMain,
                fontWeight:   i === 0 ? "bold" : "normal",
              }}>
                {entry.nombre}
              </span>
              <span style={{
                fontSize:   12,
                fontWeight: "bold",
                color:      i === 0 ? t.accent : t.textMuted,
                minWidth:   32,
                textAlign:  "right",
              }}>
                {entry.puntaje}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
