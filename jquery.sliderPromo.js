jQuery.fn.slideRightHide = function(speed, callback) { 
  this.animate({ 
    width: "hide", 
    paddingLeft: "hide", 
    paddingRight: "hide", 
    marginLeft: "hide", 
    marginRight: "hide" 
  }, speed, callback);
};

jQuery.fn.slideLeftShow = function(speed, callback) { 
  this.animate({ 
    width: "show", 
    paddingLeft: "show", 
    paddingRight: "show", 
    marginLeft: "show", 
    marginRight: "show" 
  }, speed, callback);
};

(function($) { 
  
  var PROP_NAME = 'sliderPromo';
  
function SliderPromo() {
  this._defaults = {
    textContent: 'placeholder content',
    templateHTML: '<p class="one-line-text">{{content}}</p>'
  };
}

$.extend(SliderPromo.prototype, {
  
  markerClassName: 'hasSliderPromoPlugin',
  templateContentRegexp: /\{\{content\}\}/,
  
  setDefaults: function(settings) {
    $.extend(this._defaults, settings || {});
    return this;
  },
  
  _attachSliderPromoPlugin: function(target, settings) {
    target = $(target);
    if (target.hasClass(this.markerClassName)) {
      return;
    }
    target.addClass(this.markerClassName);
    var instance = {settings: $.extend({}, this._defaults)};
    $.data(target[0], PROP_NAME, instance);
    this._populatePromoContainer(target, settings);
  },
  
  _populatePromoContainer: function(element, settings) {
    var instance = $.data(element[0], PROP_NAME);
    $.extend(instance.settings, settings);
    
    var templateMarkupParts = [];
    templateMarkupParts.push("<div id='sliderPromoContainer' class='promo-container'>");
    
    if (this.templateContentRegexp.test(instance.settings.templateHTML)) {
      templateMarkupParts.push(instance.settings.templateHTML.replace(this.templateContentRegexp, instance.settings.textContent));
    }
    templateMarkupParts.push("</div>");

    $(element).append(templateMarkupParts.join(''));
    var c = $("#sliderPromoContainer");
    c.hide();
    
    $(window).bind('scroll', function() {
      if ($(window).scrollTop() > 300 && !(c.is(":visible"))) {
        c.slideLeftShow();
      } else if ($(window).scrollTop() < 300 && c.is(":visible")) {
        c.slideRightHide();
      }
    });
  }
});

var getters = ['settings'];

$.fn.sliderPromo = function(options) {
  var otherArgs = Array.prototype.slice.call(arguments, 1);
  if ($.inArray(options, getters) > -1) {
    return $.sliderPromo['_' + options + 'SliderPromo'].
      apply($.sliderPromo, [this[0]].concat(otherArgs));
  }
  return this.each(function() {
    if (typeof options == 'string') {
      $.sliderPromo['_' + options + 'SliderPromo'].
        apply($.sliderPromo, [this].concat(otherArgs));
    }
    else {
      $.sliderPromo._attachSliderPromoPlugin(this, options || {});
    }
  });
};

$.sliderPromo = new SliderPromo();

})(jQuery);