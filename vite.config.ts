// vite.config.ts
import generateFile from 'vite-plugin-generate-file';

export default {
  plugins: [
    generateFile([
      {
        type: 'json',
        output: './output.txt',
        data: {
          foo: 'bar',
        },
      },
    ]),
  ],
};
