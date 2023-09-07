

const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')
const button_search = document.getElementById('button_search')
const input_search = document.getElementById('input_search')

const maxRecords = 151
const limit = 10
let offset = 0;


/* Pokemons tela principal */
function convertPokemonToLi(pokemon) { 
    console.log('passou 2')
    console.log(pokemon)
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}



/* faz ser clicavel e faz aparecer o pokemon certo na informação */
function initEvent(){
    const boxPokemon = document.querySelectorAll('.pokemon')
    const nome  = document.querySelectorAll('span.name')

    boxPokemon.forEach((pokemon) => {
        pokemon.addEventListener('click', ()=>{
            /* window.location.href = "infoPoke.html" */
            console.log(nome)
        })
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

button_search.addEventListener('click', async () => {
    console.log('passou aqui 6');
    
    const newHtml2 = convertPokemonToLi(await pokeApi.singlePokemon(input_search.value))
    pokemonList.innerHTML += newHtml2
})

