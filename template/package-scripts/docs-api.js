// Script to run TypeDoc for API documentation
import { execSync } from 'child_process';

try {
  execSync('npx typedoc', { stdio: 'inherit' });
} catch (e) {
  process.exit(1);
}
