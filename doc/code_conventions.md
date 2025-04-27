## Redux

Redux boilerplate handled by using [https://redux-starter-kit.js.org/](https://redux-starter-kit.js.org/)

## Linting & Prettier

This project uses ESLint & prettier. The project has the necessary dependencies, but you can also configure your editor to leverage the eslint config & to use prettier formatting on save

Try to avoid using default exports. While default exports can be useful, across a project it can be tricky to know what exports as default and what does not. Use named exports instead to keep this simple.

## Styling

We're using [Styled Components](https://www.styled-components.com/) to do component styling. Since React Native styling is not cascading, it means that to apply `font-family: Helvetica` for example, every text node that needs to have that font, needs to declare that style. It does not get inherited from the parent. To get around the duplication, one can use https://www.styled-components.com/docs/basics#extending-styles to create a component with a base style, then extend it as needed for different sizes & colours.
