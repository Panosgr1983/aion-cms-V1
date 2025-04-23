#!/bin/bash

# =============================================
# 🧼 AION FINALIZE APP SCRIPT
# =============================================

# 🔍 Detect project root
SCRIPT_DIR="$(cd "$(dirname "{BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(realpath "$SCRIPT_DIR/..")"

MERGED_APP="$PROJECT_ROOT/merged_app"
SRC_DIR="$PROJECT_ROOT/src"
NEW_APP_DIR="$SRC_DIR/app"
BACKUP_DIR="$PROJECT_ROOT/__aion_backup_20250419_124142"
LOG_DIR="$PROJECT_ROOT/AION_LOGS"
LOG_FILE="$LOG_DIR/finalize_20250419_124142.log"

# 👉 Create logs and backup dirs
mkdir -p "$LOG_DIR"
mkdir -p "$BACKUP_DIR"

log() {
  echo -e "$1" | tee -a "$LOG_FILE"
}

# 🧪 Check for merged_app
if [ ! -d "$MERGED_APP" ]; then
  log "❌ Το merged_app δεν υπάρχει στο: $MERGED_APP"
  exit 1
fi

log "🚀 Ξεκινά το AION FINALIZE PROCESS..."
log "🗂️  Project Root: $PROJECT_ROOT"
log "🗃️  Backup Folder: $BACKUP_DIR"
log ""

# 📦 Κάνε move ΟΤΙ ΔΕΝ είναι merged_app, tools, .git, node_modules, .next, .vscode, public
log "📦 Μεταφορά μη σχετικών φακέλων στο backup..."

shopt -s dotglob
for item in "$PROJECT_ROOT"/*; do
  name=$(basename "$item")
  if [[ "$name" != "merged_app" && "$name" != "tools" && "$name" != ".git" && "$name" != "node_modules" && "$name" != ".next" && "$name" != "public" && "$name" != "package.json" && "$name" != "package-lock.json" && "$name" != "README.md" ]]; then
    mv "$item" "$BACKUP_DIR/" && log "📁 Moved: $name"
  fi
done
shopt -u dotglob

# ✅ Δημιουργία src/ αν δεν υπάρχει
mkdir -p "$SRC_DIR"

# 🔄 Μετονομασία merged_app -> src/app
log ""
log "📁 Μετονομασία merged_app -> src/app ..."
mv "$MERGED_APP" "$NEW_APP_DIR"

log ""
log "✅ Ολοκληρώθηκε με επιτυχία!"
log "📄 Log αποθηκεύτηκε στο: $LOG_FILE"
