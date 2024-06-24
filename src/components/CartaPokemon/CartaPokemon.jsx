
import '../CartaPokemon/CartaPokemon.css'
export function CartaPokemon ({pokemon, jugarCarta, jugador}){
    //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png
    return (
        <div className="card" id={`p${pokemon.id}`} onClick={() => {
            if(jugarCarta) { 
                jugarCarta(jugador,pokemon)
            }
        }}>
                <div className="card-image">
                    <img src={pokemon.sprites.other[`official-artwork`].front_default} alt={`Foto de ${pokemon.name}`} />
                </div>
                <div className="card-description">
                    <ul className="card-description_header">
                        <li>POKÉMON NAME: <span className="card_name">{pokemon.name}</span></li>
                        <li>TYPE ({pokemon.types[0].type.name})</li>
                    </ul>
                    <ul className="card-description_propety">
                        <li>
                            Height:
                            <span className="height">{pokemon.height}</span>
                        </li>
                        <li>
                            Weight:
                            <span className="category">{pokemon.weight}</span>
                        </li>
                        <li>
                            Abilities:
                            <span className="abilities">{pokemon.abilities[0].ability.name}</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
};
