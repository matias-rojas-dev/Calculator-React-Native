import {useRef, useState} from 'react';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');
  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    if (numero.includes('.') && numeroTexto === '.') {
      return;
    }

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // Punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);

        // Si es otro cero y si hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);

        // Si es diferente de cero y no tiene un punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);

        //Evitar 0000.0
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const cambiarNumPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.substring(0, numero.length - 1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDel = () => {
    if ((numero.length === 2 && numero.includes('-')) || numero.length === 1) {
      setNumero('0');
    } else {
      setNumero(numero.substring(0, numero.length - 1));
    }
  };

  const btnDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };

  const btnMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };

  const btnRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };

  const btnSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2}`);
        setNumeroAnterior('0');
        break;
      case Operadores.restar:
        setNumero(`${num2 - num1}`);
        setNumeroAnterior('0');
        break;

      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        setNumeroAnterior('0');
        break;

      case Operadores.dividir:
        setNumero(`${num2 / num1}`);
        setNumeroAnterior('0');
        break;
    }
  };

  return {
    numero,
    numeroAnterior,
    limpiar,
    armarNumero,
    positivoNegativo,
    btnDel,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
  };
};
