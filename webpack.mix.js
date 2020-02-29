let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.ts('src/index.ts', 'public/dist/');

mix.browserSync({
    proxy: false,
    files: [
        'public/dist/index.js'
    ],
    watch: true,
    port: '3030',
    server: {
        baseDir: 'public'
    }
});
