

const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')
const button_search = document.getElementById('button_search')
const input_search = document.getElementById('input_search')

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


/* Click pesquisa o pokemon digitado na barra de pesquisa, 
deletando todos os outros e deixando apenas o pokemon pesquisado */
button_search.addEventListener('click', async () => {
    pokemonList.innerHTML = '';
    const newHtml2 = convertPokemonToLi(await pokeApi.singlePokemon((input_search.value).toLowerCase()))
    pokemonList.innerHTML += newHtml2
})

input_search.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter'){
        pokemonList.innerHTML = '';
        const newHtml2 = convertPokemonToLi(await pokeApi.singlePokemon((input_search.value).toLowerCase()))
        pokemonList.innerHTML += newHtml2
    }
})
