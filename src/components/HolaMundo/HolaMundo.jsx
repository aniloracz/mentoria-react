import { Header } from "../Header/Header";
import { Ficha } from "../Ficha/Ficha";
import { CartaPokemon } from "../CartaPokemon/CartaPokemon";
import { useEffect, useState } from "react";
import axios from "axios";
function HolaMundo() {
  const [misAnimales, setMisAnimales] = useState([
    {
      id: 1,
      tipo: "Gato",
      nombre: "Miguel",
      virtudes: ["Simpático", "Amigable"],
      adoptado: false,
      imagen:
        "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg",
    },
    {
      id: 2,
      tipo: "Gato",
      nombre: "Pepe",
      virtudes: ["Simpático", "Amigable"],
      adoptado: false,
      imagen:
        "https://nupec.com/wp-content/uploads/2021/02/Captura-de-pantalla-2021-02-08-a-las-13.59.48.png",
    },
    {
      id: 3,
      tipo: "Perro",
      nombre: "Patán",
      virtudes: ["Simpático", "Amigable"],
      adoptado: false,
      imagen: "https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg",
    },
  ]);
  const [cartasJugadorUno, setcartasJugadorUno] = useState([]);
  const [cartasJugadorDos, setCartasJugadorDos] = useState([]);
  const [cartasTablero, setCartasTablero] = useState([]);
  const [turno, setTurno] = useState("Jugador1");
  const [puntosJugadorUno, setPuntosJugadorUno] = useState(0);
  const [puntosJugadorDos, setPuntosJugadorDos] = useState(0);
  // TODO: DONE, FUNCIONANDO
  // Arreglado por LUIS.
  // Me di el derecho de arreglar la chamburreada.
  // El for es unicamente para no hacer una llamada a la api manualmente 10 veces.
  // Se arregló haciendo la funcion asyncrona, asi espera a que la respuesta llegue y luego la carga
  // Antes solo cargaba la ultima, porque mientras se enviaba un setter, llegaba otro

  const repartirCartasPokemon = () => {
    const traerPokemones = async () => {
      try {
        const pokemonesRecibidos = []; // Se crea un arreglo donde almacenar las peticiones
        for (let i = 1; i <= 3; i++) {
          let idPokemonAleatorio = Math.round(Math.random() * (1015 - 1) + 1);
          console.log("Va a llamar al pokémon", idPokemonAleatorio);
          let pokemonAux = axios.get(
            `https://pokeapi.co/api/v2/pokemon/${idPokemonAleatorio}`
          );
          console.log(pokemonAux);
          pokemonesRecibidos.push(pokemonAux); // Se agrega la peticion
          console.log("Llamó al pokémon", idPokemonAleatorio);
        }
        const results = await Promise.all(pokemonesRecibidos); // Se llama la peticion
        const pokemons = results.map((res) => res.data); // Se retornan los resultados dentro de un array
        console.log("Todos los pokémones llegaron");
        if (cartasJugadorUno.length > 0) {
          setCartasJugadorDos(pokemons);
        } else {
          setcartasJugadorUno(pokemons); // Se vuelve a settear la colección.
        }
      } catch (error) {
        console.error("Error al buscar el pokemon", error);
      }
    };
    traerPokemones();
  };

  useEffect(() => {
    if (turno === "EnfrentarCartas") {
      enfrentarCartas();
      setTurno("Jugador1");
    }
  }, [turno])

  const enfrentarCartas = async () => {
    console.log("Entra en la funcion de enfrentar")
    let puntosAux1 = puntosJugadorUno;
    let puntosAux2 = puntosJugadorDos;
    if (cartasTablero[0].weight > cartasTablero[1].weight) {
      alert("Gana la mano el jugador 1 con su pokémon " + cartasTablero[0].name);
      console.log(cartasTablero[0]);
      setPuntosJugadorUno(puntosJugadorUno + 10);
      puntosAux1+= 10;
    } else {
      alert("Gana la mano el jugador 2 con su pokémon " + cartasTablero[1].name);
      setPuntosJugadorDos(puntosJugadorDos + 10);
      puntosAux2+= 10
    }

    if (cartasJugadorUno.length === 0)   {
      if(puntosAux1 > puntosAux2) {
        alert("Gana el jugador 1 con un total de "+ puntosAux1);
        setPuntosJugadorUno(0);
      } else {
        alert("Gana el jugador 2 con un total de "+ puntosAux2);
        setPuntosJugadorDos(0);
      }
    }
    setCartasTablero([]);
  };

  const jugarCarta = (unJugador, unaCartaPokemon) => {
    if (turno === unJugador) {
      console.log(unJugador +" jugó la carta " + unaCartaPokemon.id);
      if (
        !cartasTablero.includes(unaCartaPokemon) &&
        cartasTablero.length < 2 // length 2
      ) {
        // Sacar carta de lista de jugador y agregarla a la lista cartas tablero
        const cartasTableroAux = [...cartasTablero];
        cartasTableroAux.push(unaCartaPokemon);
        setCartasTablero([...cartasTableroAux]);
        if (turno === "Jugador1") {
          let cartasJugadorUnoAux = [...cartasJugadorUno]; 
          let index = cartasJugadorUnoAux.findIndex((pokemon) => pokemon.id === unaCartaPokemon.id);
          cartasJugadorUnoAux.splice(index, 1);
          setcartasJugadorUno([...cartasJugadorUnoAux]);
        } else if (turno === "Jugador2") {
          let cartasJugadorDosAux = [...cartasJugadorDos]; 
          let index = cartasJugadorDosAux.findIndex((pokemon) => pokemon.id === unaCartaPokemon.id);
          cartasJugadorDosAux.splice(index, 1);
          setCartasJugadorDos([...cartasJugadorDosAux]);
        }
        if (cartasTableroAux.length === 2) { 
          setTurno("EnfrentarCartas")
        } else {
          if(turno === "Jugador1") setTurno("Jugador2");
        }
      } else {
        console.log("Carta ya jugada");
      }
    } else {
      alert("No es tu turno.");
    }
  };
  return (
    <div id="main">
      <div className="flex-container main">
        <main className="flex">
          <button onClick={repartirCartasPokemon}>
            Repartir Cartas Pokemon
          </button>

          <div
            style={{
              border: "1px solid red",
              width: "100%",
              display: "flex",
              gap: "1rem",
            }}
          >
            <h3>Cartas Jugador 2</h3>
            {cartasJugadorDos.map((pokemon, id) => {
              return (
                <CartaPokemon
                  pokemon={pokemon}
                  key={`j2${id}`}
                  jugarCarta={jugarCarta}
                  jugador={`Jugador2`}
                />
              );
            })}
          </div>

          <div
            style={{
              height: "300px",
              border: "1px solid black",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h3>Tablero de juego</h3>
            {cartasTablero.map((pokemon, id) => {
              return <CartaPokemon pokemon={pokemon} key={`t${id}`} />;
            })}
          </div>

          <div
            style={{
              border: "1px solid grey",
              width: "100%",
              display: "flex",
              gap: "1rem",
            }}
          >
            <h3>Cartas Jugador 1</h3>
            {cartasJugadorUno.map((pokemon, id) => {
              return (
                <CartaPokemon
                  pokemon={pokemon}
                  key={`j1${id}`}
                  jugarCarta={jugarCarta}
                  jugador={`Jugador1`}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default HolaMundo;
