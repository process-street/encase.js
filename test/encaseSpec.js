describe('encase', function () {
    "use strict";

    // separate

    it('should separate lowerCamel case', function () {
        var str = 'lowerCamelCase';
        var words = Encase.separate(str);
        expect(words).toEqual(['lower', 'Camel', 'Case']);
    });

    it('should separate UpperCamel case', function () {
        var str = 'UpperCamelCase';
        var words = Encase.separate(str);
        expect(words).toEqual(['Upper', 'Camel', 'Case']);
    });

    it('should separate lower_snake case', function () {
        var str = 'lower_snake_case';
        var words = Encase.separate(str);
        expect(words).toEqual(['lower', 'snake', 'case']);
    });

    it('should separate UPPER_SNAKE case', function () {
        var str = 'UPPER_SNAKE_CASE';
        var words = Encase.separate(str);
        expect(words).toEqual(['UPPER', 'SNAKE', 'CASE']);
    });

    it('should separate lower-kebab case', function () {
        var str = 'lower-kebab-case';
        var words = Encase.separate(str);
        expect(words).toEqual(['lower', 'kebab', 'case']);
    });

    it('should separate UPPER-KEBAB case', function () {
        var str = 'UPPER-KEBAB-CASE';
        var words = Encase.separate(str);
        expect(words).toEqual(['UPPER', 'KEBAB', 'CASE']);
    });

    it('should separate 1 word to itself', function () {
        var str = 'word';
        var words = Encase.separate(str);
        expect(words).toEqual(['word']);
    });

    // convertCase

    it('should convert lower-kebab to lowerCamel', function () {
        var str = 'some-attribute';
        var convertedStr = Encase.toLowerCamel(str);
        expect(convertedStr).toBe('someAttribute');
    });

    it('should convert UPPER_SNAKE to UpperCamel', function () {
        var str = 'SOME_CONSTANT';
        var convertedStr = Encase.toUpperCamel(str);
        expect(convertedStr).toBe('SomeConstant');
    });

    it('should convert between lowerCamel and lower_snake', function () {
        var str = 'someAttribute';
        var convertedStr = Encase.toLowerSnake(str);
        expect(convertedStr).toBe('some_attribute');
    });

    it('should convert between UPPER-KEBAB and UPPER_SNAKE', function () {
        var str = 'SOME-CONSTANT';
        var convertedStr = Encase.toUpperSnake(str);
        expect(convertedStr).toBe('SOME_CONSTANT');
    });

    it('should convert between UpperCamel and lower-kebab', function () {
        var str = 'SomeClass';
        var convertedStr = Encase.toLowerKebab(str);
        expect(convertedStr).toBe('some-class');
    });

    it('should convert between lower_snake and UPPER-KEBAB', function () {
        var str = 'some_thing';
        var convertedStr = Encase.toUpperKebab(str);
        expect(convertedStr).toBe('SOME-THING');
    });

});