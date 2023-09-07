const pokemonListInfo = document.getElementById('pokemonListInfo')
console.log(pokemonListInfo)

/* pokemons tela de informação */
function convertPokemonToInfo(pokemon){
    return `
    
    <nav class="second-page-nav">
                <div>
                    <i class="fi fi-rr-arrow-small-left"></i>
                </div>

                <div>
                    <i class="fi fi-rs-heart"></i>
                </div>
            </nav>

            <section class="second-page-section">

                <div>
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>
                <div class="detail">
                    <ol class="types">
                        <li class="">Grass</li>
                        <li class="">Poison</li>
                    </ol>

                    <img src="/assets/imgs/pokemon-logo.png" alt="poke">
                </div>

            </section>
            <section>
                <div class="info-pokemons">
                    <nav>
                        <p>About</p>
                        <p>Base Stats</p>
                        <p>Evolution</p>
                        <p>Moves</p>
                    </nav>
                    <ul>
                        <li>Species ---</li>
                        <li>Height ----</li>
                        <li>Weight -----</li>
                        <li>Abilities -----</li>
                    </ul>
                    <h3>Breedding</h3>
                    <ul>
                        <li>Gender</li>
                        <li>Egg Groups</li>
                        <li>Egg Cycle</li>
                    </ul>
                </div>
            </section>
    `
}

