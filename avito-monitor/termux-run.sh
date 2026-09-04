#!/data/data/com.termux/files/usr/bin/bash
cd "$(dirname "$0")"
while true; do
  node monitor.js
  sleep 1800
done