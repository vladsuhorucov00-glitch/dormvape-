#!/data/data/com.termux/files/usr/bin/bash
set -e
echo "=== DormVape: мониторинг цен Авито ==="
echo "[1/4] Обновляю пакеты и ставлю Node.js..."
pkg update -y
pkg install -y nodejs

echo "[2/4] Скачиваю скрипт мониторинга..."
cd ~
mkdir -p avito-monitor
cd avito-monitor
curl -sO https://raw.githubusercontent.com/vladsuhorucov00-glitch/dormvape-/main/avito-monitor/monitor.js
curl -sO https://raw.githubusercontent.com/vladsuhorucov00-glitch/dormvape-/main/avito-monitor/termux-run.sh
chmod +x termux-run.sh

echo "[3/4] Настройка. Вставь токен бота:"
echo -n "Токен (от @BotFather): "
read TOKEN
echo -n "Твой Telegram ID (число): "
read CHAT

cat > config.json <<EOF
{
  "city": "belgorod",
  "query": "айфон",
  "minPrice": 5000,
  "botToken": "$TOKEN",
  "chatId": "$CHAT"
}
EOF

echo "[4/4] Запускаю мониторинг (каждые 30 минут)..."
termux-wake-lock || true
nohup bash termux-run.sh > avito.log 2>&1 &
echo ""
echo "ГОТОВО! Мониторинг работает."
echo "Лог: ~/avito-monitor/avito.log"
echo "Остановить: pkill -f termux-run.sh"