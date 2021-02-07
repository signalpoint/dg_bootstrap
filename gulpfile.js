var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

var moduleSrc = [
  './src/_dg_bootstrap.js',
  './src/blocks/blocks.*.js',
  './src/forms/form.*.js',
  './src/includes/include.*.js',
  './src/pages/page.*.js',
  './src/widgets/widget.*.js'
];

// Minify JavaScript
function minifyJs() {
  console.log('compressing dg_bootstrap.js...');
  var moduleJs = gulp.src(moduleSrc)
    .pipe(gp_concat('dg_bootstrap.js'))
    .pipe(gulp.dest('./'));
    console.log('compressing dg_bootstrap.min.js...');
  return moduleJs.pipe(gp_rename('dg_bootstrap.min.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('./'));
}
gulp.task(minifyJs);

gulp.task('default', function(done) {

  gulp.watch(moduleSrc, gulp.series('minifyJs'));

  done();

});
