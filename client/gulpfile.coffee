gulp   = require 'gulp'
shell  = require 'gulp-shell'
coffee = require 'gulp-coffee'
sass   = require 'gulp-sass'
reiny  = require 'gulp-reiny'
babel  = require 'gulp-babel'
plumber = require 'gulp-plumber'
watchify = require 'gulp-watchify'

gulp.task 'default', ['build']
gulp.task 'build', [
  'build:js'
  'build:coffee'
  'build:reiny'
  'build:css'
  # 'browserify'
]

gulp.task 'build:js', ->
  gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('_lib'))

gulp.task 'build:coffee', ->
  gulp.src('src/**/*.coffee')
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gulp.dest('_lib'))

gulp.task 'build:reiny', ->
  gulp.src('src/**/*.reiny')
    .pipe(plumber())
    .pipe(reiny())
    .pipe(gulp.dest('_lib'))

gulp.task 'build:css', ->
  gulp.src('styles/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('../priv/static/css'))

watching = false
gulp.task 'enable-watch-mode', -> watching = true
gulp.task 'browserify', watchify (watchify) ->
  gulp.src '_lib/index.js'
    .pipe watchify
      watch: watching
    .pipe gulp.dest '../priv/static/js'

gulp.task 'watchify', ['enable-watch-mode', 'browserify']
gulp.task 'watch', ['build', 'enable-watch-mode', 'watchify'], ->
  gulp.watch 'src/**/*.coffee', ['build:coffee']
  gulp.watch 'src/**/*.js', ['build:js']
  gulp.watch 'src/**/*.reiny', ['build:reiny']
  gulp.watch 'styles/**/*.scss', ['build:css']
