// Wrap pokemonList in an IIFE
let pokemonRepository = (function () {
    let pokemonList = [];

    // Add a Pokémon to the list
    function add(pokemon) {
        if (typeof pokemon === "object" && pokemon !== null) {
            let keys = Object.keys(pokemon);
            if (keys.includes("name") && keys.includes("detailsUrl")) {
                pokemonList.push(pokemon);
            } else {
                console.error("Invalid object keys. Must include name and detailsUrl.");
            }
        } else {
            console.error("Invalid input. Only objects can be added.");
        }
    }

    // Retrieve all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Show details of a Pokémon
    function showDetails(pokemon) {
        // Load details from the API, then log them
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    // Add event listener to a button
    function addButtonListener(button, pokemon) {
        button.addEventListener("click", function () {
            // Load details from API and then show them
            loadDetails(pokemon).then(function () {
                showDetails(pokemon);
            });
        });
    }

    // Add a list item with a button for each Pokémon
    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector("ul.pokemon-list");

        let listItem = document.createElement("li");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);

        // Add the click event using the separate function
        addButtonListener(button, pokemon);
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
                item.types = details.types;
            }).catch(function (e) {
                console.error(e);
            });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        addButtonListener: addButtonListener,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// Load the Pokémon list from the server
pokemonRepository.loadList().then(function () {
    // Get all Pokémon from the repository
    let allPokemons = pokemonRepository.getAll();

    // For each Pokémon, add it to the DOM
    allPokemons.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
