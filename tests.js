QUnit.config.autostart = false;

$(function() {
  // multiple containers can be on the page but they clobber each other, last one in wins.
  test("Defaults and options", function() {
    $("#testing").promoSlide();
    equal($.promoSlide.settings.headerText, "interesting header", "default header text");
    equal($.promoSlide.settings.bodyText, "an interesting section", "default body text");
    equal($.promoSlide.settings.templateHTML, '<div class="panel panel-primary"><div class="panel-heading"><a href="#" class="dismiss">&times;</a><h3 class="panel-title">{{header}}</h3></div><div class="panel-body">{{body}}</div></div>', "default HTML template");
    equal($.promoSlide.pollingDelay, 200, "Time to wait before polling for changes, which trigger animations.");
    equal($.promoSlide.dismissedByUser, false, "X to close the container default value");
  });
  test("override defaults", function() {
    $("#page-example").promoSlide({
       headerText: "Read more from my blog",
       bodyText: "Latest article: <a href='#'>10 Blogging Tips</a>"
    });
    equal($.promoSlide.settings.headerText, "Read more from my blog");
    equal($.promoSlide.settings.bodyText, "Latest article: <a href='#'>10 Blogging Tips</a>");
    // the second invocation (overrides) seems to be bound
    // by the time this test runs, so use its output
    var expectedHTML = "<div class='promo-slide-container'>" +
                          "<div class=\"panel panel-primary\">" +
                            "<div class=\"panel-heading\">" +
                               "<a href=\"#\" class=\"dismiss\">&times;</a>" +
                               "<h3 class=\"panel-title\">Read more from my blog</h3></div>" +
                               "<div class=\"panel-body\">Latest article: <a href='#'>10 Blogging Tips</a></div>" +
                            "</div></div>";
    equal($.promoSlide.templateContent(), expectedHTML);
  });
});

$(function() {
  start();
});
