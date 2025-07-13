# pandam-blog

ブログ管理のやつです<br>
https://pandam-blog.pages.dev で公開しています

## 技術スタック

| 技術スタック | 説明 |
| --- | --- |
| dev container | VSCodeのdev containerを使って、開発環境を構築 |
| Vue 3 + TypeScript + Vite + VitePress | VitePress でmarkdown管理 |
| Cloudflare Pages | 静的サイトホスティングサービス、圧倒的無料うれしみ |

最近Reactばっかり使ってたので、Vueの勉強も兼ねて作成しました。<br>
VitePressを使って、Markdownで記事を書けるようにしているので、気軽に更新できるはず...

## docs配下

VitePressのドキュメントを配置しています。

```sh
docs
|-- about.md # Aboutページ
|-- index.md # トップページ
|-- posts    # 記事一覧ページ
|-- public   # 静的ファイルを配置する場所
|-- src      # ソースファイルを配置する場所
`-- tags     # タグ一覧ページ
```

## 記事の書き方

`docs/posts/` 配下に `YYYYMMDD.md` の形式でファイルを作成する。<br>
このとき記事本編以外の情報も記載する

|項目|説明|例|
|---|---|---|
|title|記事のタイトル|ブログ爆誕|
|tags|記事に付けたいタグ、複数指定可能|web開発, 雑記|
|thumbnail|記事のサムネイル画像、`docs/public/images/` 配下に配置した画像を指定する|/images/thumbnail.png|

コマンド

```sh
$ pnpm new 2025-03-07
```
