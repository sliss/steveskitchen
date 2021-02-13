const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');

//compile scss into css
function style() {
    return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}
function watch() {
    browserSync.init({
        server: {
           baseDir: "./",
           index: "index.html"
        }
    });
    gulp.watch('./scss/**/*.scss', style)
    // gulp.watch('./js/**/*.js', compress)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

function compress() {
    return gulp.src('./js/**/*.js')
      .pipe(minify())
      .pipe(gulp.dest('./js-min'))
}

exports.style = style;
exports.watch = watch;
exports.compress = compress;