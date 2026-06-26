import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const BACKUP_DIR = path.join(__dirname, '../data_backup');

function runManualBackup() {
  try {
    console.log('⏳ Running manual database backup...');
    
    if (!fs.existsSync(DATA_DIR)) {
      console.error('❌ Data directory does not exist!');
      process.exit(1);
    }
    
    const dataFiles = fs.readdirSync(DATA_DIR);
    const now = new Date();
    const dateString = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const weeklyBackupDir = path.join(BACKUP_DIR, 'weekly_backups', `backup_${dateString}`);
    
    fs.mkdirSync(weeklyBackupDir, { recursive: true });
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    
    let backedUpCount = 0;
    for (const file of dataFiles) {
      if (file.endsWith('.json') && file !== 'last_backup.json') {
        const sourcePath = path.join(DATA_DIR, file);
        const targetBackupPath = path.join(BACKUP_DIR, file);
        const targetWeeklyPath = path.join(weeklyBackupDir, file);
        
        fs.copyFileSync(sourcePath, targetBackupPath);
        fs.copyFileSync(sourcePath, targetWeeklyPath);
        backedUpCount++;
      }
    }
    
    // Write new tracker file
    const trackerData = { lastBackup: now.toISOString() };
    const backupTrackerFile = path.join(DATA_DIR, 'last_backup.json');
    fs.writeFileSync(backupTrackerFile, JSON.stringify(trackerData, null, 2));
    fs.writeFileSync(path.join(BACKUP_DIR, 'last_backup.json'), JSON.stringify(trackerData, null, 2));

    console.log(`🎉 Manual backup complete! Backed up ${backedUpCount} files to data_backup/ and weekly_backups/backup_${dateString}`);
  } catch (err) {
    console.error('❌ Manual backup failed:', err.message);
    process.exit(1);
  }
}

runManualBackup();
