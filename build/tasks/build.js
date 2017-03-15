const gulp = require('gulp');
const runSequence = require('run-sequence');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const paths = require('../paths');
const assign = Object.assign || require('object.assign');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const typescript = require('gulp-typescript');
const htmlmin = require('gulp-htmlmin');
let typescriptCompiler = null;
let typescriptCompilerS = null;

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system-client', () => {
  if(!typescriptCompiler) {
    typescriptCompiler = typescript.createProject('tsconfig.client.json', {
      "typescript": require('typescript')
    });
  }

  return gulp.src(paths.dtsSrc.concat(paths.client.source))
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.client.output, {extension: '.ts'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(typescriptCompiler())
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
    .pipe(gulp.dest(paths.client.output));
});

// transpiles the server node files.
gulp.task('build-system-server', () => {
  if(!typescriptCompilerS) {
    typescriptCompilerS = typescript.createProject('tsconfig.server.json', {
      "typescript": require('typescript')
    });
  }

  return gulp.src(paths.server.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.server.output, {extension: '.ts'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(typescriptCompilerS())
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
    .pipe(gulp.dest(paths.server.output));
});

// copies changed html files to the output directory
gulp.task('build-html', () => {
  return gulp.src(paths.client.html)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.client.output, {extension: '.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.client.output));
});

// copies changed css files to the output directory
gulp.task('build-css', () => {
  return gulp.src(paths.client.css)
    .pipe(changed(paths.client.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.client.output))
    .pipe(browserSync.stream());
});

// copies changed image files to the output directory
gulp.task('build-images', () => {
  return gulp.src(paths.client.images)
    .pipe(changed(paths.client.output))
    .pipe(gulp.dest(paths.client.imageOut))
    .pipe(browserSync.stream());
});
// this task calls the clean task (located
// in ./clean.js), then runs the build-system-client
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build-client', (callback) => {
  return runSequence(
    'clean-client',
    ['build-system-client', 'build-html', 'build-css', 'build-images'],
    callback
  );
});

// cleans server output directory then builds server code.
gulp.task('build-server', (callback) => {
  return runSequence(
    'clean-server',
    'build-system-server',
    callback
  );
});

//build client and server
gulp.task('build', (callback) => {
  return runSequence(
    ['build-client', 'build-server'],
    callback
  );
});