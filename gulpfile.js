var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

var dg_bootstrapModuleSrc = [
  './src/_dg_bootstrap.js',
  './src/blocks/blocks.*.js',
  './src/forms/form.*.js',
  './src/includes/include.*.js',
  './src/pages/page.*.js',
  './src/widgets/widget.*.js'
];

// Task to build the cw_app.min.js file.
gulp.task('minifyJS', function(){
  return gulp.src(dg_bootstrapModuleSrc)
      .pipe(gp_concat('concat.js'))
      .pipe(gulp.dest(''))
      .pipe(gp_rename('dg_bootstrap.min.js'))
      .pipe(gp_uglify())
      .pipe(gulp.dest(''));
});

gulp.task('default', function () {
  watch(dg_bootstrapModuleSrc, function(event) { gulp.start('minifyJS') });
  gulp.start('minifyJS');
});
