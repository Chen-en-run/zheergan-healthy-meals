import { existsSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const timeoutMs = 180000;
const start = Date.now();
while (Date.now() - start < timeoutMs) {
  if (existsSync('deploy.out') && readFileSync('deploy.out', 'utf8').includes('DEPLOY_DONE')) {
    console.log('RESULT:', readFileSync('deploy.out', 'utf8'));
    process.exit(0);
  }
  if (existsSync('deploy.err') && readFileSync('deploy.err', 'utf8').includes('DEPLOY_FAILED')) {
    console.log('RESULT:', readFileSync('deploy.err', 'utf8'));
    process.exit(1);
  }
  // wait 5s
  execSync('ping -n 6 127.0.0.1 >nul 2>&1');
}
console.log('TIMEOUT: deploy still running or no result file');
