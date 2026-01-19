---
marp: true
theme: default
paginate: false
backgroundColor: #1a1a2e
color: #eaeaea
style: |
  section {
    font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif;
    padding: 40px 60px;
  }
  h1 {
    color: #ffd700;
    text-align: center;
  }
  h2 {
    color: #00d4ff;
    border-bottom: 2px solid #00d4ff;
    padding-bottom: 0.3em;
  }
  h3 {
    color: #00d4ff;
  }
  code {
    background: #16213e;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
  pre {
    background: #16213e !important;
    padding: 1em;
    border-radius: 8px;
    border-left: 4px solid #00d4ff;
  }
  pre code {
    color: #00ff88 !important;
    background: transparent !important;
  }
  table {
    font-size: 0.85em;
    margin: 0 auto;
  }
  th {
    background: #16213e !important;
    color: #ffd700 !important;
  }
  td {
    background: #1a1a2e !important;
  }
---

<!-- _class: lead -->

# 📝 Marp Slides

## Baby Cup プレゼン資料

---

## ファイル構成

| ファイル | 説明 |
|:---------|:-----|
| `01_main.md` | メインスライド（発表用） |
| `images/` | スライド内で使用する画像 |

---

## 起動方法

### サーバーモード (`-s`) — 推奨

ディレクトリ全体をホストし、ブラウザでファイル一覧から選択

```bash
npx @marp-team/marp-cli -s .
```

`http://localhost:8080/` → ファイルを選択

---

### ウォッチモード (`-w`)

特定のファイルを直接プレビュー

```bash
npx @marp-team/marp-cli -w 01_main.md
```

どちらのモードでも、保存時に自動更新 ✨

---

## PDF / HTML 出力

```bash
# PDF に変換
npx @marp-team/marp-cli 01_main.md --pdf

# HTML に変換
npx @marp-team/marp-cli 01_main.md --html
```

---

<!-- _class: lead -->

# 🎮 Good Luck!

スライドを編集して  
素敵なプレゼンを作りましょう
