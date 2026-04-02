#!/bin/bash
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"
cd "$(dirname "$0")"
exec /opt/homebrew/bin/node node_modules/.bin/next dev -p 3000
