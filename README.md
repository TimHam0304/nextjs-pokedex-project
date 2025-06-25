# Next.js Pokedex

This pokedex project is developed using next.js. The primary purpose of this project is for me to improve my next.js skills. Feel free to clone the repositiory and use it for your own learning.

## Resources

All data and images for this project are fetched from [pokeapi.co](https://pokeapi.co/)

The images used on the frontpage are wallpapers from the offical pokemon website.

All icons are from [heroicons.com](https://heroicons.com/)

## Overview

### Routes

1. "/" : home route
2. "/pokedex" : An infinite scroll view with search function
3. "/paginatedPokedex" : Same view but paginated. Also with search function
4. "/pokemon/${name}" : A card view containing the most important info of a pokemon
5. "/pokemon/${name}/images" : A small gallery of selected images for the pokemon
6. "/ability/${name}" : Info view about an ability with a list of pokemons using the ability
7. "/favorites" : Displays the items the user added to his favorites by pressing the heart icons (since this project has no user accounts its implemented using zustand)

### Folder structure

This project uses the next.js app router. Therefore route structure and route names are based on the folder structure and folder names.

folders:

- (pages): Route Group folder for all pages (list, paginatedPokedex, pokedex, pokemon) expect for the home page
- actions: all data fetching functions
- assets: svg assets
- components: react components sorted by the place they are used in
- constants: constants used across the project
- hooks: custom react hooks
- icons: react icon components. Svg Icons from: [heroicons.com](https://heroicons.com/)
- models: this folder contains type information for the used API routes. Naming is based on the official documentation: [pokeapi.co docs](https://pokeapi.co/docs/v2)

### Light & Dark theme

I created both a ligh and a dark theme which are applied based on the browsers settings. A manual toggel is currently not implemented.

## Contributions

This is a personal project for learning purposes which is why I do not accept contributions. Feel free to clone the repository and use it for your own learing purposes.

## How to run

install dependencies

```bash
npm i
```

run in development mode

```bash
npm run dev
```

run in production mode

```bash
npm run build
```

```bash
npm run start
```
