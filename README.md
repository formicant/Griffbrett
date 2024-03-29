# Griffbrett

Shows chord charts for string instruments.

A web version of [Acordes](https://github.com/Zabolekar/acordes).

[**Try it!**](https://formicant.github.io/Griffbrett)


## Building and running

First, instal the dev-dependencies:
```sh
npm install
```

Build using Webpack:
```sh
npx webpack
```

Then, you can open `public/index.html` in your browser.

### Live reload in VSCode

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VSCode extension.

Run
```sh
npx webpack --watch
```
Then, execute `Live Server: Open with Live Server` VSCode command.

### Running tests

```sh
npm test
```
### Deploying to Github pages

```sh
npm run deploy
```
