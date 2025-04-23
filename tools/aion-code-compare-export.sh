#!/usr/bin/env bash

# =============================================
# 🧠 AION Code Snapshot: Compare app folders (including src/app)
# =============================================

# Ρίζα project
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(realpath "$SCRIPT_DIR/..")"

# Διευθύνσεις προς ανάλυση
declare -A DIRS=(
  ["src"]="$PROJECT_ROOT/src"
)

# declare -A DIRS=(
#   ["root"]="$PROJECT_ROOT"
# )

OUTPUT_DIR="$SCRIPT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Συνάρτηση εξαγωγής snapshot
export_code() {
  local LABEL="$1"
  local SRC="$2"
  local DEST="$OUTPUT_DIR/${LABEL}_snapshot_$TIMESTAMP.txt"

  if [ ! -d "$SRC" ]; then
    echo "⚠️ Παράλειψη: Δεν βρέθηκε ο φάκελος $SRC"
    return
  fi

  echo "📦 Εξαγωγή snapshot για: $LABEL"
  echo "🔍 Από: $SRC"
  echo "💾 Σε: $DEST"
  echo "----------------------------"

  {
    echo "📁 Snapshot για: $LABEL"
    echo "📍 Source Path: $SRC"
    echo "============================"

    find "$SRC" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.json" \) | sort | while read -r file; do
      echo -e "\n\n📄 $file"
      echo "----------------------------"
      cat "$file"
    done
  } > "$DEST"

  echo "✅ Ολοκληρώθηκε: $DEST"
  echo ""
}

# Εκτέλεση για όλους τους φακέλους
for LABEL in "${!DIRS[@]}"; do
  export_code "$LABEL" "${DIRS[$LABEL]}"
done

# Τελικό μήνυμα
echo "🎯 Έτοιμα snapshots για σύγκριση:"
for LABEL in "${!DIRS[@]}"; do
  SNAPSHOT="$OUTPUT_DIR/${LABEL}_snapshot_$TIMESTAMP.txt"
  [ -f "$SNAPSHOT" ] && echo "📄 $SNAPSHOT"
done