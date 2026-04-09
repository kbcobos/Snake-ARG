import { useState } from "react";

export default function GameOverScreen({ puntaje, highscores, onGuardar, onReiniciar, darkMode }) {
  const [nombre,   setNombre]   = useState("");
  const [guardado, setGuardado] = useState(false);

  const esTopScore = highscores.length < 5 || puntaje > (highscores[highscores.length - 1]?.puntaje ?? 0);

  const handleGuardar = () => {
    if (guardado) return;
    onGuardar(nombre || "ANÓNIMO");
    setGuardado(true);
  };

  const overlayBg  = darkMode ? "rgba(5,15,25,0.93)"    : "rgba(245,252,245,0.96)";
  const titleColor = "#E05050";
  const textColor  = darkMode ? "#E0F8CF" : "#1a2a1a";
  const mutedColor = darkMode ? "#8BAC0F" : "#4a7a4a";
  const inputBg    = darkMode ? "#0F380F" : "#f0f8f0";
  const inputBorder = darkMode ? "#306230" : "#c0d8c0";
  const btnBg      = darkMode ? "#306230" : "#2a5a2a";
  const btnBorder  = darkMode ? "#8BAC0F" : "#4a7a4a";

  return (
    <div style={{
      position:       "absolute",
      inset:          0,
      background:     overlayBg,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      fontFamily:     "monospace",
      color:          textColor,
      borderRadius:   4,
      padding:        16,
      zIndex:         10,
    }}>

      <div style={{
        fontSize:      28,
        fontWeight:    "bold",
        letterSpacing: 4,
        color:         titleColor,
        marginBottom:  4,
        textShadow:    "0 0 12px rgba(224,80,80,0.4)",
        animation:     "parpadeo 1s infinite",
      }}>
        GAME OVER
      </div>

      <div style={{ fontSize: 13, color: mutedColor, letterSpacing: 2, marginBottom: 2 }}>
        PUNTAJE FINAL
      </div>
      <div style={{
        fontSize:     36,
        fontWeight:   "bold",
        color:        darkMode ? "#9BBC0F" : "#2a5a2a",
        marginBottom: 16,
      }}>
        {puntaje}
      </div>

      {!guardado ? (
        <div style={{ width: "100%", maxWidth: 220, marginBottom: 12 }}>
          {esTopScore && (
            <div style={{
              fontSize:  11,
              color:     "#F6B40E",
              letterSpacing: 1,
              marginBottom: 6,
              textAlign: "center",
              fontWeight: "bold",
            }}>
              ⭐ ¡ENTRÁS AL TOP 5! ⭐
            </div>
          )}
          <div style={{ fontSize: 11, color: mutedColor, letterSpacing: 1, marginBottom: 4 }}>
            TU NOMBRE
          </div>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value.toUpperCase().slice(0, 12))}
            onKeyDown={(e) => e.key === "Enter" && handleGuardar()}
            placeholder="JUGADOR"
            maxLength={12}
            style={{
              width:         "100%",
              padding:       "7px 10px",
              background:    inputBg,
              border:        `2px solid ${inputBorder}`,
              borderRadius:  4,
              color:         textColor,
              fontFamily:    "monospace",
              fontSize:      14,
              letterSpacing: 2,
              outline:       "none",
              boxSizing:     "border-box",
              marginBottom:  8,
            }}
            autoFocus
          />
          <button
            onClick={handleGuardar}
            style={{
              width:         "100%",
              padding:       "8px",
              background:    btnBg,
              border:        `2px solid ${btnBorder}`,
              borderRadius:  4,
              color:         "#ffffff",
              fontFamily:    "monospace",
              fontSize:      12,
              fontWeight:    "bold",
              letterSpacing: 2,
              cursor:        "pointer",
              transition:    "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = darkMode ? "#8BAC0F" : "#4a7a4a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = btnBg)}
          >
            GUARDAR
          </button>
        </div>
      ) : (
        <div style={{
          fontSize:     12,
          color:        mutedColor,
          marginBottom: 14,
          letterSpacing: 1,
        }}>
          ¡Puntaje guardado!
        </div>
      )}

      <button
        onClick={onReiniciar}
        style={{
          padding:       "10px 28px",
          background:    "transparent",
          border:        `2px solid ${darkMode ? "#E0F8CF" : "#1a2a1a"}`,
          borderRadius:  4,
          color:         textColor,
          fontFamily:    "monospace",
          fontSize:      13,
          fontWeight:    "bold",
          letterSpacing: 3,
          cursor:        "pointer",
          transition:    "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = darkMode ? "#E0F8CF" : "#1a2a1a";
          e.currentTarget.style.color      = darkMode ? "#0F380F" : "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color      = textColor;
        }}
      >
        ▶ JUGAR DE NUEVO
      </button>

      <div style={{ fontSize: 10, color: mutedColor, marginTop: 10, letterSpacing: 1, opacity: 0.6 }}>
        ESPACIO / ENTER también funciona
      </div>
    </div>
  );
}
