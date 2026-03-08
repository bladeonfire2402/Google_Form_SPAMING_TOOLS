import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// Lấy __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy load play-sound để tránh lỗi khi import
let player: { play: (file: string, callback: (err: Error | null) => void) => void } | null = null;
const getPlayer = async () => {
  if (!player) {
    try {
      // Dynamic import để tránh lỗi khi module không load được
      // @ts-expect-error - play-sound không có type definitions
      const playModule = await import('play-sound');
      const play = playModule.default || playModule;
      player = play({});
    } catch (error) {
      console.warn('Không thể load play-sound library:', error);
      player = null;
    }
  }
  return player;
};

export const playNotificationSound = async (soundFile: string | null = null) => {
  try {
    let fileToPlay = soundFile;

    // Nếu không có file cụ thể, tự động tìm file âm thanh trong thư mục
    if (!fileToPlay) {
      const projectDir = path.resolve(__dirname, '..', '..');
      const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.wma'];

      // Tìm file âm thanh trong thư mục
      const files = fs.readdirSync(projectDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (audioExtensions.includes(ext)) {
          fileToPlay = path.join(projectDir, file);
          console.log(`🎵 Tìm thấy file nhạc: ${file}`);
          break;
        }
      }
    }

    // Nếu tìm thấy file, phát nó
    if (fileToPlay) {
      const filePath = path.resolve(fileToPlay);
      if (fs.existsSync(filePath)) {
        const audioPlayer = await getPlayer();
        if (audioPlayer) {
          // Wrap callback trong Promise để có thể await
          await new Promise<void>((resolve, reject) => {
            try {
              audioPlayer.play(filePath, (err: Error | null) => {
                if (err) {
                  console.error('Lỗi khi phát nhạc:', err);
                  reject(err);
                } else {
                  console.log(`🔔 Đã phát nhạc thông báo: ${path.basename(filePath)}`);
                  resolve();
                }
              });
            } catch (error) {
              console.error('Lỗi khi gọi player.play:', error);
              reject(error);
            }
          });
          return;
        } else {
          console.log('Play-sound không khả dụng, dùng beep system...');
        }
      }
    }

    // Fallback: dùng beep system trên Windows
    console.log('🔔 Phát beep system thông báo...');
    exec('powershell -c "[console]::beep(800,500)"', (error) => {
      if (error) {
        console.log('Không thể phát beep system');
      } else {
        console.log('✅ Đã phát beep thông báo!');
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Lỗi khi phát nhạc:', errorMessage);
    // Fallback cuối cùng: dùng beep system
    try {
      exec('powershell -c "[console]::beep(800,500)"');
      console.log('✅ Đã phát beep thông báo (fallback)!');
    } catch (e) {
      console.log('⚠️ Không thể phát âm thanh thông báo');
    }
  }
};
