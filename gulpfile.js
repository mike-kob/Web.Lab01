"use strict";

// Load plugins

const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const sass = require("gulp-sass");

function reload() {
    browserSync.reload();
}

function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src("./app/css/*.scss")

            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)

            // What is the destination for the compiled file?
            .pipe(gulp.dest("./app/css/"))
    );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch("./app/*.html", reload);
    gulp.watch("./app/css/*.scss", gulp.series(style, reload));
    gulp.watch("app/css/*.scss", style).on('change', browserSync.reload);
gulp.watch("app/*.html").on('change', browserSync.reload);
}

exports.watch = gulp.series(style, watch);
exports.style = style;