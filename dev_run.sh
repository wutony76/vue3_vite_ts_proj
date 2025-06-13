#!/bin/bash
echo "RUN.PROJ..."

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm list
nvm use 18
node -v
npm run dev


