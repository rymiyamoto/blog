import path from 'path';

export function getDocsPath(dir: string): string {
  return path.resolve(process.cwd(), `docs/${dir}`);
}
