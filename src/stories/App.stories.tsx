import { App } from '../app';

/**
 * Główny komponent aplikacji z licznikiem i przyciskami.
 * Wykorzystuje Tailwind CSS do stylizacji.
 */
export default {
  title: 'Example/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Komponent głównej aplikacji z licznikiem i przyciskami stylizowanymi w Tailwind CSS.',
      },
    },
  },
  tags: ['autodocs'],
};

/**
 * Domyślny stan aplikacji z licznikiem ustawionym na 0.
 */
export const Default = {};

/**
 * Historia pokazująca jak aplikacja wygląda na urządzeniach mobilnych.
 */
export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Historia pokazująca jak aplikacja wygląda na tabletach.
 */
export const Tablet = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
