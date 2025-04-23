#!/bin/bash

# =============================================
# 🧠 AION Folder Structure Merger
# Συγχρονισμός φακέλων app/ και src/app/
# =============================================

SRC1=${1:-"app"}
SRC2=${2:-"src/app"}
MERGED_DIR="merged_app"
LOG_FILE="merge_structure_log.txt"

echo "📂 Σύγκριση: $SRC1 ⟷ $SRC2"
echo "📁 Ενοποίηση στο: $MERGED_DIR"
mkdir -p "$MERGED_DIR"
echo "" > "$LOG_FILE"

function process_structure() {
  local path1="$1"
  local path2="$2"
  local base_path="$3"

  find "$path1" -type f | while read -r file1; do
    relative_path="${file1#$path1/}"
    file2="$path2/$relative_path"
    merged_file="$MERGED_DIR/$relative_path"
    mkdir -p "$(dirname "$merged_file")"

    if [ -f "$file2" ]; then
      cp "$file1" "$merged_file"
      echo "✅ Exists in both: $relative_path" >> "$LOG_FILE"
    else
      cp "$file1" "$merged_file"
      echo "➕ Only in $path1: $relative_path" >> "$LOG_FILE"
      touch "$path2/$relative_path"  # Προσθέτει placeholder αν λείπει
    fi
  done

  find "$path2" -type f | while read -r file2; do
    relative_path="${file2#$path2/}"
    file1="$path1/$relative_path"
    merged_file="$MERGED_DIR/$relative_path"

    if [ ! -f "$file1" ]; then
      mkdir -p "$(dirname "$merged_file")"
      cp "$file2" "$merged_file"
      echo "➕ Only in $path2: $relative_path" >> "$LOG_FILE"
      touch "$path1/$relative_path"
    fi
  done
}

process_structure "$SRC1" "$SRC2" "$MERGED_DIR"

echo ""
echo "📝 Αναφορά αποθηκεύτηκε στο: $LOG_FILE"
echo "✅ Ο συγχρονισμός ολοκληρώθηκε στο: $MERGED_DIR"
