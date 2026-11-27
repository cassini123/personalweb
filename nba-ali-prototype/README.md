# COURTWORLD · NBA x Ali prototype

## Open on your Mac

Do NOT use /cursor/stores/... — that path only exists inside the cloud agent.

Option 1 — Cursor Context / Agent Store:
Open docs/nba-ali-prototype/index.html in the Project store, then Reveal in Finder and open with a browser.

Option 2 — AgentStores sync folder:
open "$HOME/Library/Application Support/Cursor/AgentStores/cursor_agent_stores/bc-89b9f2b3-ab58-406f-9fbf-c13416485898/files/docs/nba-ali-prototype/index.html"

Option 3 — local server from AgentStores:
cd "$HOME/Library/Application Support/Cursor/AgentStores/cursor_agent_stores/bc-89b9f2b3-ab58-406f-9fbf-c13416485898/files/docs/nba-ali-prototype"
python3 -m http.server 8765
Then visit http://127.0.0.1:8765/

Option 4 — this repo folder after clone:
cd nba-ali-prototype && python3 -m http.server 8765
