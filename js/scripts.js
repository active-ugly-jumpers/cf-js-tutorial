// Wrap pokemonList in an IIFE
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: "Bulbasaur",
            height: 7,
            types: ["grass", "poison"]
        },
        {
            name: "Charmander",
            height: 6,
            types: ["fire"]
        },
        {
            name: "Caterpie",
            height: 3,
            types: ["bug"]
        }
    ];

    function add(pokemon) {
        if (typeof pokemon === "object" && pokemon !== null) {
            let keys = Object.keys(pokemon);
            if (
                keys.includes("name") &&
                keys.includes("height") &&
                keys.includes("types")
            ) {
                pokemonList.push(pokemon);
            } else {
                console.error("Invalid object keys. Must include name, height, and types.");
            }
        } else {
            console.error("Invalid input. Only objects can be added.");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function findByName(name) {
        return pokemonList.filter(pokemon => pokemon.name === name);
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector("ul.pokemon-list");

        let listItem = document.createElement("li");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

    return {
        add: add,
        getAll: getAll,
        findByName: findByName,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});