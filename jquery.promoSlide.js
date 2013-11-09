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
    templateHTML: '<div class="panel panel-primary">' +
                    '<div class="panel-heading">' +
                      '<a href="#" class="dismiss">&times;</a>' +
                      '<h3 class="panel-title">{{header}}</h3>' +
                    '</div>' +
                    '<div class="panel-body">{{body}}</div>' +
                  '</div>'
  };
}

$.extend(PromoSlide.prototype, {
  
  markerClassName: 'hasPromoSlidePlugin',
  templateHeaderRegexp: /\{\{header\}\}/,
  templateBodyRegexp: /\{\{body\}\}/,
  dismissedByUser: false, /* this could be written out to a cookie */
  pollingDelay: 200,
  
  setDefaults: function(settings) {
    $.extend(this._defaults, settings || {});
    return this;
  },
  
  _attachPromoSlidePlugin: function(target, settings) {
    target = $(target);
    if (target.hasClass(this.markerClassName)) {
      // prevent binding twice
      return;
    }
    target.addClass(this.markerClassName);
    var instance = {settings: $.extend({}, this._defaults)};
    $.data(target[0], PROP_NAME, instance);

    if (window.innerHeight > document.body.offsetHeight) {
      /* There are no scroll bars, exiting. */
      return;
    }
    
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
    
    this._stylePromoContainer(element, settings);
    this._handleEvents(c);
  },

  _stylePromoContainer: function(element, settings) {
    var instance = $.data(element[0], PROP_NAME);
    $.extend(instance.settings, settings);
    /* TODO additional style customizations */  
  },
  
  _handleEvents: function(container) {
    var self = this;
    setInterval(function() {
      var scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight,
          containerIsVisible = container.is(":visible"),
          scrollPositionNearBottom = (window.innerHeight + window.scrollY) / document.body.offsetHeight * 100 <= 75;
   
      if (scrolledToBottom && !containerIsVisible && !self.dismissedByUser) {
        container.slideLeftShow(200);
      } else if (!scrolledToBottom && containerIsVisible && scrollPositionNearBottom) {
        container.slideRightHide(200);
      }
    }, self.pollingDelay);
    
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
