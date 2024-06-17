import { Header } from "../Header/Header";
import { Ficha } from "../Ficha/Ficha";
import {CartaPokemon} from "../CartaPokemon/CartaPokemon";
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
          
          let idPokemonAleatorio = Math.round(Math.random() * (1015 - 1) + 1)
          console.log("Va a llamar al pokémon", idPokemonAleatorio);
          let pokemonAux = axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemonAleatorio}`);
          console.log(pokemonAux);
          pokemonesRecibidos.push(pokemonAux); // Se agrega la peticion
          console.log("Llamó al pokémon", idPokemonAleatorio)
        }
        const results = await Promise.all(pokemonesRecibidos); // Se llama la peticion
        const pokemons = results.map(res => res.data); // Se retornan los resultados dentro de un array
        console.log("Todos los pokémones llegaron");
        if (cartasJugadorUno.length > 0) {
          setCartasJugadorDos(pokemons);
        } else {
          setcartasJugadorUno(pokemons); // Se vuelve a settear la colección.
        }
        
      } catch (error) {
        console.error("Error al buscar el pokemon", error);
      }
}
traerPokemones();
  }

  const meAdoptaronActualizame = (idAnimalAdoptado) => {
    let nuevaListaAnimales = [...misAnimales];
    nuevaListaAnimales.find(
      (animal) => animal.id === idAnimalAdoptado
    ).adoptado = true;
    setMisAnimales([...nuevaListaAnimales]);
    alert(`Le cambiamos el estado adoptado al animal ${idAnimalAdoptado}`);
  };
  /* 

  {misAnimales.map((animal, index) => (
        <Ficha
          key={index}
          animal={animal}
          meAdoptaronActualizame={meAdoptaronActualizame}
        />
      ))}
  
  
  */
  const enfrentarCartas = () => {
    const cartaGanadora = (cartasTablero[0].weight>cartasTablero[1].weight)? cartasTablero[0]: cartasTablero[1]; ;
    console.log("Carta Ganadora", cartaGanadora);
  }
  const jugarCarta = (unaCartaPokemon) => {
    console.log("Jugo Carta" + unaCartaPokemon.id);
    if(!cartasTablero.includes(unaCartaPokemon) && cartasTablero.length < 3){
      // Sacar carta de lista de jugador y agregarla a la lista cartas tablero
      const cartasTableroAux = [...cartasTablero];
      cartasTableroAux.push(unaCartaPokemon);
      setCartasTablero([...cartasTableroAux]);
      if(cartasTablero.length===2){
        enfrentarCartas();
      }
    }else{
      console.log("Carta ya jugada");
    }
  }
  return (
    <div id="main">
      
      <div className="flex-container main">
        <main className="flex">
          <button onClick={repartirCartasPokemon}>Repartir Cartas Pokemon</button>

          <div style={{border: "1px solid red", width: "100%", display: "flex", gap: "1rem"}}>
            <h3>Cartas Jugador 2</h3>
            {cartasJugadorDos.map((pokemon, id) => {
              return (<CartaPokemon pokemon={pokemon} key={`j2${id}`} jugarCarta={jugarCarta}/>)
            })}
          </div>

          <div style={{height: "300px",border: "1px solid black", width: "100%", display: "flex",flexDirection: "row"}}>
            <h3>Tablero de juego</h3>
            {cartasTablero.map((pokemon, id) => {
              return (<CartaPokemon pokemon={pokemon} key={`t${id}`} />)
            })}
          </div>

          <div style={{border: "1px solid grey", width: "100%", display: "flex", gap: "1rem"}}>
            <h3>Cartas Jugador 1</h3>
            {cartasJugadorUno.map((pokemon, id) => {
              return (<CartaPokemon pokemon={pokemon} key={`j1${id}`} jugarCarta={jugarCarta}/>)
            })}
          </div>
          
        </main>
      </div>
      
      
    </div>
  );
}

export default HolaMundo;
