import { Header } from "../Header/Header";
import { Ficha } from "../Ficha/Ficha";
import { useState } from "react";

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
  
  const meAdoptaronActualizame = (idAnimalAdoptado) => {
    let nuevaListaAnimales = [...misAnimales];
    nuevaListaAnimales.find((animal) => animal.id === idAnimalAdoptado).adoptado = true;
    setMisAnimales([...nuevaListaAnimales]);
    alert(`Le cambiamos el estado adoptado al animal ${idAnimalAdoptado}`);
    console.log(misAnimales);
  }
  return (
    <div id="main">
      <Header />
      {misAnimales.map((animal, index) =>  <Ficha key={index} animal={animal} meAdoptaronActualizame={meAdoptaronActualizame}/>)}
    </div>
  );
}

export default HolaMundo;
