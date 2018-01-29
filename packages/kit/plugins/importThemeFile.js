const stylus = require('stylus');

module.exports = function() {
    return function(style) {
        style.define('importThemeFile', function(path, theme) {
            const pathToThemes = './../themes/' + theme + '/' + path + '/index';
            const pathName = !!stylus.utils.lookup(pathToThemes.string + '.styl', this.paths);
            stylus(path).import(pathName);
        });
    };
};
