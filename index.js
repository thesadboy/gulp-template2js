/**
 * @file
 * @author Nick
 * @date 15/11/13
 */
"use strict";
var gUtil = require('gulp-util'),
    through = require('through2'),
    path = require('path');

var ENGINES_MAP = {
    dot: function (tmp) {
        return 'doT.template(\'' + tmp + '\');';
    },
    hogan: function (tmp) {
        return 'Hogan.compile(\'' + tmp + '\');';
    },
    handlebars: function (tmp) {
        return 'Handlebars.compile(\'' + tmp + '\');';
    },
    arttemplate: function (tmp) {
        return 'template.compile(\'' + tmp + '\');';
    },
    underscore: function (tmp) {
        return '_.template(\'' + tmp + '\');';
    },
    juicer: function (tmp) {
        return 'juicer(\'' + tmp + '\');';
    },
    kissy: function (tmp) {
        return 'KISSY.Template(\'' + tmp + '\');';
    },
    baidutemplate: function (tmp) {
        return 'baidu.template(\'' + tmp + '\');';
    }
};

var template = function (options) {
    return through.obj(function (file, enc, done) {
        if (gUtil.isNull(file)) {
            return done(null, file);
        }
        if (gUtil.isStream(file)) {
            return done(new gUtil.PluginError('gulp-template2js', 'Streaming not supported'));
        }
        try {
            options.template = (options.template || 'dot').toLowerCase();
            var text = file.contents.toString();
            text = text ? text.replace(/[\r\n\t]/gm, '').replace(/'/gm, '\\\'').replace(/\s{2,}/gim, ' ') : '';
            if (file.path) {
                file.path = gUtil.replaceExtension(file.path, '.js');
                var name = path.basename(file.path, '.js'),
                    context = options.context || 'window';
                file.contents = new Buffer(context + '[\'' + name + '\'] = ' + ENGINES_MAP[options.template](text));
            } else {
                file.contents = new Buffer(ENGINES_MAP[options.template](text));
            }
            name = context = text = null;
        } catch (e) {
            return done(new gUtil.PluginError('gulp-template2js', e, {file: file.path}));
        }
        return done(null, file);
    });
};

module.exports = template;