#!/usr/bin/env bash
# Бэкап PostgreSQL для CoffeeMan (запуск на хосте с доступом к контейнеру БД).
# Пример: ./scripts/backup-db.sh coffeeman-postgres
set -euo pipefail
CONTAINER="${1:-coffeeman-postgres}"
OUT_DIR="${BACKUP_DIR:-/opt/backups/coffeeman}"
mkdir -p "$OUT_DIR"
FILE="$OUT_DIR/coffeeman-$(date +%Y%m%d-%H%M%S).sql.gz"
docker exec "$CONTAINER" pg_dump -U coffeeman coffeeman | gzip > "$FILE"
echo "Written $FILE"
