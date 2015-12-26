'use strict';

const less = require('gulp-less');
const path = require('path');
const gulp = require('gulp');
const data = require('gulp-data');
const render = require('gulp-nunjucks-render');
const Meetups = require('./meetups');
const crypto = require('crypto');
const site = require('./site/data/site.js');
const moment = require('moment');
const meetups = new Meetups(require('./site/data/meetups.json'));

function gravatar(email) {
    let hash = crypto.createHash('md5');
    hash.update(email, 'utf8');
    return `http://www.gravatar.com/avatar/${hash.digest('hex')}`;
}

function longdate(dateString) {
    var date = new Date(dateString.split(/(\d{4})(\d{2})(\d{2})/).join('-'));
    return moment(date).format('MMMM Do, YYYY');
}

let env = render.nunjucks.configure(
    ['site/templates', 'site/layouts', 'site/partials'],
    { watch: false });

env.addFilter('gravatar', gravatar);
env.addFilter('longdate', longdate);

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});


gulp.task('css', function() {
    return gulp.src('./site/styles/js-mtl.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'site', 'styles') ]
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('static', function() {
    return gulp.src('site/static/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('render:index', function() {

    var context = data({
        site: site,
        meetup: meetups.latest()
    });

    return gulp.src('site/pages/index.html')
        .pipe(context)
        .pipe(render())
        .pipe(gulp.dest('dist'));
});

gulp.task('render', ['static', 'css', 'render:index'], function() {
    // gulp.src('site/pages/**/*.html')
    //     .pipe(render())
    //     .pipe(gulp.dest('dist'));
});

gulp.task('default', ['render']);

