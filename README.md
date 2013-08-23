Promo Slide is a jQuery plugin to slide out some promotional content from the bottom right of the screen, when the user scrolls down. This (sometimes annoying) pattern is showing up on more and more sites, so I thought it would be nice to make a plugin for the pattern that was generic and had some customization points, so that other websites could use it.

Demo
====
[http://andyatkinson.com/projects/promoSlide](http://andyatkinson.com/projects/promoSlide)

Usage
=====
On your HTML page after you have included the plugin and the DOM is ready (refer to `index.html` for an example):

    $('body').promoSlide();

Or if you want to override some defaults:

    $('body').promoSlide({
      textContent: 'customize me!!',
      templateHTML: '<p class="one-line-text" style="color:red;">{{content}}</p>'
    });
    

Contributing
============
Have an idea for something this should do? Please send me a message with the idea or even better, a pull request with the code. If you want to contribute a design that would be great as well.

MIT License
===
Copyright (c) 2013 Andy Atkinson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.