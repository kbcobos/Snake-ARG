import { CELL_COUNT, DIRECCION, LS_HIGHSCORES, LS_MONEDAS, LS_SNAKE_SKIN, LS_FOOD_SKIN } from "../data/constants";

export function generarComida(snake) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * CELL_COUNT),
      y: Math.floor(Math.random() * CELL_COUNT),
    };
  } while (snake.some((seg) => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

export function verificarColision(head, snake) {
  if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) return true;
  return snake.slice(0, -1).some((seg) => seg.x === head.x && seg.y === head.y);
}

export function obtenerOpuesta(dir) {
  if (dir.x ===  1) return DIRECCION.LEFT;
  if (dir.x === -1) return DIRECCION.RIGHT;
  if (dir.y ===  1) return DIRECCION.UP;
  if (dir.y === -1) return DIRECCION.DOWN;
  return dir;
}

export function guardarPuntaje(nombre, puntaje, lsKey) {
  let scores = [];
  try { scores = JSON.parse(localStorage.getItem(lsKey)) || []; } catch { scores = []; }
  scores.push({
    nombre: nombre.trim() || "ANÓNIMO",
    puntaje,
    fecha: new Date().toLocaleDateString("es-AR"),
  });
  scores.sort((a, b) => b.puntaje - a.puntaje);
  const top10 = scores.slice(0, 10);
  localStorage.setItem(lsKey, JSON.stringify(top10));
  return top10;
}

export function cargarHighscores(lsKey) {
  try { return JSON.parse(localStorage.getItem(lsKey)) || []; } catch { return []; }
}

export function cargarMonedas() {
  try { return parseInt(localStorage.getItem(LS_MONEDAS) || "0", 10); } catch { return 0; }
}

export function guardarMonedas(cantidad) {
  localStorage.setItem(LS_MONEDAS, String(Math.max(0, cantidad)));
}

export function cargarSnakeSkin() {
  try { return localStorage.getItem(LS_SNAKE_SKIN) || "DEFAULT"; } catch { return "DEFAULT"; }
}

export function cargarFoodSkin() {
  try { return localStorage.getItem(LS_FOOD_SKIN) || "DEFAULT"; } catch { return "DEFAULT"; }
}

export function guardarSnakeSkin(skinId) {
  localStorage.setItem(LS_SNAKE_SKIN, skinId);
}

export function guardarFoodSkin(skinId) {
  localStorage.setItem(LS_FOOD_SKIN, skinId);
}

const LS_SNAKE_UNLOCKED = "snakearg_snake_unlocked";
const LS_FOOD_UNLOCKED  = "snakearg_food_unlocked";

export function cargarSnakeUnlocked() {
  try { return JSON.parse(localStorage.getItem(LS_SNAKE_UNLOCKED)) || ["DEFAULT"]; }
  catch { return ["DEFAULT"]; }
}

export function cargarFoodUnlocked() {
  try { return JSON.parse(localStorage.getItem(LS_FOOD_UNLOCKED)) || ["DEFAULT"]; }
  catch { return ["DEFAULT"]; }
}

export function desbloquearSnakeSkin(skinId, current) {
  const next = [...new Set([...current, skinId])];
  localStorage.setItem(LS_SNAKE_UNLOCKED, JSON.stringify(next));
  return next;
}

export function desbloquearFoodSkin(skinId, current) {
  const next = [...new Set([...current, skinId])];
  localStorage.setItem(LS_FOOD_UNLOCKED, JSON.stringify(next));
  return next;
}
