jQuery.fn.slideRightHide = (speed, callback) ->
  this.animate({
    width: "hide",
    paddingLeft: "hide",
    paddingRight: "hide",
    marginLeft: "hide",
    marginRight: "hide"
  }, speed, callback)

jQuery.fn.slideLeftShow = (speed, callback) ->
  this.animate({
    width: "show",
    paddingLeft: "show",
    paddingRight: "show",
    marginLeft: "show",
    marginRight: "show"
  }, speed, callback)

(($) ->
  PromoSlide = (element, options) ->
    templateHeaderRegexp = /\{\{header\}\}/
    templateBodyRegexp = /\{\{body\}\}/
    dismissedByUser = false
    pollingDelay = 200

    settings = $.extend({
      headerText: 'interesting header',
      bodyText: 'an interesting section',
      templateHTML: '<div class="panel panel-primary">' +
                      '<div class="panel-heading">' +
                        '<a href="#" class="dismiss">&times;</a>' +
                        '<h3 class="panel-title">{{header}}</h3>' +
                      '</div>' +
                      '<div class="panel-body">{{body}}</div>' +
                    '</div>'
    }, options || {})

    # private methods, e.g. var privateMethod = fn
    checkForBrowserScrollbar = ->
      return null if (window.innerHeight > document.body.offsetHeight)

    templateContent = ->
      parts = []
      html = ''
      parts.push "<div class='promo-slide-container'>"
      if (templateHeaderRegexp.test(settings.templateHTML) && templateBodyRegexp.test(settings.templateHTML))
        html = settings.templateHTML.replace(templateHeaderRegexp, settings.headerText)
        html = html.replace(templateBodyRegexp, settings.bodyText)
        parts.push html
      parts.push "</div>"
      parts.join('')

    populateContainerContent = ->
      element.append(templateContent())
      container = element.find(".promo-slide-container")
      container.hide()
      handleScrollEvents(container)
      handleClickEvents(container)

    handleScrollEvents = (container) ->
      setInterval () ->
        scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight
        containerIsVisible = container.is(":visible")
        scrollPositionNearBottom = (window.innerHeight + window.scrollY) / document.body.offsetHeight * 100 <= 75

        container.slideLeftShow(200) if (scrolledToBottom && !containerIsVisible && !dismissedByUser)
        container.slideRightHide(200) if (!scrolledToBottom && containerIsVisible && scrollPositionNearBottom)
      , pollingDelay

    handleClickEvents = (container) ->
      link = container.find('a.dismiss')
      $(link).bind 'click', (e) ->
        e.preventDefault()
        dismissedByUser = true
        container.slideRightHide(200)

    # public methods, e.g. this.publicMethod = fn
    this.settings = settings
    this.pollingDelay = 200
    this.dismissedByUser = dismissedByUser
    this.templateContent = ->
      templateContent()

    # init the plugin
    checkForBrowserScrollbar()
    populateContainerContent()
    return null

  $.fn.promoSlide = (options) ->
    return this.each () ->
      element = $(this)
      return null if (element.data("hasPromoSlide"))
      $.promoSlide = new PromoSlide(element, options)
      element.data("hasPromoSlide", true)
      return null

)(jQuery)
