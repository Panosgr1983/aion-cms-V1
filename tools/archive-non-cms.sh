#!/bin/bash

# =============================================
# 🧹 AION CMS - Cleanup Script
# Μεταφέρει εκτός CMS ό,τι δεν ανήκει στον πυρήνα του
# =============================================

ARCHIVE_DIR="__archive"
LOG_FILE="$ARCHIVE_DIR/log.txt"
mkdir -p "$ARCHIVE_DIR"

echo "📦 Δημιουργία φακέλου αρχείου: $ARCHIVE_DIR"
echo "📝 Καταγραφή σε: $LOG_FILE"
echo "====================" > "$LOG_FILE"
echo "📆 Date: $(date)" >> "$LOG_FILE"
echo "====================" >> "$LOG_FILE"

# Λίστα προς μετακίνηση
ITEMS_TO_ARCHIVE=(
  "aion-continuum"
  "AION_Forge"
  "batch_backup"
  "comparison"
  "src"
  "aion_cms_products.json"
  "generate-aion-forge-structure.sh"
  "make-scripts-executable.sh"
  "merge-temp.sh"
  "merge-temp-with-comparison.sh"
  "merge-aion.sh"
  "merge-src.sh"
  "setup-continuum.sh"
  "setup-continuum-extensions.sh"
  "init-install-submodules.sh"
  "tsconfig.backup.json"
  "*.log"
  "h"
)

# Εκτέλεση μεταφοράς
for ITEM in "${ITEMS_TO_ARCHIVE[@]}"; do
  if compgen -G "$ITEM" > /dev/null; then
    echo "📁 Μεταφορά: $ITEM"
    mv $ITEM "$ARCHIVE_DIR/" 2>/dev/null
    echo "✅ Moved: $ITEM" >> "$LOG_FILE"
  else
    echo "❌ Δεν βρέθηκε: $ITEM" >> "$LOG_FILE"
  fi
done

echo "✅ Ολοκληρώθηκε η μεταφορά!"
echo "🔎 Δες τι μεταφέρθηκε στο $LOG_FILE"