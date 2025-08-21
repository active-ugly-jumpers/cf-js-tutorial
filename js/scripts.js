let pokemonList = [];
pokemonList = [
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

// Use forEach to loop through the pokemonList
pokemonList.forEach(function(pokemon) {
    let description = `${pokemon.name} (height: ${pokemon.height})`;

    // Check if Pokémon's height is above a certain threshold
    if (pokemon.height > 6) {
        description += " - <span class='big'>Wow, that’s big!</span>";
    }

    document.write(`<p class="pokemon">${description}</p>`);
});