# 如何打开 COURTWORLD（有视觉）

## 为什么 jsDelivr 只有代码？

`cdn.jsdelivr.net/.../index.html` 的 Content-Type 是 **text/plain**，浏览器会显示源码而不是页面。这是 CDN 限制，不是项目坏了。

## 推荐打开方式（会渲染界面）

### 1) HTML Preview（推荐，可直接点）

首页：
https://htmlpreview.github.io/?https://github.com/cassini123/personalweb/blob/cursor/nba-ali-prototype-8d2d/nba-ali-prototype/index.html

横屏双窗对战：
https://htmlpreview.github.io/?https://github.com/cassini123/personalweb/blob/cursor/nba-ali-prototype-8d2d/nba-ali-prototype/index.html?screen=play

全流程大图：
https://htmlpreview.github.io/?https://github.com/cassini123/personalweb/blob/cursor/nba-ali-prototype-8d2d/nba-ali-prototype/flow-board.html

### 2) Mac 本地文件

```
open "$HOME/Library/Application Support/Cursor/AgentStores/cursor_agent_stores/bc-89b9f2b3-ab58-406f-9fbf-c13416485898/files/docs/nba-ali-prototype/index.html"
```

### 3) 本地服务器

```
cd nba-ali-prototype
python3 -m http.server 8765
```
然后打开 http://127.0.0.1:8765/?screen=play （请横屏）

### 4) GitHub Pages

仓库已推送 `gh-pages` 分支。请在 GitHub → Settings → Pages → Source 选 `gh-pages` / root，启用后访问：
https://cassini123.github.io/personalweb/?screen=play
