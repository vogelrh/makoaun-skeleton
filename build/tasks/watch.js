const gulp = require('gulp');
const paths = require('../paths');
const config = require('config');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('browser-sync', () => {
  browserSync.init(null, {
		proxy: "http://localhost:" + config.server.port,
        files: ["dist/client/**/*.*"],
        browser: "chrome",
        port: config.server.browserProxyPort
	});
});

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve','build-client', 'browser-sync'], () => {
  gulp.watch(paths.client.source, ['build-system-client', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.client.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.client.css, ['build-css', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.style, browserSync.reload).on('change', reportChange);
});
