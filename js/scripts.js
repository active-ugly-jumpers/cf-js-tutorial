// Wrap pokemonList in an IIFE
let pokemonRepository = (function () {
    let pokemonList = [];

    // Add a Pokémon to the list
    function add(pokemon) {
        if (typeof pokemon === 'object' && pokemon !== null) {
            let keys = Object.keys(pokemon);
            if (keys.includes('name') && keys.includes('detailsUrl')) {
                pokemonList.push(pokemon);
            } else {
                console.error('Invalid object keys. Must include name and detailsUrl.');
            }
        } else {
            console.error('Invalid input. Only objects can be added.');
        }
    }

    // Retrieve all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Add a list item with a button for each Pokémon
    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector('div.pokemon-list');

        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'bg-transparent', 'border-0');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.type = 'button';
        button.classList.add('btn', 'btn-lg', 'btn-dark', 'btn-block', 'text-capitalize');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);

        // Show modal with details when clicked
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    // Load the list of Pokémon from the API
    function loadList() {
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
    }

    // Load details of a specific Pokémon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            }).then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types.map(typeInfo => typeInfo.type.name);
            }).catch(function (e) {
                console.error(e);
            });
    }

    // Use the Bootstrap modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            // fill modal content
            const titleEl = document.getElementById('pokemonModalLabel');
            const heightEl = document.getElementById('pokemonModalHeight');
            const typesEl = document.getElementById('pokemonModalTypes');
            const imgEl = document.getElementById('pokemonModalImg');

            // Capitalize name (Bootstrap text-capitalize handles visual, but set title nicely too)
            const niceName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            titleEl.textContent = niceName;
            heightEl.textContent = `Height: ${pokemon.height}`;
            typesEl.textContent = `Types: ${pokemon.types.join(', ')}`;
            imgEl.src = pokemon.imageUrl || '';
            imgEl.alt = niceName;

            $('#pokemonModal').modal('show');
        });
    }

    function search(query) {
        return pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        search: search,
    };
})();

// Load Pokémon and display in the list
pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#pokemon-search');
    const pokemonListElement = document.querySelector('.pokemon-list');

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();

        // Clear the list
        pokemonListElement.innerHTML = '';

        // Get filtered results from repository
        let results = pokemonRepository.search(query);

        // Render them
        results.forEach(pokemon => {
            pokemonRepository.addListItem(pokemon);
        });
    });
});

document.querySelector('#clear-search').addEventListener('click', () => {
    const searchInput = document.querySelector('#pokemon-search');
    searchInput.value = '';
    const pokemonListElement = document.querySelector('.pokemon-list');
    pokemonListElement.innerHTML = '';
    pokemonRepository.getAll().forEach(p => pokemonRepository.addListItem(p));
});

document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home-section');
    const aboutSection = document.getElementById('about-section');

    document.getElementById('nav-home').addEventListener('click', e => {
        e.preventDefault();
        homeSection.style.display = 'block';
        aboutSection.style.display = 'none';
        document.querySelectorAll('.nav-item').forEach(li => li.classList.remove('active'));
        e.target.parentElement.classList.add('active');
    });

    document.getElementById('nav-about').addEventListener('click', e => {
        e.preventDefault();
        homeSection.style.display = 'none';
        aboutSection.style.display = 'block';
        document.querySelectorAll('.nav-item').forEach(li => li.classList.remove('active'));
        e.target.parentElement.classList.add('active');
    });
});
