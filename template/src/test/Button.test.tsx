import { render, screen } from '@testing-library/preact';
import { expect, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Button, type ButtonProps } from '../components/Button';

describe('Button', () => {
  const defaultProps: ButtonProps = {
    children: 'Test Button',
  };

  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Button {...defaultProps} />);
      
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-blue-500', 'px-4', 'py-2');
    });

    it('renders with custom className', () => {
      render(<Button {...defaultProps} className="custom-class" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
      render(<Button>Custom Content</Button>);
      
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders primary variant correctly', () => {
      render(<Button variant="primary">Primary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-500', 'hover:bg-blue-600');
    });

    it('renders secondary variant correctly', () => {
      render(<Button variant="secondary">Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-500', 'hover:bg-gray-600');
    });

    it('renders danger variant correctly', () => {
      render(<Button variant="danger">Danger</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-500', 'hover:bg-red-600');
    });

    it('renders success variant correctly', () => {
      render(<Button variant="success">Success</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-green-500', 'hover:bg-green-600');
    });
  });

  describe('sizes', () => {
    it('renders small size correctly', () => {
      render(<Button size="sm">Small</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('renders medium size correctly', () => {
      render(<Button size="md">Medium</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('renders large size correctly', () => {
      render(<Button size="lg">Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  describe('states', () => {
    it('renders loading state correctly', () => {
      render(<Button loading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByText('Ładowanie...')).toBeInTheDocument();
      
      // Sprawdź czy spinner jest obecny
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('renders disabled state correctly', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });

    it('renders full width correctly', () => {
      render(<Button fullWidth>Full Width</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('disables button when loading', () => {
      render(<Button loading>Loading</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Clickable</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button loading onClick={handleClick}>Loading</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard events correctly', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Keyboard</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has proper focus styles', () => {
      render(<Button>Focusable</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2');
    });

    it('has proper ARIA attributes when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });

    it('maintains accessibility when loading', () => {
      render(<Button loading>Loading</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
      expect(screen.getByText('Ładowanie...')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles undefined children gracefully', () => {
      render(<Button>{undefined}</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('');
    });

    it('handles empty string children', () => {
      render(<Button>{''}</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('');
    });

    it('combines all props correctly', () => {
      const handleClick = vi.fn();
      
      render(
        <Button 
          variant="danger" 
          size="lg" 
          fullWidth 
          className="extra-class"
          onClick={handleClick}
          data-testid="complex-button"
        >
          Complex Button
        </Button>
      );
      
      const button = screen.getByTestId('complex-button');
      expect(button).toHaveClass(
        'bg-red-500',
        'px-6', 
        'py-3', 
        'text-lg',
        'w-full',
        'extra-class'
      );
    });

    it('prioritizes disabled over loading', () => {
      render(<Button disabled loading>Both States</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      // Loading content should still show since loading=true
      expect(screen.getByText('Ładowanie...')).toBeInTheDocument();
    });
  });
});
