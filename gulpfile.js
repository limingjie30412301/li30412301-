const gulp = require('gulp')    //gulp
const del = require('del')  //删除文件
const rename = require('gulp-rename')   //更改文件名
const stylus = require('gulp-stylus')   //.styl文件编译
const replace = require('gulp-replace') //文件内容替换
const pug = require('gulp-pug') //.pug文件编译
const imageMin = require('gulp-imagemin')   //压缩图片
const cleanCss = require('gulp-clean-css')  //清除.css文件注释


//文件来源匹配规则集合
const sources = {
    script: ['./src/**/*.js'],
    json: ['./src/**/*.json'],
    pug: ['./src/**/*.{pug,wxml}'],
    stylus: ['./src/**/*.{wxss,styl}','!./src/stylus/**'],
    imageMin: ['./src/images/*.*']
}

// 每次编译前清除dist文件
gulp.task('clean', () => {
    return del(['./dist/**'])
})

// 直接复制js文件
gulp.task('script',() => {
    return gulp.src(sources.script)
        .pipe(gulp.dest('./dist'))
})

// 直接复制json文件
gulp.task('json',() => {
    return gulp.src(sources.json)
        .pipe(gulp.dest('./dist'))
})

//编译pug文件
gulp.task('pug', () => {
    return gulp.src(sources.pug)
        .pipe(pug())
        .pipe(rename( path => path.extname ='.wxml'))
        .pipe(gulp.dest('./dist'))
})

//编译stylus文件
gulp.task('stylus', () => {
    return gulp.src(sources.stylus)
        .pipe(stylus())
        .pipe(cleanCss())
        .pipe(replace(/(\d+\.?\d?)px/g, (match, n) => `${n}rpx`))
        .pipe(rename( path => path.extname ='.wxss'))
        .pipe(gulp.dest('./dist'))
});

//压缩图片
gulp.task('imageMin',() => {
    return gulp.src(sources.imageMin)
        .pipe(imageMin({progressive: true}))
        .pipe(gulp.dest('./dist/images'))
})

//实时监听文件修改
gulp.task('watch',() => {
    gulp.watch('./src/**/*.js',gulp.series('script'))
    gulp.watch('./src/**/*.{pug,wxml}',gulp.series('pug'))
    gulp.watch('./src/**/*.{styl,wxss}',gulp.series('stylus'))
    gulp.watch('./src/**/*.json',gulp.series('json'))
    gulp.watch('./src/images/*.*',gulp.series('imageMin'))
})


//编译任务流（gulp.parallerl并行执行任务，gulp.series顺序执行任务）
gulp.task('default',gulp.parallel('script','pug','stylus','json','imageMin'))
//build
gulp.task('build',gulp.series('clean','default'))
//dev
gulp.task('dev',gulp.series('build','watch'))