import { useState, useEffect, useRef, useCallback } from "react";
import {
  SNAKE_INICIAL, DIRECCION, ESTADO, DIFICULTAD,
  LS_HIGHSCORES, SNAKE_SKINS, FOOD_SKINS, CONTROL,
} from "../data/constants";
import {
  generarComida, verificarColision, obtenerOpuesta,
  guardarPuntaje, cargarHighscores,
  cargarMonedas, guardarMonedas,
  cargarSnakeSkin, cargarFoodSkin,
  guardarSnakeSkin, guardarFoodSkin,
  cargarSnakeUnlocked, cargarFoodUnlocked,
  desbloquearSnakeSkin, desbloquearFoodSkin,
} from "../utils/gameUtils";
import { useSwipe } from "./useSwipe";

export function useSnake() {
  const [snake,      setSnake]      = useState(SNAKE_INICIAL);
  const [comida,     setComida]     = useState(() => generarComida(SNAKE_INICIAL));
  const [status,     setStatus]     = useState(ESTADO.INICIO);
  const [puntaje,    setPuntaje]    = useState(0);
  const [dificultad, setDificultad] = useState("MEDIO");
  const [highscores, setHighscores] = useState(() => cargarHighscores(LS_HIGHSCORES));

  const [controlMode, setControlMode] = useState(CONTROL.FLECHAS);

  const [monedas,        setMonedas]        = useState(() => cargarMonedas());
  const [snakeSkinId,    setSnakeSkinId]    = useState(() => cargarSnakeSkin());
  const [foodSkinId,     setFoodSkinId]     = useState(() => cargarFoodSkin());
  const [snakeUnlocked,  setSnakeUnlocked]  = useState(() => cargarSnakeUnlocked());
  const [foodUnlocked,   setFoodUnlocked]   = useState(() => cargarFoodUnlocked());

  const snakeRef   = useRef(SNAKE_INICIAL);
  const comidaRef  = useRef(generarComida(SNAKE_INICIAL));
  const dirRef     = useRef(DIRECCION.RIGHT);
  const puntajeRef = useRef(0);
  const statusRef  = useRef(ESTADO.INICIO);
  const monedasRef = useRef(cargarMonedas());

  useEffect(() => { snakeRef.current   = snake;   }, [snake]);
  useEffect(() => { comidaRef.current  = comida;  }, [comida]);
  useEffect(() => { puntajeRef.current = puntaje; }, [puntaje]);
  useEffect(() => { statusRef.current  = status;  }, [status]);
  useEffect(() => { monedasRef.current = monedas; }, [monedas]);

  const cambiarDireccion = useCallback((nuevaDir) => {
    const opuesta = obtenerOpuesta(dirRef.current);
    if (nuevaDir.x === opuesta.x && nuevaDir.y === opuesta.y) return;
    dirRef.current = nuevaDir;
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) {
        e.preventDefault();
      }
      const st = statusRef.current;

      if (st === ESTADO.INICIO && (e.key === " " || e.key === "Enter")) {
        setStatus(ESTADO.CONTROL);
        return;
      }
      if (st === ESTADO.GAME_OVER && (e.key === " " || e.key === "Enter")) {
        iniciar();
        return;
      }
      if (e.key === " " && st === ESTADO.JUGANDO) {
        setStatus(ESTADO.PAUSADO);
        return;
      }
      if (e.key === " " && st === ESTADO.PAUSADO) {
        setStatus(ESTADO.JUGANDO);
        return;
      }
      if (st !== ESTADO.JUGANDO) return;

      if (controlMode === CONTROL.FLECHAS || controlMode === CONTROL.AMBOS) {
        switch (e.key) {
          case "ArrowUp":    cambiarDireccion(DIRECCION.UP);    break;
          case "ArrowDown":  cambiarDireccion(DIRECCION.DOWN);  break;
          case "ArrowLeft":  cambiarDireccion(DIRECCION.LEFT);  break;
          case "ArrowRight": cambiarDireccion(DIRECCION.RIGHT); break;
        }
      }
      if (controlMode === CONTROL.WASD || controlMode === CONTROL.AMBOS) {
        switch (e.key.toLowerCase()) {
          case "w": cambiarDireccion(DIRECCION.UP);    break;
          case "s": cambiarDireccion(DIRECCION.DOWN);  break;
          case "a": cambiarDireccion(DIRECCION.LEFT);  break;
          case "d": cambiarDireccion(DIRECCION.RIGHT); break;
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cambiarDireccion, controlMode]);

  useSwipe(useCallback((dir) => {
    if (statusRef.current !== ESTADO.JUGANDO) return;
    switch (dir) {
      case "UP":    cambiarDireccion(DIRECCION.UP);    break;
      case "DOWN":  cambiarDireccion(DIRECCION.DOWN);  break;
      case "LEFT":  cambiarDireccion(DIRECCION.LEFT);  break;
      case "RIGHT": cambiarDireccion(DIRECCION.RIGHT); break;
    }
  }, [cambiarDireccion]));

  useEffect(() => {
    if (status !== ESTADO.JUGANDO) return;
    const { speed, puntos, monedas: monedasPorComida } = DIFICULTAD[dificultad];

    const interval = setInterval(() => {
      const currentSnake = snakeRef.current;
      const currentComida = comidaRef.current;
      const currentDir = dirRef.current;

      const newHead = {
        x: currentSnake[0].x + currentDir.x,
        y: currentSnake[0].y + currentDir.y,
      };

      if (verificarColision(newHead, currentSnake)) {
        setStatus(ESTADO.GAME_OVER);
        return;
      }

      const comio = newHead.x === currentComida.x && newHead.y === currentComida.y;
      const newSnake = comio
        ? [newHead, ...currentSnake]
        : [newHead, ...currentSnake.slice(0, -1)];

      setSnake(newSnake);

      if (comio) {
        const nuevoPuntaje = puntajeRef.current + puntos;
        setPuntaje(nuevoPuntaje);

        const nuevasMonedas = monedasRef.current + monedasPorComida;
        setMonedas(nuevasMonedas);
        guardarMonedas(nuevasMonedas);

        const nuevaComida = generarComida(newSnake);
        setComida(nuevaComida);
        comidaRef.current = nuevaComida;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [status, dificultad]);

  const iniciar = useCallback(() => {
    const snakeInicial = SNAKE_INICIAL.map((s) => ({ ...s }));
    const nuevaComida  = generarComida(snakeInicial);

    snakeRef.current   = snakeInicial;
    comidaRef.current  = nuevaComida;
    dirRef.current     = DIRECCION.RIGHT;
    puntajeRef.current = 0;

    setSnake(snakeInicial);
    setComida(nuevaComida);
    setPuntaje(0);
    setStatus(ESTADO.JUGANDO);
  }, []);

  const irAControl = useCallback(() => {
    setStatus(ESTADO.CONTROL);
  }, []);

  const guardarResultado = useCallback((nombre) => {
    const nuevos = guardarPuntaje(nombre, puntajeRef.current, LS_HIGHSCORES);
    setHighscores(nuevos);
  }, []);

  const comprarSnakeSkin = useCallback((skinId) => {
    const skin = SNAKE_SKINS[skinId];
    if (!skin || monedasRef.current < skin.precio) return false;
    if (snakeUnlocked.includes(skinId)) {
      setSnakeSkinId(skinId);
      guardarSnakeSkin(skinId);
      return true;
    }
    const nuevasMonedas = monedasRef.current - skin.precio;
    setMonedas(nuevasMonedas);
    guardarMonedas(nuevasMonedas);
    const nuevasUnlocked = desbloquearSnakeSkin(skinId, snakeUnlocked);
    setSnakeUnlocked(nuevasUnlocked);
    setSnakeSkinId(skinId);
    guardarSnakeSkin(skinId);
    return true;
  }, [snakeUnlocked]);

  const comprarFoodSkin = useCallback((skinId) => {
    const skin = FOOD_SKINS[skinId];
    if (!skin || monedasRef.current < skin.precio) return false;
    if (foodUnlocked.includes(skinId)) {
      setFoodSkinId(skinId);
      guardarFoodSkin(skinId);
      return true;
    }
    const nuevasMonedas = monedasRef.current - skin.precio;
    setMonedas(nuevasMonedas);
    guardarMonedas(nuevasMonedas);
    const nuevasUnlocked = desbloquearFoodSkin(skinId, foodUnlocked);
    setFoodUnlocked(nuevasUnlocked);
    setFoodSkinId(skinId);
    guardarFoodSkin(skinId);
    return true;
  }, [foodUnlocked]);

  const equiparSnakeSkin = useCallback((skinId) => {
    if (!snakeUnlocked.includes(skinId)) return;
    setSnakeSkinId(skinId);
    guardarSnakeSkin(skinId);
  }, [snakeUnlocked]);

  const equiparFoodSkin = useCallback((skinId) => {
    if (!foodUnlocked.includes(skinId)) return;
    setFoodSkinId(skinId);
    guardarFoodSkin(skinId);
  }, [foodUnlocked]);

  return {
    snake, comida, status, puntaje, dificultad, setDificultad,
    highscores, iniciar, irAControl, guardarResultado,
    controlMode, setControlMode,
    monedas, snakeSkinId, foodSkinId,
    snakeUnlocked, foodUnlocked,
    comprarSnakeSkin, comprarFoodSkin,
    equiparSnakeSkin, equiparFoodSkin,
    snakeSkin: SNAKE_SKINS[snakeSkinId] || SNAKE_SKINS.DEFAULT,
    foodSkin:  FOOD_SKINS[foodSkinId]   || FOOD_SKINS.DEFAULT,
  };
}
