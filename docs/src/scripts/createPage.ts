import fs from 'fs';
import path from 'path';

function createPage(fileName: string): void {
  if (!fileName) {
    console.error('ファイル名を指定してください（例: 2025-07-12）');
    process.exit(1);
  }

  const postsDir = path.resolve(process.cwd(), 'docs/posts');
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const template = `---
title: ブログタイトル
tags:
  - つけたいタグ
  - 複数おk
thumbnail: /images/thumbnail.png
---
## 記事タイトル
あとはお好きに書く
`;

  const filePath = path.join(postsDir, `${fileName}.md`);
  if (fs.existsSync(filePath)) {
    console.error('同名のファイルが既に存在します');
    process.exit(1);
  }
  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`作成しました: ${filePath}`);
}

const fileName = process.argv[2];
createPage(fileName);
