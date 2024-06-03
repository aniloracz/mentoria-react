import { Header } from "../Header/Header";
import { Ficha } from "../Ficha/Ficha";
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

  useEffect(() => {
    console.log("Entra al UseEffect");
    let coleccionPokemonAux = [];
    const llamarPokemon = () => {
      console.log("Va a llamar al pokémon 1");
      axios.get("https://pokeapi.co/api/v2/pokemon/1").then((res) => {
        console.log("Llegó el pokémon 1");
        coleccionPokemonAux.push(res.data);
      });
      //
      console.log("Va a llamar al pokémon 2");
      axios.get("https://pokeapi.co/api/v2/pokemon/2").then((res) => {
        console.log("Llegó el pokémon 2");
        coleccionPokemonAux.push(res.data);
      });

      console.log("Va a llamar al pokémon 3");
      axios.get("https://pokeapi.co/api/v2/pokemon/3").then((res) => {
        console.log("Llegó el pokémon 3");
        coleccionPokemonAux.push(res.data);
      });

      console.log("Va a llamar al pokémon 4");
      axios.get("https://pokeapi.co/api/v2/pokemon/4").then((res) => {
        console.log("Llegó el pokémon 4");
        coleccionPokemonAux.push(res.data);
      });

      console.log("Va a llamar al pokémon 5");
      axios.get("https://pokeapi.co/api/v2/pokemon/5").then((res) => {
        console.log("Llegó el pokémon 5");
        coleccionPokemonAux.push(res.data);
      });

      console.log("Va a llamar al pokémon 6");
      axios.get("https://pokeapi.co/api/v2/pokemon/6").then((res) => {
        console.log("Llegó el pokémon 6");
        coleccionPokemonAux.push(res.data);
      });

      console.log("Va a llamar al pokémon 7");
      axios.get("https://pokeapi.co/api/v2/pokemon/7").then((res) => {
        console.log("Llegó el pokémon 7");
        coleccionPokemonAux.push(res.data);
      });

      console.log("Va a llamar al pokémon 8");
      axios.get("https://pokeapi.co/api/v2/pokemon/8").then((res) => {
        console.log("Llegó el pokémon 8");
        coleccionPokemonAux.push(res.data);
      });

      console.log("Va a llamar al pokémon 9");
      axios.get("https://pokeapi.co/api/v2/pokemon/9").then((res) => {
        console.log("Llegó el pokémon 9");
        coleccionPokemonAux.push(res.data);
      });
      
      console.log("Va a llamar al pokémon 10");
      axios.get("https://pokeapi.co/api/v2/pokemon/10").then((res) => {
        console.log("Llegó el pokémon 10");
        coleccionPokemonAux.push(res.data);
      });

      console.log('Largo de ColeccionPokemonAux', coleccionPokemonAux.length)
    };
    llamarPokemon();
    
  }, []);

  const meAdoptaronActualizame = (idAnimalAdoptado) => {
    let nuevaListaAnimales = [...misAnimales];
    nuevaListaAnimales.find(
      (animal) => animal.id === idAnimalAdoptado
    ).adoptado = true;
    setMisAnimales([...nuevaListaAnimales]);
    alert(`Le cambiamos el estado adoptado al animal ${idAnimalAdoptado}`);
  };
  return (
    <div id="main">
      <Header />
      {misAnimales.map((animal, index) => (
        <Ficha
          key={index}
          animal={animal}
          meAdoptaronActualizame={meAdoptaronActualizame}
        />
      ))}
    </div>
  );
}

export default HolaMundo;
