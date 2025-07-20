import { Card } from '../components/Card';
import { Button } from '../components/Button';

/**
 * Komponent karty do wyświetlania treści z tytułem, opisem i akcjami.
 * Wykorzystuje Tailwind CSS do stylizacji i obsługuje różne warianty cieni.
 */
export default {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Uniwersalny komponent karty do wyświetlania treści z obsługą różnych stylów cieni i ramek.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Tytuł karty',
    },
    description: {
      control: { type: 'text' },
      description: 'Opis/zawartość karty',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Rozmiar cienia karty',
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Czy karta ma ramkę',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Czy karta jest w stanie ładowania',
    },
  },
  args: {
    title: 'Tytuł karty',
    description: 'To jest przykładowy opis karty, który pokazuje jak może wyglądać treść.',
  },
};

/**
 * Domyślna karta z tytułem i opisem
 */
export const Default = {};

/**
 * Karta z przyciskiem akcji
 */
export const WithButton = {
  args: {
    title: 'Karta z akcją',
    description: 'Ta karta zawiera przycisk do wykonania akcji.',
  },
  render: (args: any) => (
    <Card {...args}>
      <Button variant="primary">Wykonaj akcję</Button>
    </Card>
  ),
};

/**
 * Karta z wieloma przyciskami
 */
export const WithMultipleButtons = {
  args: {
    title: 'Karta z kilkoma opcjami',
    description: 'Ta karta oferuje kilka różnych akcji do wyboru.',
  },
  render: (args: any) => (
    <Card {...args}>
      <div className="space-x-2">
        <Button variant="primary" size="sm">Zatwierdź</Button>
        <Button variant="secondary" size="sm">Anuluj</Button>
        <Button variant="danger" size="sm">Usuń</Button>
      </div>
    </Card>
  ),
};

/**
 * Karta bez cienia
 */
export const NoShadow = {
  args: {
    shadow: 'none',
    bordered: true,
  },
};

/**
 * Karta z małym cieniem
 */
export const SmallShadow = {
  args: {
    shadow: 'sm',
  },
};

/**
 * Karta z dużym cieniem
 */
export const LargeShadow = {
  args: {
    shadow: 'lg',
  },
};

/**
 * Karta z bardzo dużym cieniem
 */
export const ExtraLargeShadow = {
  args: {
    shadow: 'xl',
  },
};

/**
 * Karta z ramką
 */
export const Bordered = {
  args: {
    bordered: true,
    shadow: 'none',
  },
};

/**
 * Karta w stanie ładowania
 */
export const Loading = {
  args: {
    loading: true,
  },
};

/**
 * Karta tylko z tytułem
 */
export const TitleOnly = {
  args: {
    title: 'Tylko tytuł',
    description: undefined,
  },
};

/**
 * Karta tylko z opisem
 */
export const DescriptionOnly = {
  args: {
    title: undefined,
    description: 'Tylko opis bez tytułu. Może być przydatne w niektórych przypadkach.',
  },
};

/**
 * Wszystkie warianty cieni w jednej historii
 */
export const AllShadows = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card title="Brak cienia" description="shadow='none'" shadow="none" bordered />
      <Card title="Mały cień" description="shadow='sm'" shadow="sm" />
      <Card title="Średni cień" description="shadow='md'" shadow="md" />
      <Card title="Duży cień" description="shadow='lg'" shadow="lg" />
      <Card title="Bardzo duży cień" description="shadow='xl'" shadow="xl" />
      <Card title="Z ramką" description="bordered=true" shadow="md" bordered />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
