function init(settings) {
  return $('#testing').promoSlide();
}

$(function() {
  test("Defaults and options", function() {
    init();
    equal($.promoSlide._defaults.headerText, "interesting header", "default header text");
    equal($.promoSlide._defaults.bodyText, "an interesting section", "default body text");
    equal($.promoSlide._defaults.templateHTML, '<div class="panel panel-primary"><div class="panel-heading"><a href="#" class="dismiss">&times;</a><h3 class="panel-title">{{header}}</h3></div><div class="panel-body">{{body}}</div></div>', "default HTML template");
    equal($.promoSlide.pollingDelay, 200, "Time to wait before polling for changes, which trigger animations.");
    equal($.promoSlide.dismissedByUser, false, "X to close the container default value");
  });
});
