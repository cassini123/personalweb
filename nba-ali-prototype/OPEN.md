# 如何打开 COURTWORLD

不要用 `/cursor/stores/...`（那是云端 Agent 路径，Mac 没有）。

## 在线打开（推荐）

浏览器直接打开（jsDelivr CDN，跟仓库分支同步）：

https://cdn.jsdelivr.net/gh/cassini123/personalweb@cursor/nba-ali-prototype-8d2d/nba-ali-prototype/index.html

身份页深链：

https://cdn.jsdelivr.net/gh/cassini123/personalweb@cursor/nba-ali-prototype-8d2d/nba-ali-prototype/index.html?screen=identity

洞察页：

https://cdn.jsdelivr.net/gh/cassini123/personalweb@cursor/nba-ali-prototype-8d2d/nba-ali-prototype/insight.html

## Mac 本地

```
open "$HOME/Library/Application Support/Cursor/AgentStores/cursor_agent_stores/bc-89b9f2b3-ab58-406f-9fbf-c13416485898/files/docs/nba-ali-prototype/index.html"
```

或 clone 本仓库后：

```
cd nba-ali-prototype
python3 -m http.server 8765
```

然后打开 http://127.0.0.1:8765/

## GitHub

PR: https://github.com/cassini123/personalweb/pull/1  
Branch: `cursor/nba-ali-prototype-8d2d`
