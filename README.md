Promo Slide is a jQuery plugin to show content on your site. After scrolling to the bottom of the page, a slide-out panel appears with more content. 

The container HTML can be customized. Template placeholders can be used, and then passed in dynamically at the time the plugin is initialized in the DOM.

The plugin source is written in coffeescript.

## Demo
[http://andyatkinson.com/projects/promoSlide](http://andyatkinson.com/projects/promoSlide)

## How to use it

    $('body').promoSlide();


## Contributing
Source code changes should be done on the coffeescript version of the file. The generated javascript file should pass JSLint validation with no warnings or errors. `jsl` on OS X is available as a [homebrew binary install](https://github.com/Homebrew/homebrew-binary). To install `jslint`:

    brew tap homebrew/binary
    brew install jsl

To use it:

    $ jsl -process jquery.promoSlide.js

    JavaScript Lint 0.3.0 (JavaScript-C 1.5 2004-09-24)
    Developed by Matthias Miller (http://www.JavaScriptLint.com)

    jquery.promoSlide.js

    0 error(s), 0 warning(s)

## MIT License
Copyright (c) 2013 Andy Atkinson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
