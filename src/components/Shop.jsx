import { useState } from "react";
import { SNAKE_SKINS, FOOD_SKINS, TEMA_CLARO, TEMA_OSCURO } from "../data/constants";

function Moneda({ size = 14 }) {
  return (
    <img
      src="/moneda.png"
      alt="moneda"
      style={{ width: size, height: size, objectFit: "contain", verticalAlign: "middle" }}
    />
  );
}

export default function Shop({
  monedas, snakeSkinId, foodSkinId,
  snakeUnlocked, foodUnlocked,
  onComprarSnake, onComprarFood,
  onEquiparSnake, onEquiparFood,
  darkMode,
}) {
  const [tab,      setTab]      = useState("SERPIENTE");
  const [feedback, setFeedback] = useState(null);
  const t = darkMode ? TEMA_OSCURO : TEMA_CLARO;

  const mostrarFeedback = (msg, ok) => {
    setFeedback({ msg, ok });
    setTimeout(() => setFeedback(null), 1800);
  };

  const handleSnake = (skinId) => {
    const skin = SNAKE_SKINS[skinId];
    if (snakeUnlocked.includes(skinId)) {
      onEquiparSnake(skinId);
      mostrarFeedback("¡Equipado!", true);
    } else if (monedas >= skin.precio) {
      onComprarSnake(skinId);
      mostrarFeedback(`¡Comprado! -${skin.precio}`, true);
    } else {
      mostrarFeedback(`Faltan ${skin.precio - monedas}`, false);
    }
  };

  const handleFood = (skinId) => {
    const skin = FOOD_SKINS[skinId];
    if (foodUnlocked.includes(skinId)) {
      onEquiparFood(skinId);
      mostrarFeedback("¡Equipado!", true);
    } else if (monedas >= skin.precio) {
      onComprarFood(skinId);
      mostrarFeedback(`¡Comprado! -${skin.precio}`, true);
    } else {
      mostrarFeedback(`Faltan ${skin.precio - monedas}`, false);
    }
  };

  const items        = tab === "SERPIENTE" ? Object.values(SNAKE_SKINS) : Object.values(FOOD_SKINS);
  const activeSkinId = tab === "SERPIENTE" ? snakeSkinId : foodSkinId;
  const unlockedList = tab === "SERPIENTE" ? snakeUnlocked : foodUnlocked;
  const handleClick  = tab === "SERPIENTE" ? handleSnake : handleFood;

  return (
    <div style={{
      background:   t.panelBg,
      border:       `2px solid ${t.panelBorder}`,
      borderRadius: 8,
      padding:      "14px",
      fontFamily:   "monospace",
      minWidth:     150,
      boxShadow:    darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.07)",
      transition:   "background 0.3s, border-color 0.3s",
    }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: 2 }}>🛒 TIENDA</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: "bold", color: "#F6B40E", fontSize: 13 }}>
          {monedas} <Moneda size={16} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {["SERPIENTE", "COMIDA"].map((tb) => (
          <button
            key={tb}
            onClick={() => setTab(tb)}
            style={{
              flex:         1,
              padding:      "4px 0",
              background:   tab === tb ? (darkMode ? "#1a4a6a" : t.accentLight) : "transparent",
              border:       `1.5px solid ${tab === tb ? t.accent : t.panelBorder}`,
              borderRadius: 4,
              color:        tab === tb ? t.accent : t.textMuted,
              fontFamily:   "monospace",
              fontSize:     9,
              fontWeight:   "bold",
              letterSpacing: 1,
              cursor:       "pointer",
            }}
          >
            {tb === "SERPIENTE" ? "🐍" : "🍎"} {tb}
          </button>
        ))}
      </div>

      {feedback && (
        <div style={{
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          gap:          4,
          padding:      "5px 8px",
          background:   feedback.ok
            ? darkMode ? "rgba(139,172,15,0.2)" : "rgba(74,122,74,0.12)"
            : "rgba(224,80,80,0.15)",
          border:       `1px solid ${feedback.ok ? t.accent : "#E05050"}`,
          borderRadius: 4,
          fontSize:     11,
          color:        feedback.ok ? t.accent : "#E05050",
          marginBottom: 8,
          fontWeight:   "bold",
        }}>
          {feedback.msg}
          {feedback.ok && feedback.msg.includes("-") && <Moneda size={13} />}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {items.map((item) => {
          const desbloqueada = unlockedList.includes(item.id);
          const activa       = activeSkinId === item.id;
          const puedePagar   = monedas >= item.precio;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          8,
                padding:      "7px 8px",
                background:   activa
                  ? darkMode ? "rgba(139,172,15,0.2)" : t.accentLight
                  : "transparent",
                border:       `1.5px solid ${activa ? t.accent : t.panelBorder}`,
                borderRadius: 5,
                cursor:       "pointer",
                width:        "100%",
                textAlign:    "left",
                opacity:      !desbloqueada && !puedePagar ? 0.45 : 1,
                transition:   "all 0.15s",
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize:     10,
                  fontWeight:   "bold",
                  color:        activa ? t.accent : t.textMain,
                  whiteSpace:   "nowrap",
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {item.label}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                  {desbloqueada ? (
                    <span style={{ fontSize: 9, color: activa ? t.accent : t.textMuted }}>
                      {activa ? "Equipada" : "Desbloqueada"}
                    </span>
                  ) : (
                    <>
                      <span style={{ fontSize: 9, color: t.textMuted }}>{item.precio}</span>
                      <Moneda size={11} />
                    </>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          4,
        fontSize:     8,
        color:        t.textFaint,
        marginTop:    10,
        lineHeight:   1.6,
        textAlign:    "center",
        justifyContent: "center",
        flexWrap:     "wrap",
      }}>
        Fácil <Moneda size={10} /> · Medio <Moneda size={10} /><Moneda size={10} /> · Difícil <Moneda size={10} /><Moneda size={10} /><Moneda size={10} />
      </div>
    </div>
  );
}
