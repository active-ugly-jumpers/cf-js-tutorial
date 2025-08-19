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

// Loop through the pokemonList and display name + height
for (let i = 0; i < pokemonList.length; i++) {
    let description = `${pokemonList[i].name} (height: ${pokemonList[i].height})`;
    // Check if Pokémon's height is above a certain threshold
    if (pokemonList[i].height > 6) {
        description += " - Wow, that’s big!";
    }
    document.write(`${description}<br>`);
}