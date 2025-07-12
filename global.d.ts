// global.d.t

// Расширение для импортов файлов
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

// Для Redux
declare type RootState = import('./app/store').RootState;
declare type AppDispatch = import('./app/store').AppDispatch;

// Глобальные переменные (если используются в webpack)
declare const __IS_DEV__: boolean;
declare const __API_URL__: string;
declare const __PROJECT__: 'frontend' | 'storybook' | 'jest';

// Расширение Window (если нужно добавить кастомные свойства)
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

// Для CSS-переменных
declare module 'csstype' {
  interface Properties {
    '--theme-color'?: string;
    '--bg-color'?: string;
    // Добавьте другие кастомные CSS-переменные при необходимости
  }
}
