import { execSync } from 'node:child_process';

const cmd = 'npx gh-pages -d dist --nojekyll -m "deploy: web updates"';
try {
  const out = execSync(cmd, { stdio: 'inherit', encoding: 'utf8' });
  console.log('DEPLOY_DONE');
} catch (e) {
  console.error('DEPLOY_FAILED', e.message);
  process.exit(1);
}
