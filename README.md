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
|-- about.md # 作者紹介ページ
|-- index.md # トップ画面、現状記事の作成日の降順で記事の一覧を出している
|-- posts    # 記事を配置、好きにmdファイルおいてよいが日付のほうが一意性あって見やすい
|-- public   # 静的ファイルを配置、現状画像系のみ
`-- tags     # タグごとのページが管理されている、各ページでそれぞれ記事を一覧表示しているページ
```

## 記事の書き方

`docs/posts/` 配下に `YYYYMMDD.md` の形式でファイルを作成する。<br>
このとき記事本編以外の情報も記載する

|項目|説明|例|
|---|---|---|
|title|記事のタイトル|ブログ爆誕|
|tags|記事に付けたいタグ、複数指定可能|web開発, 雑記|
|date|記事の作成日、YYYY-MM-DD形式で記載|2025-03-07|
|thumbnail|記事のサムネイル画像、`docs/public/images/` 配下に配置した画像を指定する|/images/thumbnail.png|

イメージ

```md
---
title: ブログタイトル
tags:
  - つけたいタグ
  - 複数おk
date: 2025-07-07(YYYY-MM-DDで記事作成日を記載)
thumbnail: /images/thumbnail.png
---

## 記事タイトル
あとはお好きに書く
```
