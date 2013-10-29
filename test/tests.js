function init(settings) {
  return $('#testing').promoSlide();
}

$(function() {
  test("Defaults and options", function() {
    init();
    equal($.promoSlide._defaults.headerText, "interesting header");
    equal($.promoSlide._defaults.bodyText, "an interesting section");
    equal($.promoSlide._defaults.headerBackgroundColor, "#fff");
    equal($.promoSlide._defaults.headerTextColor, "#000");
    equal($.promoSlide._defaults.hideByDefault, true);
  });
});
