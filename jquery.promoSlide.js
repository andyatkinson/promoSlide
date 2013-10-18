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
  
  var PROP_NAME = 'promoSlide';
  
function PromoSlide() {
  this._defaults = {
    headerText: 'interesting header',
    bodyText: 'an interesting section',
    templateHTML: '<div id="promoSlideTemplate">' +
                    '<a href="#" class="dismiss"><div class="close-icon"></div></a>' +
                    '<div class="top"><h1>{{header}}</h1></div>' +
                    '<div class="bottom"><p class="content">{{body}}</p>' +
                    '<a href="#" class="dismiss">dismiss</a></div>' +
                  '</div>'
  };
}

$.extend(PromoSlide.prototype, {
  
  markerClassName: 'hasPromoSlidePlugin',
  templateHeaderRegexp: /\{\{header\}\}/,
  templateBodyRegexp: /\{\{body\}\}/,
  dismissedByUser: false,
  
  setDefaults: function(settings) {
    $.extend(this._defaults, settings || {});
    return this;
  },
  
  _attachPromoSlidePlugin: function(target, settings) {
    if (window.innerHeight > document.body.offsetHeight) {
      // no scroll bars, exiting.
      return;
    }
    
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
    
    var templateMarkupParts = [], tempHTML = '';
    
    templateMarkupParts.push("<div id='promoSlideContainer' class='promo-slide-container'>");
    
    if (this.templateHeaderRegexp.test(instance.settings.templateHTML) && this.templateBodyRegexp.test(instance.settings.templateHTML)) {
      tempHTML = instance.settings.templateHTML.replace(this.templateHeaderRegexp, instance.settings.headerText);
      tempHTML = tempHTML.replace(this.templateBodyRegexp, instance.settings.bodyText);
      templateMarkupParts.push(tempHTML);
    }
    
    templateMarkupParts.push("</div>");

    $(element).append(templateMarkupParts.join(''));
    var c = $("#promoSlideContainer");
    c.hide();
    
    this._handleEvents(c);
  },
  
  _handleEvents: function(container) {
    var self = this;
    setInterval(function() {
      var scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight,
          containerIsVisible = container.is(":visible"),
          scrollPositionNearBottom = (window.innerHeight + window.scrollY) / document.body.offsetHeight * 100 <= 75;
   
      if (scrolledToBottom && !containerIsVisible && !self.dismissedByUser) {
        container.slideLeftShow();
      } else if (!scrolledToBottom && containerIsVisible && scrollPositionNearBottom) {
        container.slideRightHide();
      }
    }, 500);
    
    var c = $(container),
        link = c.find('a.dismiss');
    $(link).bind('click', function(e) {
      e.preventDefault();
      self.dismissedByUser = true;
      c.slideRightHide();
    });
  }
});

var getters = ['settings'];

$.fn.promoSlide = function(options) {
  var otherArgs = Array.prototype.slice.call(arguments, 1);
  if ($.inArray(options, getters) > -1) {
    return $.promoSlide['_' + options + 'promoSlide'].
      apply($.promoSlide, [this[0]].concat(otherArgs));
  }
  return this.each(function() {
    if (typeof options == 'string') {
      $.promoSlide['_' + options + 'promoSlide'].
        apply($.promoSlide, [this].concat(otherArgs));
    }
    else {
      $.promoSlide._attachPromoSlidePlugin(this, options || {});
    }
  });
};

$.promoSlide = new PromoSlide();

})(jQuery);
