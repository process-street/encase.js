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

    // convertCase

    var Case = {
        LOWER_CAMEL: 'lowerCamel',
        UPPER_CAMEL: 'UpperCamel',
        LOWER_SNAKE: 'lower_snake',
        UPPER_SNAKE: 'UPPER_SNAKE',
        LOWER_KEBAB: 'lower-kebab',
        UPPER_KEBAB: 'UPPER-KEBAB'
    };

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

    function convertCase(toCase, str) {
        switch (toCase) {
            case Case.LOWER_CAMEL:
                return convert(toLowerCase, toTitleCase, '', str);
            case Case.UPPER_CAMEL:
                return convert(toTitleCase, toTitleCase, '', str);
            case Case.LOWER_SNAKE:
                return convert(toLowerCase, toLowerCase, '_', str);
            case Case.UPPER_SNAKE:
                return convert(toUpperCase, toUpperCase, '_', str);
            case Case.LOWER_KEBAB:
                return convert(toLowerCase, toLowerCase, '-', str);
            case Case.UPPER_KEBAB:
                return convert(toUpperCase, toUpperCase, '-', str);
            default:
                throw new RangeError('"' + toCase + '" is not a recognized case');
        }
    }

    var Encase = {
        separate: separate,
        convert: convert,
        Case: Case,
        convertCase: convertCase,
        toLowerCamel: convertCase.bind(null, Case.LOWER_CAMEL),
        toUpperCamel: convertCase.bind(null, Case.UPPER_CAMEL),
        toLowerSnake: convertCase.bind(null, Case.LOWER_SNAKE),
        toUpperSnake: convertCase.bind(null, Case.UPPER_SNAKE),
        toLowerKebab: convertCase.bind(null, Case.LOWER_KEBAB),
        toUpperKebab: convertCase.bind(null, Case.UPPER_KEBAB)
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