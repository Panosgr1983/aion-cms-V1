#!/bin/bash

# AION Style Lint Fix Script ✨

LOG_DIR=".logs"
LOG_FILE="$LOG_DIR/lint-last.txt"

# Δημιουργία φακέλου αν δεν υπάρχει
mkdir -p "$LOG_DIR"

echo "🔍 Εκτελείται έλεγχος και διόρθωση κώδικα..."
echo "📝 Αποθήκευση σε: $LOG_FILE"
echo "=============================="

# Εκτέλεση lint και αποθήκευση εξόδου
npm run lint -- --fix | tee "$LOG_FILE"

echo ""
echo "✅ Ο έλεγχος ολοκληρώθηκε! Δες το log στο: $LOG_FILE"
