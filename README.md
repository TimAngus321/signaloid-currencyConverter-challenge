# This app has been deployed on Vercel for a quick check

In the challenge description it said to deploy the app so I did it quickly with Vercel.
I'm not sure if this is what was intended but I've added how to run it locally below also.

[Click here to see the online version](https://signaloid-currency-converter-challenge-qkpc.vercel.app/)

## signaloid-currencyConverter-challenge

The web application should:

- Allow a user of the web application to specify the source currency (e.g., GBP). Again, we only ask you to support one source currency.
- Allow a user of the web application to specify the target currency (e.g., EUR). Again, we only ask you to support one target currency.
- Allow a user of the web application to specify the conversion rate as a distribution (e.g., a conversion rate uniformly distributed between 1.15 and 1.20).
- Use the Signaloid Cloud Compute Engine API (see ref. 1 below) to calculate the distribution of the converted target value.
- Show the distribution of the converted target value.

## Important to note

### I used

- Node version: v20.15.1
- Yarn version: 1.22.22
- Vue version: ^3.4.29

### To run localy

- Your Node.js version must be 18.3 or higher
- [Install newer version here if needed](https://nodejs.org/en/download/package-manager)

## Run the following commands in the terminal

```sh
git clone git@github.com:TimAngus321/signaloid-currencyConverter-challenge.git
```

```sh
yarn install && yarn format
```

- Add a .env file to the root folder of the project
- Add your signaloid api key using the following name exactly: VITE_SIGNALOID_API_KEY=<`your api key here`>

```sh
yarn dev
```

- You should then see something like: Local: <http://localhost:5173/>
- Open this in your browser of choice

## what I would do with more time

- Work out final request issue
- Split requests into each part as shown in quickstart but I may end up running them in one function
- Look into the small C program and check it's really doing what I want (I did my best but I'm not familiar with C)
- Clean up code (I've kept console.logs to show my working)
- Add cypress test
- Put data into chart
- deploy with Vercel or Netlify - decided to do this quickly

### The following was auto generated when creating the vue 3 app. Feel free to ignore

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
