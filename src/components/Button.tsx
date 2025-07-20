import type { ComponentProps } from 'preact';

/**
 * Właściwości komponentu Button
 */
export interface ButtonProps extends ComponentProps<'button'> {
  /** Wariant stylistyczny przycisku */
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  /** Rozmiar przycisku */
  size?: 'sm' | 'md' | 'lg';
  /** Czy przycisk jest w stanie ładowania */
  loading?: boolean;
  /** Czy przycisk jest pełnej szerokości */
  fullWidth?: boolean;
}

/**
 * Komponent przycisku z różnymi wariantami stylistycznymi.
 * Wykorzystuje Tailwind CSS do stylizacji.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Kliknij mnie
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const allClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={allClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Ładowanie...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
