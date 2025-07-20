import { render, screen } from '@testing-library/preact';
import { expect, describe, it } from 'vitest';
import { Card, type CardProps } from '../components/Card';

describe('Card', () => {
  const defaultProps: CardProps = {
    title: 'Test Card',
    description: 'Test description',
  };

  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Card {...defaultProps} />);
      
      const card = screen.getByText('Test Card').closest('div');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('bg-white', 'rounded-lg', 'p-6', 'shadow-md');
    });

    it('renders with custom className', () => {
      render(<Card {...defaultProps} className="custom-class" />);
      
      const card = screen.getByText('Test Card').closest('div');
      expect(card).toHaveClass('custom-class');
    });

    it('renders title correctly', () => {
      render(<Card title="Custom Title" />);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Custom Title');
      expect(title).toHaveClass('text-lg', 'font-semibold', 'text-gray-800', 'mb-2');
    });

    it('renders description correctly', () => {
      render(<Card description="Custom description" />);
      
      const description = screen.getByText('Custom description');
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');
      expect(description).toHaveClass('text-gray-600', 'mb-4');
    });

    it('renders children correctly', () => {
      render(
        <Card>
          <div>Custom content</div>
        </Card>
      );
      
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    it('renders without title and description', () => {
      render(<Card data-testid="empty-card" />);
      
      const card = screen.getByTestId('empty-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('bg-white', 'rounded-lg', 'p-6');
      
      // Nie powinno być tytułu ani opisu
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.queryByText(/Custom/)).not.toBeInTheDocument();
    });

    it('renders with all props together', () => {
      render(
        <Card 
          title="Complete Card" 
          description="Complete description"
          data-testid="complete-card"
        >
          <button>Action</button>
        </Card>
      );
      
      const card = screen.getByTestId('complete-card');
      expect(card).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Complete Card');
      expect(screen.getByText('Complete description')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Action');
    });
  });

  describe('shadow variants', () => {
    it('renders with no shadow', () => {
      render(<Card shadow="none" data-testid="no-shadow" />);
      
      const card = screen.getByTestId('no-shadow');
      expect(card).not.toHaveClass('shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl');
    });

    it('renders with small shadow', () => {
      render(<Card shadow="sm" data-testid="small-shadow" />);
      
      const card = screen.getByTestId('small-shadow');
      expect(card).toHaveClass('shadow-sm');
    });

    it('renders with medium shadow (default)', () => {
      render(<Card data-testid="medium-shadow" />);
      
      const card = screen.getByTestId('medium-shadow');
      expect(card).toHaveClass('shadow-md');
    });

    it('renders with large shadow', () => {
      render(<Card shadow="lg" data-testid="large-shadow" />);
      
      const card = screen.getByTestId('large-shadow');
      expect(card).toHaveClass('shadow-lg');
    });

    it('renders with extra large shadow', () => {
      render(<Card shadow="xl" data-testid="xl-shadow" />);
      
      const card = screen.getByTestId('xl-shadow');
      expect(card).toHaveClass('shadow-xl');
    });
  });

  describe('bordered variant', () => {
    it('renders without border by default', () => {
      render(<Card data-testid="no-border" />);
      
      const card = screen.getByTestId('no-border');
      expect(card).not.toHaveClass('border', 'border-gray-200');
    });

    it('renders with border when bordered=true', () => {
      render(<Card bordered data-testid="with-border" />);
      
      const card = screen.getByTestId('with-border');
      expect(card).toHaveClass('border', 'border-gray-200');
    });

    it('renders with border and no shadow', () => {
      render(<Card bordered shadow="none" data-testid="border-no-shadow" />);
      
      const card = screen.getByTestId('border-no-shadow');
      expect(card).toHaveClass('border', 'border-gray-200');
      expect(card).not.toHaveClass('shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl');
    });
  });

  describe('loading state', () => {
    it('renders loading skeleton when loading=true', () => {
      render(<Card loading data-testid="loading-card" />);
      
      const card = screen.getByTestId('loading-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('bg-white', 'rounded-lg', 'p-6');
      
      // Sprawdź czy skeleton jest obecny
      const skeleton = card.querySelector('.animate-pulse');
      expect(skeleton).toBeInTheDocument();
      
      // Sprawdź strukturę skeletonu
      const titleSkeleton = card.querySelector('.h-4.bg-gray-200.rounded.w-3\\/4.mb-4');
      expect(titleSkeleton).toBeInTheDocument();
      
      const contentSkeletons = card.querySelectorAll('.h-3.bg-gray-200.rounded');
      expect(contentSkeletons).toHaveLength(2);
    });

    it('does not render title, description, or children when loading', () => {
      render(
        <Card 
          loading 
          title="Should not show" 
          description="Should not show"
          data-testid="loading-with-content"
        >
          <button>Should not show</button>
        </Card>
      );
      
      const card = screen.getByTestId('loading-with-content');
      expect(card).toBeInTheDocument();
      
      // Sprawdź czy nie ma rzeczywistej zawartości
      expect(screen.queryByText('Should not show')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      
      // Ale skeleton powinien być obecny
      expect(card.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('applies custom className and props when loading', () => {
      render(
        <Card 
          loading 
          className="custom-loading-class"
          data-testid="loading-with-custom"
          aria-label="Loading card"
        />
      );
      
      const card = screen.getByTestId('loading-with-custom');
      expect(card).toHaveClass('custom-loading-class');
      expect(card).toHaveAttribute('aria-label', 'Loading card');
    });

    it('maintains shadow and border when loading', () => {
      render(
        <Card 
          loading 
          shadow="lg" 
          bordered 
          data-testid="loading-with-styles"
        />
      );
      
      const card = screen.getByTestId('loading-with-styles');
      expect(card).toHaveClass('shadow-lg', 'border', 'border-gray-200');
    });
  });

  describe('edge cases', () => {
    it('handles empty string title', () => {
      render(<Card title="" description="Test" />);
      
      // Empty title should NOT render the h3 element (since "" is falsy)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('handles empty string description', () => {
      render(<Card title="Test" description="" />);
      
      // Empty description should NOT render the p element (since "" is falsy)
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test');
      expect(screen.queryByText('', { selector: 'p' })).not.toBeInTheDocument();
    });

    it('handles undefined title and description', () => {
      render(<Card title={undefined} description={undefined} />);
      
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.queryByText('', { selector: 'p' })).not.toBeInTheDocument();
    });

    it('filters out empty className correctly', () => {
      render(<Card className="" data-testid="empty-class" />);
      
      const card = screen.getByTestId('empty-class');
      expect(card).toHaveClass('bg-white', 'rounded-lg', 'p-6', 'shadow-md');
      // Nie powinno być dodatkowej pustej klasy
      expect(card.className.split(' ')).not.toContain('');
    });

    it('combines multiple className values correctly', () => {
      render(
        <Card 
          className="class1 class2" 
          shadow="lg" 
          bordered 
          data-testid="multiple-classes"
        />
      );
      
      const card = screen.getByTestId('multiple-classes');
      expect(card).toHaveClass(
        'bg-white',
        'rounded-lg', 
        'p-6',
        'shadow-lg',
        'border',
        'border-gray-200',
        'class1',
        'class2'
      );
    });

    it('passes through additional props correctly', () => {
      render(
        <Card 
          data-custom="custom-value"
          aria-describedby="description-id"
          role="article"
          onClick={() => {}}
        />
      );
      
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('data-custom', 'custom-value');
      expect(card).toHaveAttribute('aria-describedby', 'description-id');
    });
  });

  describe('accessibility', () => {
    it('has proper heading structure', () => {
      render(<Card title="Accessible Title" />);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Accessible Title');
    });

    it('supports ARIA attributes', () => {
      render(
        <Card 
          title="Card with ARIA"
          aria-label="Custom card label"
          aria-describedby="card-description"
          role="region"
        />
      );
      
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('aria-label', 'Custom card label');
      expect(card).toHaveAttribute('aria-describedby', 'card-description');
    });

    it('maintains accessibility during loading', () => {
      render(
        <Card 
          loading 
          aria-label="Loading content"
          role="status"
          data-testid="accessible-loading"
        />
      );
      
      const card = screen.getByRole('status');
      expect(card).toHaveAttribute('aria-label', 'Loading content');
    });
  });
});
