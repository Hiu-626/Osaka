import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ⚠️ 確保你的 GitHub Repository 名稱真的是 "Osaka"
  // 如果你的網址是 https://hiu-626.github.io/Osaka/，這樣寫是對的
  base: '/Osaka/', 
  
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    }
  },
  
  // 這裡移除了 define，因為建議用下面教你的 VITE_ 方式
});
