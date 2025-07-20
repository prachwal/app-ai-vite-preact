import { describe, it, expect } from 'vitest';
import { Button, Card, type ButtonProps, type CardProps } from '../components/index';

describe('Components Index', () => {
  describe('exports', () => {
    it('exports Button component', () => {
      expect(Button).toBeDefined();
      expect(typeof Button).toBe('function');
    });

    it('exports Card component', () => {
      expect(Card).toBeDefined();
      expect(typeof Card).toBe('function');
    });

    it('exports ButtonProps type', () => {
      // TypeScript types are compile-time only, so we can't test them directly
      // But we can ensure the export doesn't cause runtime errors
      const props: ButtonProps = {
        children: 'Test'
      };
      expect(props).toBeDefined();
    });

    it('exports CardProps type', () => {
      // TypeScript types are compile-time only, so we can't test them directly
      // But we can ensure the export doesn't cause runtime errors
      const props: CardProps = {
        title: 'Test'
      };
      expect(props).toBeDefined();
    });
  });

  describe('component functionality', () => {
    it('Button component can be instantiated', () => {
      expect(() => Button({ children: 'Test' })).not.toThrow();
    });

    it('Card component can be instantiated', () => {
      expect(() => Card({ title: 'Test' })).not.toThrow();
    });
  });
});
