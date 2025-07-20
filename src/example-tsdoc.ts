/**
 * @fileoverview Example TSDoc demonstration file
 * @packageDocumentation
 */

/**
 * Represents a user in the system
 * @example
 * ```typescript
 * const user = new User("John", "john@example.com");
 * console.log(user.getFullInfo());
 * ```
 */
export interface User {
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
}

/**
 * Utility function to format user information
 * @param user - The user object to format
 * @returns Formatted string with user information
 * @throws {Error} When user object is invalid
 * @example
 * ```typescript
 * const formatted = formatUser({ name: "John", email: "john@example.com" });
 * // Returns: "John (john@example.com)"
 * ```
 * @since 1.0.0
 */
export function formatUser(user: User): string {
  if (!user || !user.name || !user.email) {
    throw new Error('Invalid user object');
  }
  return `${user.name} (${user.email})`;
}

/**
 * @deprecated Use formatUser instead
 * @see {@link formatUser}
 */
export function oldFormatUser(user: User): string {
  return formatUser(user);
}
