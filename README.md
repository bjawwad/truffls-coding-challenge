# Coding Challenge: Message Templates

The goal of this coding challenge is to have a template manager which allows the user to see all existing message templates they have and gives them the possibility to create, edit and delete them.

This functionality is part of one of our applications we run for our users. While you're developing this application, think about it as a part of something bigger.

You will find the mockups, specifications and other resources you need to complete this project in [`resources/`](./resources).

## Goals

-   State management and data fetching are handled with Redux
-   Table component is usable as a React component
-   Template list page is implemented
-   Template edit page has implemented styles
-   Each part of the project has automated tests

Please refer to the [specifications](./resources/specifications.md) in case of doubts. If something is not clear enough, please take any decision in order to advance and document it.

_Note: The CSS doesn't have to be pixel perfect_

### State management and data fetching is handled with Redux

As we have to think about this project as a part of a bigger application which uses Redux, the whole state management and data fetching has to be handled through Redux actions and reducers. For handling the asynchronous parts of the logic, you can use libraries you may like.

Please, use the `templates` service for simulating a backend call. You can find the documentation of the endpoints in [services](src/services) folder.

### Table component is usable as a React component

We have provided you with the CSS of our table component. Please implement the required React component(s) to later use it in the task "Template list page is implemented". If you want to change the CSS structure, please do so.

### Template list page is implemented

The template list page needs some React component(s) and the page styles. Please checkout the mockups and implement the page according to these.

_Note: A toggle component can be found in [`src/components`](./src/components)._

### Template edit page has implemented styles

The template edit page needs the complete CSS. Please add the styles according to the mockups. If you want to change the component's structure, please do so.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
