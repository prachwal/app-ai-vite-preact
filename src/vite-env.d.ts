/// <reference types="vite/client" />

// Dodaj typy dla class attribute jeśli używasz JSX
declare namespace JSX {
  interface HTMLAttributes<T> {
    class?: string;
  }
}