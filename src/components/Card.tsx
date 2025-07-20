import type { ComponentProps } from 'preact';

/**
 * Właściwości komponentu Card
 */
export interface CardProps extends ComponentProps<'div'> {
  /** Tytuł karty */
  title?: string;
  /** Opis/zawartość karty */
  description?: string;
  /** Czy karta ma cień */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Czy karta ma ramkę */
  bordered?: boolean;
  /** Czy karta jest w stanie ładowania */
  loading?: boolean;
}

/**
 * Komponent karty do wyświetlania treści.
 * Wykorzystuje Tailwind CSS do stylizacji.
 * 
 * @example
 * ```tsx
 * <Card title="Tytuł karty" description="Opis karty" shadow="md">
 *   <Button>Akcja</Button>
 * </Card>
 * ```
 */
export function Card({
  title,
  description,
  shadow = 'md',
  bordered = false,
  loading = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg p-6';
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const borderClasses = bordered ? 'border border-gray-200' : '';
  
  const allClasses = [
    baseClasses,
    shadowClasses[shadow],
    borderClasses,
    className,
  ].filter(Boolean).join(' ');

  if (loading) {
    return (
      <div className={allClasses} {...props}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={allClasses} {...props}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
