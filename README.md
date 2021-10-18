[![npm](https://img.shields.io/npm/v/@andrewcaires/vue-middleware?color=blue&logo=npm)](https://www.npmjs.com/package/@andrewcaires/vue-middleware)
[![downloads](https://img.shields.io/npm/dt/@andrewcaires/vue-middleware?color=blue)](https://www.npmjs.com/package/@andrewcaires/vue-middleware)
[![size](https://img.shields.io/github/repo-size/andrewcaires/vue-middleware?color=blue)](https://github.com/andrewcaires/vue-middleware)
[![language](https://img.shields.io/github/languages/top/andrewcaires/vue-middleware?color=blue)](https://github.com/andrewcaires/vue-middleware)
[![commit](https://img.shields.io/github/last-commit/andrewcaires/vue-middleware?color=blue&logo=github)](https://github.com/andrewcaires/vue-middleware)
[![license](https://img.shields.io/github/license/andrewcaires/vue-middleware?color=blue)](https://github.com/andrewcaires/vue-middleware/blob/main/LICENSE)

# vue-middleware

VueJS plugin for middleware

## Installation

`npm i @andrewcaires/vue-middleware`

## Usage

```js
import VueMiddleware from '@andrewcaires/vue-middleware';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: 'log', // OR [ 'log' ]
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

Vue.use(VueMiddleware, {
  router,
  middlewares: {
    log: ({ to, next }) => {

      console.log(to.name);

      next();
    },
  },
});
```

### Links

*  [Docs](https://github.com/andrewcaires/vue-middleware#readme)
*  [GitHub](https://github.com/andrewcaires/vue-middleware)
*  [npm](https://www.npmjs.com/package/@andrewcaires/vue-middleware)

## License

*  [MIT](https://github.com/andrewcaires/vue-middleware/blob/main/LICENSE)
