#!/bin/bash

# =============================================
# 🔍 AION Project Tree Explorer (Full Root Export)
# =============================================

# Προσδιορισμός του root (τρέχων κατάλογος ή git root)
ROOT_PATH="$(git rev-parse --show-toplevel 2>/dev/null || realpath "$(dirname "$0")/..")"
MAX_DEPTH=10

# Όνομα αρχείου εξαγωγής
OUTPUT_FILE="$ROOT_PATH/project-root-structure.txt"

echo "🔍 Σάρωση δομής στον φάκελο: $ROOT_PATH (μέχρι βάθος $MAX_DEPTH)"
echo "📄 Εξαγωγή σε: $OUTPUT_FILE"
echo "========================================="

{
  echo "📁 AION PROJECT STRUCTURE"
  echo "🔍 Root: $ROOT_PATH"
  echo "🕳️ Depth: $MAX_DEPTH"
  echo "-------------------------------"

  if command -v tree &> /dev/null; then
    tree -L "$MAX_DEPTH" -a "$ROOT_PATH"
  else
    find "$ROOT_PATH" -maxdepth "$MAX_DEPTH" | sed 's|[^/]*/|  |g'
  fi

  echo ""
  echo "✅ Τέλος ανάλυσης δομής"
} > "$OUTPUT_FILE"

echo "✅ Ολοκληρώθηκε! Το αρχείο δημιουργήθηκε: $OUTPUT_FILE"