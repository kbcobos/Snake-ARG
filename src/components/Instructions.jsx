import { useState } from "react";
import { TEMA_CLARO, TEMA_OSCURO } from "../data/constants";

function Moneda({ size = 12 }) {
  return (
    <img
      src="/moneda.png"
      alt="moneda"
      style={{ width: size, height: size, objectFit: "contain", verticalAlign: "middle" }}
    />
  );
}

export default function Instructions({ controlMode, darkMode }) {
  const [minimizado, setMinimizado] = useState(false);
  const t = darkMode ? TEMA_OSCURO : TEMA_CLARO;

  const controles = controlMode === "WASD"
    ? [
        { tecla: "W",   accion: "Arriba"     },
        { tecla: "S",   accion: "Abajo"      },
        { tecla: "A",   accion: "Izquierda"  },
        { tecla: "D",   accion: "Derecha"    },
        { tecla: "SPC", accion: "Pausar"     },
      ]
    : [
        { tecla: "↑",   accion: "Arriba"     },
        { tecla: "↓",   accion: "Abajo"      },
        { tecla: "←",   accion: "Izquierda"  },
        { tecla: "→",   accion: "Derecha"    },
        { tecla: "SPC", accion: "Pausar"     },
      ];

  return (
    <div style={{
      background:   t.panelBg,
      border:       `2px solid ${t.panelBorder}`,
      borderRadius: 8,
      fontFamily:   "monospace",
      minWidth:     150,
      overflow:     "hidden",
      boxShadow:    darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.07)",
      transition:   "background 0.3s, border-color 0.3s",
    }}>

      <button
        onClick={() => setMinimizado(!minimizado)}
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          width:          "100%",
          padding:        "12px 14px",
          background:     "transparent",
          border:         "none",
          cursor:         "pointer",
          fontFamily:     "monospace",
          color:          t.textMuted,
          fontSize:       10,
          letterSpacing:  2,
          textAlign:      "left",
        }}
      >
        <span>INSTRUCCIONES</span>
        <span style={{
          fontSize:   12,
          transition: "transform 0.2s",
          transform:  minimizado ? "rotate(0deg)" : "rotate(180deg)",
        }}>
          ▲
        </span>
      </button>

      {!minimizado && (
        <div style={{ padding: "0 14px 14px" }}>

          <div style={{
            fontSize:      10,
            color:         t.textMuted,
            lineHeight:    1.8,
            marginBottom:  12,
            paddingBottom: 10,
            borderBottom:  `1px solid ${t.panelBorder}`,
          }}>
            🐍 Comé la comida para crecer.<br />
            💀 No choques con las paredes<br />
            &nbsp;&nbsp;&nbsp;&nbsp;ni con vos mismo.
          </div>

          <div style={{ fontSize: 9, color: t.textMuted, letterSpacing: 2, marginBottom: 8 }}>
            CONTROLES ({controlMode})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
            {controles.map(({ tecla, accion }) => (
              <div key={tecla} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  minWidth:       30,
                  height:         22,
                  background:     darkMode ? "#1a2a3a" : t.accentLight,
                  border:         `1.5px solid ${t.panelBorder}`,
                  borderRadius:   4,
                  fontSize:       10,
                  fontWeight:     "bold",
                  color:          t.accent,
                  fontFamily:     "monospace",
                }}>
                  {tecla}
                </span>
                <span style={{ fontSize: 10, color: t.textMain }}>{accion}</span>
              </div>
            ))}
          </div>

          <div style={{
            padding:      "8px",
            background:   "rgba(246,180,14,0.08)",
            border:       "1px solid rgba(246,180,14,0.2)",
            borderRadius: 5,
            fontSize:     9,
            color:        "#c8920a",
            lineHeight:   1.7,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3, fontWeight: "bold" }}>
              <Moneda size={13} /> Ganás monedas comiendo:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 4 }}>
              <span>🟢 Fácil → <Moneda size={11} /></span>
              <span>🟡 Medio → <Moneda size={11} /> <Moneda size={11} /></span>
              <span>🔴 Difícil → <Moneda size={11} /> <Moneda size={11} /> <Moneda size={11} /></span>
            </div>
            <div style={{ marginTop: 4, opacity: 0.8 }}>
              Canjeálas en la tienda 🛒
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
