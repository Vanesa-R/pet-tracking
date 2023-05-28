/* Genéricas */
const { src, dest, series, parallel } = require('gulp');
// const del = require("del");
const plumber = require("gulp-plumber");

/*Para tareas html */
const pug = require("gulp-pug");
const htmlmin = require("gulp-htmlmin");

/*Para tareas  css */
const sass = require("gulp-dart-sass");
const autoprefixer = require ("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");

/* Para tareas js*/
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const terser = require("gulp-terser");

/* Para assets */
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");



// HTML
const html = done => {
    src("./app/html/pages/*.pug")
    .pipe(plumber())
    .pipe(pug({
        doctype: "html",
        pretty: true
    }))
    .pipe(htmlmin({
        collapseWhitespace: true 
    }))
    .pipe(dest("dist"));
    done()
};



// CSS
const css = done => {
    src("app/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({
        suffix: ".min",
        extname: ".css"
    }))
    .pipe(dest("dist/css"));
    done()
};


// JAVASCRIPT
const js = done => {
    src("app/js/*.js")
    .pipe(plumber())
    .pipe(concat("app.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(dest("dist/js"));
    done() 
}

const bundle = done => {
    src("app/js/connection/*.js")
    .pipe(plumber())
    .pipe(concat("bundle.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(dest("app/js"));
    done() 
}

// IMÁGENES
const images = done => {
    src("app/assets/**/*")
    .pipe(plumber())
    .pipe(webp())
    .pipe(imagemin())
    .pipe(dest("dist/assets"))
    done();
}



exports.package = series(parallel(html, css, js, bundle), images)