import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';

import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default ({ watch }) => {
  const buildDir = './dist';

  const extensions = ['.js', '.jsx'];
  const plugins = [
    replace({
      delimiters: ['', ''],
      [`process.env.NODE_ENV`]: `'development'`,
    }),
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom', replacement: 'preact/compat' },
      ],
    }),
    resolve({ extensions, preferBuiltins: true, browser: true }),
    commonjs(),
    babel({ extensions, babelHelpers: 'bundled' }),
    html({
      template: ({ bundle }) => {
        const entryChunks = Object.entries(bundle)
          .filter(([_, bundleObj]) => bundleObj.isEntry)
          .map(([bundleName]) => bundleName);

        return `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
              </head>
              <body>
                <div id="root"></div>
                ${entryChunks.map(
                  (chunk) => `<script type="module" src="/${chunk}"></script>`
                )}
              </body>
            </html>
            `;
      },
    }),
  ];

  if (watch) {
    plugins.push(livereload(buildDir), serve({ contentBase: buildDir }));
  }

  return {
    input: 'src/app.jsx',
    output: {
      format: 'esm',
      dir: buildDir,
    },
    plugins,
  };
};
