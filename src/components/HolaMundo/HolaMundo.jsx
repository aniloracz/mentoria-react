import { Header } from "../Header/Header";
import { Ficha } from "../Ficha/Ficha";
import {FichaPokemon} from "../FichaPokemon/FichaPokemon";
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
  const [coleccionPokemon, setcoleccionPokemon] = useState([]);
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
        for (let i = 1; i <= 10; i++) {
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
        setcoleccionPokemon(pokemons); // Se vuelve a settear la colección.
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
  return (
    <div id="main">
      <Header />
      
      <div className="flex-container main">
        <main className="flex">
          <button onClick={repartirCartasPokemon}>Repartir Cartas Pokemon</button>
          {coleccionPokemon.map((pokemon, id) => {
            return (<FichaPokemon pokemon={pokemon} key={id}/>)
          })}
        </main>
      </div>
      
      
    </div>
  );
}

export default HolaMundo;
