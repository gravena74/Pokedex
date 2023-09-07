const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')


const maxRecords = 151
const limit = 10
let offset = 0;


/* Pokemons tela principal */
function convertPokemonToLi(pokemon) { 
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

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



/* faz ser clicavel e faz aparecer o pokemon certo na informação */
function initEvent(){
    const boxPokemon = document.querySelectorAll('.pokemon')
    const pokemonListInfo = document.getElementById('pokemonListInfo')
    console.log(pokemonListInfo)

    boxPokemon.forEach((pokemon) => {
        pokemon.addEventListener('click', ()=>{
            console.log('mdpamp')
            window.location.href = "infoPoke.html"
        })
    }) 

    pokeApi.getPokemons().then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToInfo).join('')
        pokemonListInfo.innerHTML += newHtml
        
    })

}


/* carrega os pokemons */
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        
        
        initEvent()
    })
}

loadPokemonItens(offset, limit)

/* botão para aparecer mais 10 pokemons */
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})



