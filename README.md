# encase.js

An JavaScript library for changing between camelCase, snake_case, kebab-case, and more.  

## Installation

In a browser:

```html
<script src="encase.js"></script>
```

Via [bower](http://bower.io/):

```bash
bower install encase.js
```

## Notes

This method will provides a global Encase object. That means that once you include it, you can use it like this:

```javascript
var str = 'camelCase';
var convertedStr = Encase.convertCase(Encase.Case.LOWER_SNAKE, str);
// = 'camel_case'
```

Encase automatically detects the "from" case, so you only have to tell it what you want to switch to. It also provides
a general `separate` function for splitting up strings:

```javascript
var str = 'camelCase';
var words = Encase.separate(str);
// = ['camel', 'Case']
```

Encase also provides a lower level `convert` function for making arbitrary conversions. 

The arguments are:

* `headTransform`: how the the first word should be transformed
* `tailTransform`: how the rest of the words should be transformed
* `sep`: how the words should be joined back together
* `str`: the string to operate on

Here's an example for converting any casing to "colon case" (which is used in products like Redis for key naming):

```javascript
var str = 'UpperCamel';
function toLowerCase(str) { return str.toLowerCase(); }
var convertedStr = Encase.convert(toLowerCase, toLowerCase, ':', str);
// = 'upper:camel'
```

## Author

| [![twitter/cdmckay](https://gravatar.com/avatar/b181c028e6b51d408450e12ab68bf25c?s=70)](https://twitter.com/cdmckay "Follow @cdmckay on Twitter") |
|---|
| [Cameron McKay](https://cdmckay.org/) |

## License

This library is available under the [MIT](http://opensource.org/licenses/mit-license.php) license.
