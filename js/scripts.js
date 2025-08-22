// Wrap pokemonList in an IIFE
let pokemonRepository = function () {
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
        // Validate that input is an object
        if (typeof pokemon === "object" && pokemon !== null) {
            // Check required keys
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

    return {
        add: add,
        getAll: getAll,
        findByName: findByName
    };
}();

// Use forEach to loop through the pokemonList
pokemonRepository.getAll().forEach(function (pokemon) {
    let description = `${pokemon.name} (height: ${pokemon.height})`;

    // Check if Pokémon's height is above a certain threshold
    if (pokemon.height > 6) {
        description += " - <span class='big'>Wow, that’s big!</span>";
    }

    document.write(`<p class="pokemon">${description}</p>`);
});