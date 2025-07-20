import { render, screen } from '@testing-library/preact';
import { expect, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { App } from '../app';

describe('App', () => {
  describe('rendering', () => {
    it('renders the main heading', () => {
      render(<App />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Preact + Tailwind CSS');
    });

    it('renders the initial count', () => {
      render(<App />);
      
      expect(screen.getByText('Count:')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders increment and reset buttons', () => {
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      const resetButton = screen.getByRole('button', { name: 'Reset' });
      
      expect(incrementButton).toBeInTheDocument();
      expect(resetButton).toBeInTheDocument();
    });

    it('has proper styling classes', () => {
      render(<App />);
      
      // Find the outermost container div
      const container = screen.getByText('Preact + Tailwind CSS').closest('div')?.parentElement;
      expect(container).toHaveClass('min-h-screen', 'bg-gray-100', 'flex', 'items-center', 'justify-center');
      
      const card = screen.getByText('Preact + Tailwind CSS').closest('div');
      expect(card).toHaveClass('bg-white', 'p-8', 'rounded-lg', 'shadow-lg', 'text-center');
    });
  });

  describe('counter functionality', () => {
    it('increments count when increment button is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      const countElement = screen.getByText('0');
      
      expect(countElement).toBeInTheDocument();
      
      await user.click(incrementButton);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.queryByText('0')).not.toBeInTheDocument();
      
      await user.click(incrementButton);
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    it('resets count to 0 when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      const resetButton = screen.getByRole('button', { name: 'Reset' });
      
      // Increment a few times
      await user.click(incrementButton);
      await user.click(incrementButton);
      await user.click(incrementButton);
      expect(screen.getByText('3')).toBeInTheDocument();
      
      // Reset
      await user.click(resetButton);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.queryByText('3')).not.toBeInTheDocument();
    });

    it('can increment multiple times', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      
      for (let i = 1; i <= 5; i++) {
        await user.click(incrementButton);
        expect(screen.getByText(i.toString())).toBeInTheDocument();
      }
    });

    it('reset works from any count value', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      const resetButton = screen.getByRole('button', { name: 'Reset' });
      
      // Test reset from different values
      await user.click(incrementButton);
      expect(screen.getByText('1')).toBeInTheDocument();
      
      await user.click(resetButton);
      expect(screen.getByText('0')).toBeInTheDocument();
      
      // Increment more and reset again
      for (let i = 0; i < 10; i++) {
        await user.click(incrementButton);
      }
      expect(screen.getByText('10')).toBeInTheDocument();
      
      await user.click(resetButton);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has proper heading structure', () => {
      render(<App />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('has accessible buttons', () => {
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      const resetButton = screen.getByRole('button', { name: 'Reset' });
      
      expect(incrementButton).toBeEnabled();
      expect(resetButton).toBeEnabled();
    });

    it('maintains focus after interactions', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      
      await user.click(incrementButton);
      // Button should still be focusable after click
      incrementButton.focus();
      expect(incrementButton).toHaveFocus();
    });
  });

  describe('edge cases', () => {
    it('handles rapid clicking', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      
      // Rapid clicks
      await user.click(incrementButton);
      await user.click(incrementButton);
      await user.click(incrementButton);
      await user.click(incrementButton);
      await user.click(incrementButton);
      
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('handles alternating increment and reset', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      const resetButton = screen.getByRole('button', { name: 'Reset' });
      
      await user.click(incrementButton);
      expect(screen.getByText('1')).toBeInTheDocument();
      
      await user.click(resetButton);
      expect(screen.getByText('0')).toBeInTheDocument();
      
      await user.click(incrementButton);
      expect(screen.getByText('1')).toBeInTheDocument();
      
      await user.click(resetButton);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('count display updates correctly', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      
      // Check that count span has correct classes
      const countSpan = screen.getByText('0');
      expect(countSpan).toHaveClass('font-semibold', 'text-blue-600');
      
      await user.click(incrementButton);
      const newCountSpan = screen.getByText('1');
      expect(newCountSpan).toHaveClass('font-semibold', 'text-blue-600');
    });
  });
});
