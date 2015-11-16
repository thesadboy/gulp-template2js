# gulp-tpl2js
将一些模板的文件转换成js文件，是grunt插件grunt-cptpl的gulp简版
## 支持的模板
支持各大主流模板引擎：artTemplate、 Handlebars 、Hogan 、 Underscore、 juicer、 doT、 kissy、 baiduTemplate
## 安装
    npm i gulp-template2js --save-dev
## 使用方法
    var gulp = require('gulp'),
        tpl2js = require('gulp-template2js');
    
    gulp.task('tpl2js', function(){
        gulp.src('tpl/html/*.html')
            .pipe(tpl2js({template: 'dot', context:'template'}))
            .pipe(gulp.dest('tpl/js'));
    });
## 参数说明
### template
模板类型 包含 *hogan、handlebars、arttemplate、underscore、juicer、dot、kissy、baidutemplate*，默认值为*dot*
### context
模板挂载的对象，默认为windows
