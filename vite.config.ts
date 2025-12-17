import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      // ⚠️ 下面呢行最重要！唔改會白畫面！
      base: '/你的-repo-名/', 
      
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'), // 通常指去 src folder
        }
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      }
    };
});
