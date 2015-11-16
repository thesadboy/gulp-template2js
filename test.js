/**
 * @file
 * @author Nick
 * @date 15/11/13
 */
"use strict";
var assert = require('assert'),
    gUtil = require('gulp-util'),
    tpl2js = require('./');
it('should compile doT templates', function (done) {
    var stream = tpl2js({
        template: 'dot'
    });
    stream.on('data', function (data) {
        assert.equal(data.contents.toString(), "doT.template('<div>{{?it.isActive}}<span class=\\'active\\'>active</span>{{??}}<span>inactive</span>{{?}}</div>');")
    });
    stream.on('end', done);
    stream.write(new gUtil.File({
        contents: new Buffer("<div>\n{{?it.isActive}}\n<span class='active'>active</span>\n{{??}}\n<span>inactive</span>\n{{?}}\n</div>")
    }));
    stream.end();
});