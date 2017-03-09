const gulp = require('gulp');
const paths = require('../paths');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const runSequence = require('run-sequence');

// deletes all files in the client output path
gulp.task('clean-client', ['unbundle'], () => {
  return gulp.src([paths.client.output])
    .pipe(vinylPaths(del));
});

// deletes all files in the output path
gulp.task('clean-server', () => {
  return gulp.src([paths.server.output])
    .pipe(vinylPaths(del));
});

gulp.task('clean', (cb) => {
  return runSequence(
    'clean-client',
    'clean-server',
    cb
  );
});