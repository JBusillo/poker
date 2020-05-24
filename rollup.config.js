import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';

import livereload from 'rollup-plugin-livereload';
import copyassets from 'rollup-plugin-copy-assets';
import replace from '@rollup/plugin-replace';

import { terser } from 'rollup-plugin-terser';
// import alias from '@rollup/plugin-alias';

const production = !process.env.ROLLUP_WATCH;

// const aliases = alias({
// 	resolve: ['.svelte', '.js'], //optional, by default this will just look for .js files or folders
// 	entries: [{ find: 'src', replacement: 'D:/Projects/poker-svelte/src' }],
// });

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
	},
	plugins: [
		replace({ __buildEnv__: production ? 'production' : 'development' }),
		copyassets({
			assets: ['src/assets'],
		}),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: (css) => {
				css.write('public/build/bundle.css');
			},
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
			preferBuiltins: true,
		}),
		commonjs(),
		builtins(),
		json({
			compact: true,
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start'], {
					//					require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				});
			}
		},
	};
}
