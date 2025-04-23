import os
import filecmp
import shutil
from pathlib import Path
import difflib

# Ρυθμίσεις
ROOT = Path(".")
BACKUP_FOLDER = ROOT / "__aion_backup_20250419_124142"
SRC_FOLDER = ROOT / "src"
BACKUP_SRC = BACKUP_FOLDER / "src"
LOG_FILE = ROOT / "restore_log.txt"

def log(msg):
    with open(LOG_FILE, "a", encoding="utf-8") as logf:
        logf.write(msg + "\n")
    print(msg)

def compare_and_restore(original, backup):
    for root, dirs, files in os.walk(backup):
        rel_path = Path(root).relative_to(backup)
        original_root = original / rel_path

        for d in dirs:
            target_dir = original_root / d
            if not target_dir.exists():
                log(f"[+] Creating folder: {target_dir}")
                target_dir.mkdir(parents=True, exist_ok=True)

        for f in files:
            backup_file = Path(root) / f
            target_file = original_root / f

            if not target_file.exists():
                log(f"[+] Restoring missing file: {target_file}")
                shutil.copy2(backup_file, target_file)
            else:
                if not filecmp.cmp(backup_file, target_file, shallow=False):
                    log(f"[!] Conflict: {target_file}")
                    handle_conflict(target_file, backup_file)

def handle_conflict(current_file, backup_file):
    log(f" - Existing: {current_file}")
    log(f" - Backup:   {backup_file}")

    with open(current_file, encoding="utf-8") as f1, open(backup_file, encoding="utf-8") as f2:
        current_lines = f1.readlines()
        backup_lines = f2.readlines()

    diff = difflib.unified_diff(
        current_lines, backup_lines,
        fromfile='current', tofile='backup',
        lineterm=''
    )

    diff_text = "\n".join(diff)
    conflict_file = current_file.with_suffix(".conflict.txt")
    with open(conflict_file, "w", encoding="utf-8") as f:
        f.write(diff_text)

    log(f"   -> Δες diff στο: {conflict_file} (δεν έγινε overwrite)")

def main():
    if not BACKUP_SRC.exists():
        log("❌ Backup src folder not found.")
        return

    log(f"🔁 Ξεκινά σύγκριση ανάμεσα σε:\n - {SRC_FOLDER}\n - {BACKUP_SRC}")
    compare_and_restore(SRC_FOLDER, BACKUP_SRC)
    log("✅ Ολοκληρώθηκε η διαδικασία.")

if __name__ == "__main__":
    main()