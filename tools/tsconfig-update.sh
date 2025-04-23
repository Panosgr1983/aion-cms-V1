#!/bin/bash

echo "🔄 Δημιουργία backup tsconfig.json..."
cp tsconfig.json tsconfig.backup.json

echo "✍️ Ενημέρωση tsconfig.json με @aion-continuum alias..."

# Χρησιμοποιούμε jq για να ενημερώσουμε το αρχείο (αν υπάρχει)
if command -v jq &> /dev/null
then
  jq '.compilerOptions.paths["@aion-continuum/*"] = ["aion-continuum/*"]' tsconfig.json > tsconfig.tmp.json && mv tsconfig.tmp.json tsconfig.json
  echo "✅ Ενημερώθηκε με επιτυχία."
else
  echo "⚠️ Δεν βρέθηκε το jq. Παρακαλώ εγκατέστησέ το ή ενημέρωσε χειροκίνητα το paths section."
fi

echo "🧹 Restarting dev server (αν υπάρχει)..."
PID=$(lsof -i :3000 -t)
if [ ! -z "$PID" ]; then
  kill -9 $PID
  echo "🛑 Dev server τερματίστηκε (PID $PID)."
else
  echo "ℹ️ Δεν βρέθηκε ενεργός dev server στη θύρα 3000."
fi

echo "🚀 Έτοιμο! Τρέξε ξανά το 'npm run dev' ή 'yarn dev'"
