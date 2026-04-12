# Snake.ARG

Juego retro estilo Game Boy hecho en Argentina. Controlá la serpiente, comé la mayor cantidad de comida posible y entrá al top 10.

---

## Cómo jugar

| Acción | Control |
|---|---|
| Mover | Flechas del teclado o WASD (elegís al iniciar) |
| Pausar | Espacio |
| Iniciar / Reiniciar | Clic en JUGAR o Espacio |
| Mover en móvil | Deslizar (swipe) |

- Cada vez que comés, la serpiente crece y sumás puntos
- Si chocás con una pared o con vos mismo, perdés
- Ingresá tu nombre al terminar para entrar al **Top 10**

---

## Dificultades

| Nivel | Velocidad | Puntos por comida | Monedas por comida |
|---|---|---|---|
| 🟢 Fácil | Lenta | +10 | 🪙 x1 |
| 🟡 Medio | Normal | +20 | 🪙 x2 |
| 🔴 Difícil | Rápida | +30 | 🪙 x3 |

> La dificultad solo se puede cambiar entre partidas.

---

## Sistema de monedas y tienda

Cada vez que la serpiente come, ganás monedas según la dificultad. Con ellas podés desbloquear skins en la tienda:

**Skins de serpiente disponibles:**
- ⚪ Blanco / Gris — 30 monedas
- 🔵 Celeste / Azul — 35 monedas
- 🟡 Dorado / Amarillo — 40 monedas
- 🟣 Rosa / Violeta — 45 monedas
- 🔴 Rojo / Naranja — 50 monedas

**Skins de comida disponibles:**
- 🍎 Manzana Roja — 30 monedas
- ⭐ Dorado — 35 monedas
- 🍇 Uva — 40 monedas
- 🍓 Frutilla — 45 monedas
- 🍊 Naranja — 50 monedas

Las monedas y skins desbloqueadas se guardan entre partidas.

---

## Tecnologías

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- Canvas API (para el tablero)
- localStorage (para leaderboard, monedas y skins)

---

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
