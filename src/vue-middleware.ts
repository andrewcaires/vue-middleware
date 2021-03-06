import { isString, toArray } from '@andrewcaires/utils.js';
import VueRouter, { NavigationGuardNext, RawLocation, Route } from 'vue-router';

export interface VueMiddlewareOptions {
  router?: VueRouter;
  middleware?: string | Array<string>;
  middlewares?: VueMiddlewareList;
}

export type VueMiddlewareList = { [key: string]: VueMiddlewareNext }

export interface VueMiddlewareNavigation {
  to: Route;
  from: Route;
  next: () => void;
  redirect: (location: RawLocation) => void;
  router?: VueRouter;
}

export type VueMiddlewareNext = (navigation: VueMiddlewareNavigation) => void

const DefaultOptions: VueMiddlewareOptions = {

  middlewares: {},

};

let installed = false;

export class VueMiddleware {

  private options: VueMiddlewareOptions;

  constructor(options: VueMiddlewareOptions) {

    this.options = { ...DefaultOptions, ...options };
  }

  guard(to: Route, from: Route, next: NavigationGuardNext): void {

    const middlewares = this.middlewares(to.meta?.middleware);

    if (!middlewares.length) {

      return next();
    }

    const router = this.options?.router;
    const redirect = this.redirect.bind(this);

    return this.next({ to, from, next, router, redirect }, middlewares, 0)();
  }

  private get(middleware: any): VueMiddlewareNext | undefined {

    if (!isString(middleware)) {

      return undefined;
    }

    return this.options.middlewares ? this.options.middlewares[middleware] : undefined;
  }

  private middlewares(middleware: any): Array<string> {

    return [ ...toArray(this.options.middleware), ...toArray(middleware) ];
  }

  private next(navigation: VueMiddlewareNavigation, middlewares: Array<any>, index: number): () => void {

    const middleware = this.get(middlewares[index]);

    if (!middleware) {

      return navigation.next;
    }

    return () => {

      return middleware({ ...navigation, next: this.next(navigation, middlewares, index + 1) });
    };
  }

  private redirect(location: RawLocation): void {

    this.options.router?.push(location).catch((error) => { });
  }

  static install(vue: any, options: VueMiddlewareOptions = {}): void {

    if (installed) { return; } else { installed = true; }

    const router = options.router;

    if (!router) {

      throw new Error('[vue-middleware] router not defined');
    }

    const plugin = new VueMiddleware(options);

    router.beforeEach(plugin.guard.bind(plugin));
  }
}

export default VueMiddleware;
