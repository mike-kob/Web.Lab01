"use strict";

// Load plugins

const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const sass = require("gulp-sass");

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');


function reload() {
    browserSync.reload();
}

function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src("./app/scss/*.scss")

            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)

            // What is the destination for the compiled file?
            .pipe(gulp.dest("./app/scss/"))
    );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch("./app/*.html", reload);
    gulp.watch("./app/scss/*.scss", gulp.series(style, reload));
    gulp.watch("app/scss/*.scss", style).on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
}


function build() {
    gulp.src('./app/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('./docs/js'));
    gulp.src('./app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./docs/scss'));
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./docs'));
    gulp.src('./app/img/*')
        .pipe(gulp.dest('./docs/img'));
    return  gulp.src('./app/fonts/*')
        .pipe(gulp.dest('./docs/fonts'));
}

exports.watch = gulp.series(style, watch);
exports.style = style;
exports.build = build;