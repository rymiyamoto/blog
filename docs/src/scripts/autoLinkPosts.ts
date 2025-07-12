import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type FrontMatter = {
  title: string;
  date: string;
  [key: string]: any;
};

type Post = {
  file: string;
  data: FrontMatter;
  content: string;
};

const postsDir = path.resolve(process.cwd(), 'docs/posts')

function getPostFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
}

function extractDateFromFilename(filename: string): string {
  // 例: 2025-07-13.md → 2025-07-13
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})\.md$/);
  return match ? match[1] : '';
}

function loadPosts(files: string[], dir: string): Post[] {
  return files.map(file => {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const parsed = matter(raw);
    // dateはファイル名から取得
    const date = extractDateFromFilename(file);
    return {
      file,
      data: { ...parsed.data, date } as FrontMatter,
      content: parsed.content,
    };
  });
}

function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => a.data.date.localeCompare(b.data.date));
}

function buildFrontMatter(post: Post, prev: Post | undefined, next: Post | undefined): FrontMatter {
  const fm = { ...post.data };
  fm.date = post.data.date; // 必ずYYYY-MM-DD
  fm.prev = prev
    ? { text: prev.data.title, link: `/posts/${prev.file.replace(/\.md$/, '')}` }
    : false;
  fm.next = next
    ? { text: next.data.title, link: `/posts/${next.file.replace(/\.md$/, '')}` }
    : false;
  return fm;
}

function updatePostFile(post: Post, fm: FrontMatter, dir: string) {
  const newContent = matter.stringify(post.content.trim() + '\n', fm);
  fs.writeFileSync(path.join(dir, post.file), newContent, 'utf-8');
  console.log(`Updated: ${post.file}`);
}

function autoLinkPosts() {
  const files = getPostFiles(postsDir);
  const posts = sortPostsByDate(loadPosts(files, postsDir));
  posts.forEach((post, i) => {
    const prev = posts[i - 1];
    const next = posts[i + 1];
    const fm = buildFrontMatter(post, prev, next);
    updatePostFile(post, fm, postsDir);
  });
}

autoLinkPosts();
