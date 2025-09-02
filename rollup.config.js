import kwc from '@kdcloudjs/kwc-rollup-plugin';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
// import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import { readdirSync } from 'fs';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const getComponentEntries = () => {
  const componentsDir = 'src/modules/kd';
  const componentFolders = readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const entries = {};
  for (const folder of componentFolders) {
    entries[`kd/${folder}`] = join(componentsDir, folder, `${folder}.js`);
  }
  return entries;
}

export default (args) => {
  // 开发模式使用单一入口以支持开发服务器
  const isDev = args.watch;
  
  return {
    input: isDev ? 'src/main.js' : getComponentEntries(),
    output: isDev ? [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: !isProduction
      }
    ] : [
      {
        // ESM格式 - 支持Tree Shaking
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: !isProduction,
        entryFileNames: '[name].js',
        preserveModules: false
      },
      {
        // CommonJS格式 - 兼容性
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: !isProduction,
        entryFileNames: '[name].js',
        preserveModules: false
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        preventAssignment: true
      }),
      kwc(),
      args.watch &&
      serve({
        open: false,
        port: 3010
      }),
      args.watch && livereload('dist'),
      // 复制静态资源
      // copy({
      //   targets: [
      //     { src: 'assets', dest: 'dist' }
      //   ]
      // })
      // 生产环境压缩代码
      isProduction && terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        mangle: {
          reserved: ['KingdeeBaseComponents']
        }
      })
    ].filter(Boolean),
    external: [],
    // 警告处理
    onwarn(warning, warn) {
      // 忽略某些警告
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    }
  }
}