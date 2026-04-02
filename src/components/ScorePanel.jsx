import { DIFICULTAD, ESTADO, TEMA_CLARO, TEMA_OSCURO } from "../data/constants";

function Moneda({ size = 16 }) {
  return (
    <img
      src="/moneda.png"
      alt="moneda"
      style={{ width: size, height: size, objectFit: "contain", verticalAlign: "middle" }}
    />
  );
}

export default function ScorePanel({ puntaje, highscore, dificultad, setDificultad, status, monedas, darkMode }) {
  const puedeChangeDif = status === ESTADO.INICIO || status === ESTADO.GAME_OVER || status === ESTADO.CONTROL;
  const t = darkMode ? TEMA_OSCURO : TEMA_CLARO;

  return (
    <div style={{
      background:   t.panelBg,
      border:       `2px solid ${t.panelBorder}`,
      borderRadius: 8,
      padding:      "14px 16px",
      fontFamily:   "monospace",
      color:        t.textMain,
      minWidth:     150,
      boxShadow:    darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.07)",
      transition:   "background 0.3s, border-color 0.3s",
    }}>

      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          8,
        padding:      "6px 10px",
        background:   "rgba(246,180,14,0.1)",
        border:       "1px solid rgba(246,180,14,0.3)",
        borderRadius: 6,
        marginBottom: 14,
      }}>
        <Moneda size={28} />
        <div>
          <div style={{ fontSize: 9, color: t.textMuted, letterSpacing: 2 }}>MONEDAS</div>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#F6B40E", lineHeight: 1 }}>
            {monedas}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 2 }}>PUNTAJE</div>
        <div style={{ fontSize: 26, fontWeight: "bold", lineHeight: 1.1, color: t.textMain }}>
          {String(puntaje).padStart(5, "0")}
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 2 }}>RÉCORD</div>
        <div style={{ fontSize: 18, fontWeight: "bold", lineHeight: 1.1, color: t.textMain }}>
          {String(highscore).padStart(5, "0")}
        </div>
      </div>

      <div style={{ height: 1, background: t.panelBorder, marginBottom: 12 }} />

      <div>
        <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 2, marginBottom: 6 }}>
          DIFICULTAD
        </div>
        {Object.entries(DIFICULTAD).map(([key, val]) => (
          <button
            key={key}
            onClick={() => puedeChangeDif && setDificultad(key)}
            style={{
              display:      "flex",
              alignItems:   "center",
              width:        "100%",
              padding:      "5px 8px",
              marginBottom: 4,
              background:   dificultad === key ? val.color : "transparent",
              color:        dificultad === key ? "#fff" : t.textMuted,
              border:       `1.5px solid ${dificultad === key ? val.color : t.panelBorder}`,
              borderRadius: 4,
              fontFamily:   "monospace",
              fontSize:     11,
              fontWeight:   "bold",
              cursor:       puedeChangeDif ? "pointer" : "not-allowed",
              letterSpacing: 1,
              opacity:      !puedeChangeDif && dificultad !== key ? 0.35 : 1,
              transition:   "all 0.2s",
              gap:          6,
            }}
          >
            <span>{key === "FACIL" ? "🟢" : key === "MEDIO" ? "🟡" : "🔴"}</span>
            <span style={{ flex: 1, textAlign: "left" }}>{val.label}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {Array(val.monedas).fill(0).map((_, i) => (
                <Moneda key={i} size={13} />
              ))}
            </span>
          </button>
        ))}
        {!puedeChangeDif && (
          <div style={{ fontSize: 9, color: t.textFaint, marginTop: 4 }}>
            Solo entre partidas
          </div>
        )}
      </div>
    </div>
  );
}
