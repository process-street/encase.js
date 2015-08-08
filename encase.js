(function(window) {

    // separate

    var patterns = ['[A-Z](?=[A-Z][a-z])', '[^A-Z_-](?=[A-Z])'];
    var SEPARATOR_REGEX = new RegExp('(' + patterns.join('|') + ')', 'g');

    function separate(str) {
        var replacedStr = str.replace(SEPARATOR_REGEX, '$1 ');
        return replacedStr.split(/\s+|_|-/);
    }

    // convert

    function convert(transformHead, transformTail, sep, str) {
        var words = separate(str);
        var convertedWords = words.length === 1 ?
            [ transformHead(words[0]) ] :
            [ transformHead(words[0]) ].concat(words.slice(1).map(transformTail));
        return convertedWords.join(sep);
    }

    function toTitleCase(str) {
        if (str === '') return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function toLowerCase(str) {
        return str.toLowerCase();
    }

    function toUpperCase(str) {
        return str.toUpperCase();
    }

    var Encase = {
        separate: separate,
        convert: convert,
        toLowerCamel: convert.bind(null, toLowerCase, toTitleCase, ''),
        toUpperCamel: convert.bind(null, toTitleCase, toTitleCase, ''),
        toLowerSnake: convert.bind(null, toLowerCase, toLowerCase, '_'),
        toUpperSnake: convert.bind(null, toUpperCase, toUpperCase, '_'),
        toLowerKebab: convert.bind(null, toLowerCase, toLowerCase, '-'),
        toUpperKebab: convert.bind(null, toUpperCase, toUpperCase, '-')
    };

    // Allow library to be used in browser or node.js
    if (typeof exports !== "undefined") {
        exports.Encase = Encase;
    }
    else {
        window.Encase = Encase;

        if (typeof define === "function" && define.amd) {
            define(function() {
                return {
                    Encase: Encase
                }
            });
        }
    }

})(typeof window === "undefined" ? this : window);