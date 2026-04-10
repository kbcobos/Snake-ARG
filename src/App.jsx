import { useState } from "react";
import { useSnake }      from "./hooks/useSnake";
import { useWindowSize } from "./hooks/useWindowSize";
import Board             from "./components/Board";
import ScorePanel        from "./components/ScorePanel";
import Leaderboard       from "./components/Leaderboard";
import Shop              from "./components/Shop";
import Instructions      from "./components/Instructions";
import GameOverScreen    from "./components/GameOverScreen";
import { ESTADO, DIFICULTAD, CONTROL, TEMA_CLARO, TEMA_OSCURO } from "./data/constants";

export default function App() {
  const {
    snake, comida, status, puntaje, dificultad, setDificultad,
    highscores, iniciar, irAControl, guardarResultado,
    controlMode, setControlMode,
    monedas, snakeSkinId, foodSkinId,
    snakeUnlocked, foodUnlocked,
    comprarSnakeSkin, comprarFoodSkin,
    equiparSnakeSkin, equiparFoodSkin,
    snakeSkin, foodSkin,
  } = useSnake();

  const [darkMode, setDarkMode] = useState(false);
  const { isMobile, isTablet, isDesktop } = useWindowSize();

  const canvasSize   = isMobile ? Math.min(300, window.innerWidth - 32) : isTablet ? 360 : 420;
  const mejorPuntaje = highscores.length > 0 ? highscores[0].puntaje : 0;
  const t = darkMode ? TEMA_OSCURO : TEMA_CLARO;

  return (
    <div style={{
      minHeight:     "100vh",
      background:    t.pageBg,
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center",
      fontFamily:    "monospace",
      padding:       "0 12px 28px",
      transition:    "background 0.4s",
    }}>

      <div style={{
        width:          "100%",
        maxWidth:       900,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        isMobile ? "14px 0 10px" : "18px 0 12px",
        borderBottom:   `1px solid ${t.panelBorder}`,
        marginBottom:   isMobile ? 12 : 16,
      }}>
        <div>
          <div style={{ fontSize: isMobile ? 9 : 10, color: t.textMuted, letterSpacing: 4 }}>
            🐍 RETRO GAME
          </div>
          <h1 style={{
            margin: 0, fontSize: isMobile ? 20 : 26,
            fontWeight: "bold", color: t.textMain,
            letterSpacing: 5,
            textShadow: darkMode ? "0 0 14px rgba(139,172,15,0.3)" : "none",
          }}>
            SNAKE<span style={{ color: t.accent }}>.ARG</span>
          </h1>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Modo claro" : "Modo oscuro"}
          style={{
            width: isMobile ? 34 : 40, height: isMobile ? 34 : 40,
            borderRadius: "50%",
            border: `2px solid ${t.panelBorder}`,
            background: darkMode ? "#0a1a2a" : t.accentLight,
            color: t.textMain, fontSize: isMobile ? 15 : 18,
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", flexShrink: 0, touchAction: "manipulation",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div style={{
        display:        "flex",
        gap:            isDesktop ? 16 : 10,
        alignItems:     "flex-start",
        justifyContent: "center",
        width:          "100%",
        maxWidth:       900,
        flexWrap:       isMobile ? "wrap" : "nowrap",
      }}>

        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <ScorePanel
              puntaje={puntaje} highscore={mejorPuntaje}
              dificultad={dificultad} setDificultad={setDificultad}
              status={status} monedas={monedas} darkMode={darkMode}
            />
            <Shop
              monedas={monedas}
              snakeSkinId={snakeSkinId} foodSkinId={foodSkinId}
              snakeUnlocked={snakeUnlocked} foodUnlocked={foodUnlocked}
              onComprarSnake={comprarSnakeSkin} onComprarFood={comprarFoodSkin}
              onEquiparSnake={equiparSnakeSkin} onEquiparFood={equiparFoodSkin}
              darkMode={darkMode}
            />
          </div>
        )}

        <div style={{
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          flexShrink:     0,
        }}>
          <div style={{ position: "relative" }}>

            {status === ESTADO.INICIO && (
              <div style={{
                position: "absolute", inset: 0,
                background: darkMode ? "rgba(10,30,10,0.95)" : "rgba(242,237,228,0.97)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                borderRadius: 4, zIndex: 10, padding: 16,
              }}>
                <div style={{ fontSize: 44, marginBottom: 6 }}>🐍</div>
                <div style={{
                  fontSize: isMobile ? 20 : 24, fontWeight: "bold",
                  letterSpacing: 4, color: darkMode ? "#9BBC0F" : t.accent,
                  marginBottom: 4,
                }}>
                  SNAKE.ARG
                </div>
                <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 2, marginBottom: 20 }}>
                  JUEGO RETRO ARGENTINO
                </div>
                <button onClick={irAControl} style={{
                  padding: "10px 32px",
                  background: t.accent, border: "none",
                  borderRadius: 4, color: "#fff",
                  fontFamily: "monospace", fontSize: 14,
                  fontWeight: "bold", letterSpacing: 3,
                  cursor: "pointer", marginBottom: 12,
                  touchAction: "manipulation",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  ▶ JUGAR
                </button>
                <div style={{ fontSize: 10, color: t.textFaint, textAlign: "center", lineHeight: 1.8 }}>
                  {isMobile ? "Deslizá para mover" : "Elegí tus controles al comenzar"}<br />
                  {!isMobile && "ESPACIO — pausar"}
                </div>
              </div>
            )}

            {status === ESTADO.CONTROL && (
              <div style={{
                position: "absolute", inset: 0,
                background: darkMode ? "rgba(10,30,10,0.96)" : "rgba(242,237,228,0.97)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                borderRadius: 4, zIndex: 10, padding: 20,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>⌨️</div>
                <div style={{
                  fontSize: 14, fontWeight: "bold",
                  color: darkMode ? "#9BBC0F" : t.accent,
                  letterSpacing: 3, marginBottom: 6,
                }}>
                  CONTROLES
                </div>
                <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, marginBottom: 22, textAlign: "center" }}>
                  ¿Cómo querés mover la serpiente?
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 240 }}>
                  {[
                    { id: CONTROL.FLECHAS, label: "Flechas del teclado", icon: "↑ ↓ ← →" },
                    { id: CONTROL.WASD,    label: "Teclas WASD",          icon: "W A S D"  },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setControlMode(opt.id); iniciar(); }}
                      style={{
                        padding:       "14px 16px",
                        background:    controlMode === opt.id
                          ? (darkMode ? "rgba(74,122,74,0.3)" : t.accentLight)
                          : (darkMode ? "#0F380F" : "#fff"),
                        border:        `2px solid ${controlMode === opt.id ? t.accent : t.panelBorder}`,
                        borderRadius:  8,
                        color:         t.textMain,
                        fontFamily:    "monospace",
                        cursor:        "pointer",
                        textAlign:     "left",
                        transition:    "all 0.2s",
                        touchAction:   "manipulation",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accent; }}
                      onMouseLeave={(e) => { if (controlMode !== opt.id) e.currentTarget.style.borderColor = t.panelBorder; }}
                    >
                      <div style={{ fontSize: 18, fontWeight: "bold", color: t.accent, letterSpacing: 3, marginBottom: 3 }}>
                        {opt.icon}
                      </div>
                      <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1 }}>
                        {opt.label}
                      </div>
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: 9, color: t.textFaint, marginTop: 16, textAlign: "center", lineHeight: 1.7 }}>
                  También podés deslizar en la pantalla.<br />
                  ESPACIO para pausar.
                </div>
              </div>
            )}

            {status === ESTADO.GAME_OVER && (
              <GameOverScreen
                puntaje={puntaje} highscores={highscores}
                onGuardar={guardarResultado} onReiniciar={irAControl}
                darkMode={darkMode}
              />
            )}

            <Board
              snake={snake} comida={comida}
              canvasSize={canvasSize} status={status}
              snakeSkin={snakeSkin} foodSkin={foodSkin}
            />
          </div>
        </div>

        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <Leaderboard highscores={highscores} darkMode={darkMode} />
            <Instructions controlMode={controlMode} darkMode={darkMode} />
          </div>
        )}
      </div>

      {isMobile && (
        <div style={{ width: "100%", maxWidth: 360, marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <ScorePanel
                puntaje={puntaje} highscore={mejorPuntaje}
                dificultad={dificultad} setDificultad={setDificultad}
                status={status} monedas={monedas} darkMode={darkMode}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Leaderboard highscores={highscores} darkMode={darkMode} />
            </div>
          </div>
          <Shop
            monedas={monedas}
            snakeSkinId={snakeSkinId} foodSkinId={foodSkinId}
            snakeUnlocked={snakeUnlocked} foodUnlocked={foodUnlocked}
            onComprarSnake={comprarSnakeSkin} onComprarFood={comprarFoodSkin}
            onEquiparSnake={equiparSnakeSkin} onEquiparFood={equiparFoodSkin}
            darkMode={darkMode}
          />
          <Instructions controlMode={controlMode} darkMode={darkMode} />
        </div>
      )}

      <div style={{ marginTop: 20, fontSize: 10, color: t.textFaint, letterSpacing: 2 }}>
        🧉 HECHO POR KATHERINE COBOS
      </div>
    </div>
  );
}
