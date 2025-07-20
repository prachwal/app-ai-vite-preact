import { Button } from '../components/Button';

/**
 * Komponent przycisku z różnymi wariantami stylistycznymi i rozmiarami.
 * Wykorzystuje Tailwind CSS do stylizacji i obsługuje różne stany.
 */
export default {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Uniwersalny komponent przycisku z obsługą różnych wariantów, rozmiarów i stanów.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success'],
      description: 'Wariant stylistyczny przycisku',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Rozmiar przycisku',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Czy przycisk jest w stanie ładowania',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Czy przycisk ma pełną szerokość',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Czy przycisk jest wyłączony',
    },
  },
  args: {
    children: 'Przycisk',
  },
};

/**
 * Domyślny przycisk primary w rozmiarze medium
 */
export const Default = {};

/**
 * Przycisk w kolorze primary (niebieski)
 */
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

/**
 * Przycisk w kolorze secondary (szary)
 */
export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

/**
 * Przycisk w kolorze danger (czerwony)
 */
export const Danger = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

/**
 * Przycisk w kolorze success (zielony)
 */
export const Success = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
};

/**
 * Mały przycisk
 */
export const Small = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

/**
 * Średni przycisk (domyślny)
 */
export const Medium = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

/**
 * Duży przycisk
 */
export const Large = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

/**
 * Przycisk w stanie ładowania
 */
export const Loading = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

/**
 * Wyłączony przycisk
 */
export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

/**
 * Przycisk pełnej szerokości
 */
export const FullWidth = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * Wszystkie warianty przycisków w jednej historii
 */
export const AllVariants = {
  render: () => (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </div>
      <div className="space-x-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="space-x-2">
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
