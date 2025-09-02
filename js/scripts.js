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

    // Show details of a Pokémon in a modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            // Build the modal content
            modal.showModal(
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), // capitalize name
                `Height: ${pokemon.height} | Types: ${pokemon.types.join(', ')}`,
                pokemon.imageUrl
            );
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        addButtonListener: addButtonListener,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();


// Modal IIFE
let modal = (function () {
    let modalContainer = document.querySelector('#modal-container');

    function showModal(title, text, imageUrl) {
        modalContainer.innerHTML = ''; // clear previous content

        let modalElement = document.createElement('div');
        modalElement.classList.add('modal');

        // Close button
        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'X';
        closeButton.addEventListener('click', hideModal);

        // Title
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        // Content
        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        // Image
        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = title;

        modalElement.appendChild(closeButton);
        modalElement.appendChild(titleElement);
        modalElement.appendChild(imageElement);
        modalElement.appendChild(contentElement);

        modalContainer.appendChild(modalElement);
        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // Close modal on Escape key
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    // Close modal when clicking outside the modal content
    modalContainer.addEventListener('click', e => {
        if (e.target === modalContainer) {
            hideModal();
        }
    });

    return {
        showModal,
        hideModal
    };
})();

// Load Pokémon and display in the list
pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
});
