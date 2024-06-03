import "./Ficha.css"

export function Ficha({animal, meAdoptaronActualizame}){   

  

  const adoptar = (animalClickeadoID) => {
    alert("Adoptaste al animal " + animalClickeadoID);
    meAdoptaronActualizame(animalClickeadoID);

    //let animalClickeado =  document.querySelector(`#adoptar${animal.id}`);
    //animalClickeado.innerHTML = "Adoptado :)";
  }

  return (
    <div className="ficha" id={`animal${animal.id}`}>
        <div id={`imagen${animal.id}`} style={{backgroundImage: `url(${animal.imagen})`}} className="imagenMascota">
            <div className="nombreMascota">{animal.nombre}</div>
        </div>
        <ul className="virtudes">
          {animal.virtudes.map((virtud,index) =>{
            return(
              <li  key = {index}>
              {virtud}
              </li>
            )
          })}
        </ul>
        {(animal.adoptado === false) 
          ? <button className="botonAdoptar" id={`adoptar${animal.id}`} onClick={() => adoptar(animal.id)}>Adoptar</button>
          : <button className="botonAdoptar" id={`adoptar${animal.id}`} >Adoptado</button>
        }
    </div>
  );
}