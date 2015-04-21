var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var less = require('gulp-less');
var cheerio = require('cheerio');
var through = require('through2');
var gutil = require('gulp-util');
var header = require('gulp-header');
var footer = require('gulp-footer');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var urlAdjuster = require('gulp-css-url-adjuster');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');
var taskHeader = header('<?xml version="1.0" encoding="UTF-8"?>\n'
        +'<xsl:stylesheet version="1.0" '
        +'xmlns:xsl="http://www.w3.org/1999/XSL/Transform">');
var taskFooter = footer('</xsl:stylesheet>');
var PluginError = gutil.PluginError;

var exitOnError = false;

// consts
// const PLUGIN_NAME = 'gulp-xsl-concat';

function handleError(err) {
  var displayErr = gutil.colors.red(err);
  gutil.log(displayErr);
  if (exitOnError) process.exit(1);
  this.emit('end');
}

function transformBuffer(xsl) {
	var $ = cheerio.load(xsl, {xmlMode: true});
    var result = $($.root().children().get(0)).html();
	return result;
}

function xsl() {
	var stream = through.obj(function(file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
		}
		if (file.isBuffer()) {
			var xsl = String(file.contents);
			var result = transformBuffer(xsl);
			if (result == null){
				this.emit('error', new PluginError(PLUGIN_NAME, 'Something wrong with parsing file'));
				return cb(null, file);
			}	
			file.contents = new Buffer(result);
		}
		if (file.isStream()) {
		    this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported'));
            return cb(null, file);
		}
	
		cb(null, file);
	// function transform(file, cb) {
	// 	file.contents = new Buffer(String(file.contents));
	/// 	cb(null, file);
	// }
	// return require('event-stream').map(transform);
	});
	return stream;
}

gulp.task('css-desktop', function() {
	return gulp.src('{./common.blocks,./desktop.blocks}/**/*.less')
		.pipe(less())
        .pipe(urlAdjuster({prepend: '/bundle/i/'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
		.pipe(concat('index.css'))
		.pipe(gulp.dest('./bundle/desktop'));
});
gulp.task('css-mobile', function() {
	return gulp.src('{./common.blocks,./mobile.blocks}/**/*.less')
		.pipe(less())
        .pipe(urlAdjuster({prepend: '/bundle/i/'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
		.pipe(concat('index.css'))
		.pipe(gulp.dest('./bundle/mobile'));
});
gulp.task('xsl-desktop', function() {
 	return gulp.src('{./common.blocks,./desktop.blocks}/**/*.xsl')
		.pipe(xsl())
		.on('error', handleError)
 		.pipe(concat('index.xsl'))
        .pipe(header('<?xml version="1.0" encoding="UTF-8"?>\n'
        +'<xsl:stylesheet version="1.0" '
        +'xmlns:xsl="http://www.w3.org/1999/XSL/Transform">'))
        .pipe(footer('</xsl:stylesheet>'))
 		.pipe(gulp.dest('./bundle/desktop'));
});

gulp.task('xsl-mobile', function() {
 	return gulp.src('{./common.blocks,./mobile.blocks}/**/*.xsl')
		.pipe(xsl())
		.on('error', handleError)
 		.pipe(concat('index.xsl'))
        .pipe(header('<?xml version="1.0" encoding="UTF-8"?>\n'
        +'<xsl:stylesheet version="1.0" '
        +'xmlns:xsl="http://www.w3.org/1999/XSL/Transform">'))
        .pipe(footer('</xsl:stylesheet>'))
 		.pipe(gulp.dest('./bundle/mobile'));
});


gulp.task('js-mobile', function(){
 	return gulp.src('{./common.blocks,./mobile.blocks}/**/*.js')
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./bundle/mobile'));
});

gulp.task('js-desktop', function(){
 	return gulp.src('{./common.blocks,./desktop.blocks}/**/*.js')
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./bundle/desktop'));
});

gulp.task('copy-img', function(){
    return gulp.src('{./common.blocks,./mobile.blocks,./desktop.blocks}/**/*.{png,jpg,gif}')
        .pipe(copy('./bundle/i/', {prefix: 10}));
});


gulp.task('build', ['css-mobile', 'xsl-mobile', 'css-desktop', 'xsl-desktop', 'js-desktop', 'js-mobile', 'copy-img']);
gulp.task('watch', ['build'], function() {
	return gulp.watch([
		'{./common.blocks,./desktop.blocks,./mobile.blocks}/**/*.less',
		'{./common.blocks,./desktop.blocks,./mobile.blocks}/**/*.xsl',
		'{./common.blocks,./desktop.blocks,./mobile.blocks}/**/*.js'
	], ['build']);
});

gulp.task('default', ['watch']);
