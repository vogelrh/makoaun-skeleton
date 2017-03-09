const gulp = require('gulp');
const paths = require('../paths');
//const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

// Runs the node server component to serve the client component.
// Also watches for chanages in server source files and will restart
// server
gulp.task('serve', ['build-server'], (cb) => {
  let started = false;
  nodemon({
    watch: paths.server.root,
    ext: 'ts',
    env: {
      
    },
    execMap: {
      js: 'node ./' +  paths.server.output +'server.js --harmony_async_await'
    },
    tasks: ['build-server']
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });

});


/*
// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-bundle', ['bundle'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-export', ['export'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['./export'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
*/