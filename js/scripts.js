// Wrap pokemonList in an IIFE
let pokemonRepository = (function () {
    let pokemonList = [
        { name: "Bulbasaur", height: 7, types: ["grass", "poison"] },
        { name: "Charmander", height: 6, types: ["fire"] },
        { name: "Caterpie", height: 3, types: ["bug"] }
    ];

    // Add a Pokémon to the list
    function add(pokemon) {
        if (typeof pokemon === "object" && pokemon !== null) {
            let keys = Object.keys(pokemon);
            if (keys.includes("name") && keys.includes("height") && keys.includes("types")) {
                pokemonList.push(pokemon);
            } else {
                console.error("Invalid object keys. Must include name, height, and types.");
            }
        } else {
            console.error("Invalid input. Only objects can be added.");
        }
    }

    // Retrieve all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Find Pokémon by name
    function findByName(name) {
        return pokemonList.filter(pokemon => pokemon.name === name);
    }

    // Show details of a Pokémon
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    // Add event listener to a button
    function addButtonListener(button, pokemon) {
        button.addEventListener("click", function () {
            showDetails(pokemon);
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

    return {
        add: add,
        getAll: getAll,
        findByName: findByName,
        addListItem: addListItem,
        showDetails: showDetails,
        addButtonListener: addButtonListener
    };
})();

// Loop through all Pokémon and add them to the DOM
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
