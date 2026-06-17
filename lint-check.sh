#!/bin/bash
cd /home/nastya/pirs/pirs_tasks
export PATH="/usr/local/bin:/usr/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ 2>/dev/null | tail -1)/bin:./node_modules/.bin:$PATH"
echo "=== ESLINT ==="
eslint src/pages --ext ts,tsx 2>&1
echo "=== TSC ==="
tsc --noEmit 2>&1
echo "=== DONE ==="
