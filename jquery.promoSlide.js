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
  var PromoSlide = function(element, options) {
    var templateHeaderRegexp = /\{\{header\}\}/;
    var templateBodyRegexp = /\{\{body\}\}/;
    var dismissedByUser = false; /* this could be written out to a cookie */
    var pollingDelay = 200;

    var settings = $.extend({
      headerText: 'interesting header',
      bodyText: 'an interesting section',
      templateHTML: '<div class="panel panel-primary">' +
                      '<div class="panel-heading">' +
                        '<a href="#" class="dismiss">&times;</a>' +
                        '<h3 class="panel-title">{{header}}</h3>' +
                      '</div>' +
                      '<div class="panel-body">{{body}}</div>' +
                    '</div>'
    }, options || {});

    // public methods, e.g. this.publicMethod = fn
    this.settings = settings;
    this.pollingDelay = 200;
    this.dismissedByUser = dismissedByUser;

    // private methods, e.g. var privateMethod = fn
    var checkForBrowserScrollbar = function() {
      if (window.innerHeight > document.body.offsetHeight) {
        return null; // exit if there are no scroll bars
      }
    };

    var populateContainerContent = function() {
      var templateMarkupParts = [], tempHTML = '';
      templateMarkupParts.push("<div class='promo-slide-container'>");

      if (templateHeaderRegexp.test(settings.templateHTML) && templateBodyRegexp.test(settings.templateHTML)) {
        tempHTML = settings.templateHTML.replace(templateHeaderRegexp, settings.headerText);
        tempHTML = tempHTML.replace(templateBodyRegexp, settings.bodyText);
        templateMarkupParts.push(tempHTML);
      }
      templateMarkupParts.push("</div>");

      element.append(templateMarkupParts.join(''));
      var container = element.find(".promo-slide-container");
      container.hide();
      handleUserEvents(container);
    };

    var handleUserEvents = function(container) {
      // TODO handle scroll separate from clicks, on dismiss, remove the interval
      setInterval(function() {
        var scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight,
            containerIsVisible = container.is(":visible"),
            scrollPositionNearBottom = (window.innerHeight + window.scrollY) / document.body.offsetHeight * 100 <= 75;

        if (scrolledToBottom && !containerIsVisible && !dismissedByUser) {
          container.slideLeftShow(200);
        } else if (!scrolledToBottom && containerIsVisible && scrollPositionNearBottom) {
          container.slideRightHide(200);
        }
      }, pollingDelay);

      var c = $(container), link = c.find('a.dismiss');
      $(link).bind('click', function(e) {
        e.preventDefault();
        dismissedByUser = true;
        c.slideRightHide(200);
      });
    };

    // init
    checkForBrowserScrollbar();
    populateContainerContent();
  };

  $.fn.promoSlide = function(options) {
    return this.each(function() {
      var element = $(this);

      // return early if plugin has already been bound
      if (element.data("hasPromoSlide")) return null;

      $.promoSlide = new PromoSlide(element, options);

      element.data("hasPromoSlide", true);
      return null;
    });
  };

})(jQuery);
