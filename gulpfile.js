const { dest, series } = require('gulp');
const gulp = require('gulp');
const change = require('gulp-change');
const concat = require('gulp-concat');
const stripComments = require('gulp-strip-comments');

const paths = {
  js: {
    src: 'src/*.js',
    dest: 'dist/',
  }
};

function compileJs() {
  function uglifyJs(str) {
    var regex = /\s{2,}/g;
    return str.replace(regex, '');
  }
  return (
    gulp
      .src(paths.js.src, { allowEmpty: true })
      //Merge all the Js files
      .pipe(concat('script.js'))
      //Strip comments
      .pipe(stripComments())
      //Uglify it
      .pipe(change(uglifyJs))
      //Save it as a single file
      .pipe(dest(paths.js.dest))
  );
}


const watch = () => gulp.watch(paths.js.src, series(compileJs));

exports.default = watch;
exports.build = compileJs;
