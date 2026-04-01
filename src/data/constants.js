export const CELL_COUNT = 20;

export const PALETA = {
  BG:    "#0F380F",
  GRID:  "#1a4a1a",
  BORDER:"#306230",
};

export const TEMA_CLARO = {
  pageBg:      "#F2EDE4",
  panelBg:     "#FDFAF6",
  panelBorder: "#DDD5C8",
  textMain:    "#2C2416",
  textMuted:   "#7A6A50",
  textFaint:   "#C4B8A8",
  accent:      "#4a7a4a",
  accentLight: "#d8eed8",
};

export const TEMA_OSCURO = {
  pageBg:      "#050f14",
  panelBg:     "#0a1a2a",
  panelBorder: "#1a4a6a",
  textMain:    "#e8f4fd",
  textMuted:   "#7aaac8",
  textFaint:   "#2a4a6a",
  accent:      "#4a7a4a",
  accentLight: "#1a3a1a",
};

export const CONTROL = {
  FLECHAS: "FLECHAS",
  WASD:    "WASD",
};

export const DIFICULTAD = {
  FACIL:   { label: "FÁCIL",   speed: 180, puntos: 10, monedas: 1, color: "#8BAC0F" },
  MEDIO:   { label: "MEDIO",   speed: 120, puntos: 20, monedas: 2, color: "#F6B40E" },
  DIFICIL: { label: "DIFÍCIL", speed: 65,  puntos: 30, monedas: 3, color: "#E05050" },
};

export const DIRECCION = {
  UP:    { x: 0,  y: -1 },
  DOWN:  { x: 0,  y: 1  },
  LEFT:  { x: -1, y: 0  },
  RIGHT: { x: 1,  y: 0  },
};

export const ESTADO = {
  INICIO:    "inicio",
  CONTROL:   "control",
  JUGANDO:   "jugando",
  PAUSADO:   "pausado",
  GAME_OVER: "game_over",
};

export const LS_HIGHSCORES  = "snakearg_highscores";
export const LS_MONEDAS     = "snakearg_monedas";
export const LS_SNAKE_SKIN  = "snakearg_snake_skin";
export const LS_FOOD_SKIN   = "snakearg_food_skin";

export const SNAKE_INICIAL = [
  { x: 12, y: 10 },
  { x: 11, y: 10 },
  { x: 10, y: 10 },
];

export const SNAKE_SKINS = {
  DEFAULT: {
    id: "DEFAULT", label: "Retro Verde", emoji: "🟢",
    precio: 0,
    head: "#E0F8CF", body: "#8BAC0F", bodyAlt: "#7a9c0a",
  },
  BLANCO: {
    id: "BLANCO", label: "Blanco / Gris", emoji: "⚪",
    precio: 30,
    head: "#F5F5F5", body: "#9E9E9E", bodyAlt: "#757575",
  },
  CELESTE: {
    id: "CELESTE", label: "Celeste / Azul", emoji: "🔵",
    precio: 35,
    head: "#B3E5FC", body: "#0288D1", bodyAlt: "#0277BD",
  },
  DORADO: {
    id: "DORADO", label: "Dorado / Amarillo", emoji: "🟡",
    precio: 40,
    head: "#FFF9C4", body: "#F9A825", bodyAlt: "#F57F17",
  },
  ROSA: {
    id: "ROSA", label: "Rosa / Violeta", emoji: "🟣",
    precio: 45,
    head: "#F8BBD0", body: "#9C27B0", bodyAlt: "#7B1FA2",
  },
  ROJO: {
    id: "ROJO", label: "Rojo / Naranja", emoji: "🔴",
    precio: 50,
    head: "#FFCCBC", body: "#E64A19", bodyAlt: "#BF360C",
  },
};

export const FOOD_SKINS = {
  DEFAULT: {
    id: "DEFAULT", label: "Verde Retro", emoji: "🍏",
    precio: 0,
    color: "#9BBC0F", highlight: "#E0F8CF",
  },
  ROJO: {
    id: "ROJO", label: "Manzana Roja", emoji: "🍎",
    precio: 30,
    color: "#E53935", highlight: "#FFCDD2",
  },
  DORADO: {
    id: "DORADO", label: "Dorado", emoji: "⭐",
    precio: 35,
    color: "#FFD600", highlight: "#FFFDE7",
  },
  CELESTE: {
    id: "MORADO", label: "Uva", emoji: "🍇",
    precio: 40,
    color: "#670086", highlight: "#B3E5FC",
  },
  ROSA: {
    id: "ROSA", label: "Frutilla", emoji: "🍓",
    precio: 45,
    color: "#E91E63", highlight: "#FCE4EC",
  },
  NARANJA: {
    id: "NARANJA", label: "Naranja", emoji: "🍊",
    precio: 50,
    color: "#FF6D00", highlight: "#FFE0B2",
  },
};
