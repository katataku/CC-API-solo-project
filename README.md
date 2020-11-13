---
marp: true
---

# SSS(集合 Station Suggestion)

by taku

このリポジトリは Code Chrysalis の生徒であるときに作成しました（This was created during my time as a student at Code Chrysalis）

---

## Concept

GoTo 使って飲もう
→ 　どこで飲む？
→ 　みんなが帰りやすい駅がいいね。

**帰りやすい駅　 is どこ？**

集合する　ステーション　サジェスチョン

---

## How to Use

---

## List of Endpoint

- Get

  - /location
  - /location?line1=xxx&line2=yyy

- POST

  - /location
    send data as request Body

- DELETE

  - /location/:id
    id is generated automatically

- PUT
  - /location/:id
    send new data as request Body

---

## Tech

- server side

  - express
  - TypeORM
  - postgresSQL

- Docs

  - Merp

---

## チャレンジした内容と直面した問題・苦労した点

- そもそも実行 ← かなり辛かった。
  - curl での実行
  - chai での実行

---

## GitHub URL

https://github.com/katataku/CC-API-solo-project
