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

    // Add a list item with a button for each Pokémon
    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector("div.pokemon-list");

        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "p-2"); // Bootstrap list group item

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.type = "button";
        button.classList.add("btn", "btn-primary", "btn-block", "text-capitalize");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemonModal");

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
            const titleEl = document.getElementById("pokemonModalLabel");
            const textEl = document.getElementById("pokemonModalText");
            const imgEl = document.getElementById("pokemonModalImg");

            // Capitalize name (Bootstrap text-capitalize handles visual, but set title nicely too)
            const niceName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            titleEl.textContent = niceName;
            textEl.textContent = `Height: ${pokemon.height} | Types: ${pokemon.types.join(", ")}`;
            imgEl.src = pokemon.imageUrl || "";
            imgEl.alt = niceName;

            $("#pokemonModal").modal("show");
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

// Load Pokémon and display in the list
pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
});
