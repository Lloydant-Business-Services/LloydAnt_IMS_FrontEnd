import $ from 'jquery';
import Cookies from 'js-cookie';
var Layout = function() {
        function e() {
            $(".sidenav-toggler").addClass("active");
            $(".sidenav-toggler").data("action", "sidenav-unpin");
            $("body").removeClass("g-sidenav-hidden").addClass("g-sidenav-show g-sidenav-pinned");
            $("body").append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target=' + $("#sidenav-main").data("target") + " />");
            Cookies.set("sidenav-state", "pinned");
        }

        function a() {
            $(".sidenav-toggler").removeClass("active");
            $(".sidenav-toggler").data("action", "sidenav-pin");
            $("body").removeClass("g-sidenav-pinned").addClass("g-sidenav-hidden");
            $("body").find(".backdrop").remove();
            Cookies.set("sidenav-state", "unpinned");
        }
        var t = Cookies.get("sidenav-state") ? Cookies.get("sidenav-state") : "pinned";
        $(window).width() > 1200 && ("pinned" == t && e() && "unpinned" == Cookies.get("sidenav-state") && a()) && $("body").on("click", "[data-action]", function(t) {
            t.preventDefault();
            var n = $(this),
                i = n.data("action");
            n.data("target");
            switch (i) {
                case "sidenav-pin":
                    e();
                    break;
                case "sidenav-unpin":
                    a();
                    break;
                case "search-show":
                    n.data("target");
                    $("body").removeClass("g-navbar-search-show").addClass("g-navbar-search-showing");
                     setTimeout(function() {
                        $("body").removeClass("g-navbar-search-showing").addClass("g-navbar-search-show")
                    }, 150);
                     setTimeout(function() {
                        $("body").addClass("g-navbar-search-shown")
                    }, 300);
                    break;
                case "search-close":
                    n.data("target");
                     $("body").removeClass("g-navbar-search-shown");
                      setTimeout(function() {
                        $("body").removeClass("g-navbar-search-show").addClass("g-navbar-search-hiding")
                    }, 150);
                    setTimeout(function() {
                        $("body").removeClass("g-navbar-search-hiding").addClass("g-navbar-search-hidden")
                    }, 300);
                    setTimeout(function() {
                        $("body").removeClass("g-navbar-search-hidden")
                    }, 500)
            }
        });
        $(".sidenav").on("mouseenter", function() {
            $("body").hasClass("g-sidenav-pinned") || $("body").removeClass("g-sidenav-hide").removeClass("g-sidenav-hidden").addClass("g-sidenav-show")
        });
        $(".sidenav").on("mouseleave", function() {
            $("body").hasClass("g-sidenav-pinned") || ($("body").removeClass("g-sidenav-show").addClass("g-sidenav-hide") &&

            setTimeout(function() {
                $("body").removeClass("g-sidenav-hide").addClass("g-sidenav-hidden")
            }, 300))
        });
        $(window).on("load resize", function() {
            $("body").height() < 800 && ($("body").css("min-height", "100vh") && $("#footer-main").addClass("footer-auto-bottom"))
        })
    }(),
    Navbar = function() {
        var e = $(".navbar-nav, .navbar-nav .nav"),
            a = $(".navbar .collapse"),
            t = $(".navbar .dropdown");
        a.on({
            "show.bs.collapse": function() {
                var t;
                (t = $(this)).closest(e).find(a).not(t).collapse("hide")
            }
        });
        t.on({
            "hide.bs.dropdown": function() {
                var e, a;
                e = $(this); (a = e.find(".dropdown-menu")).addClass("close"); setTimeout(function() {
                    a.removeClass("close")
                }, 200)
            }
        })
    }(),
    NavbarCollapse = function() {
        $(".navbar-nav");
        var e = $(".navbar .navbar-custom-collapse");
        e.length && (e.on({
            "hide.bs.collapse": function() {
                e.addClass("collapsing-out")
            }
        }) &&
        e.on({
            "hidden.bs.collapse": function() {
                e.removeClass("collapsing-out")
            }
        }))
    }(),
    Popover = function() {
        var e = $('[data-toggle="popover"]'),
            a = "";
        e.length && e.each(function() {
            // !function(e) {
            //     e.data("color") && (a = "popover-" + e.data("color"));
            //     var t = {
            //         trigger: "focus",
            //         template: '<div class="popover ' + a + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
            //     };
            //     e.popover(t)
            // }($(this))
        })
    }(),
    ScrollTo = function() {
        var e = $(".scroll-me, [data-scroll-to], .toc-entry a");

        function a(e) {
            var a = e.attr("href"),
                t = e.data("scroll-to-offset") ? e.data("scroll-to-offset") : 0,
                n = {
                    scrollTop: $(a).offset().top - t
                };
            $("html, body").stop(!0, !0).animate(n, 600);
            e.preventDefault()
        }
        e.length && e.on("click", function(e) {
            a($(this))
        })
    }(),
    Tooltip = function() {
        var e = $('[data-toggle="tooltip"]');
        e.length && e.tooltip()
    }(),
    Checklist = function() {
        var e = $('[data-toggle="checklist"]');

        function a(e) {
            e.is(":checked") ? e.closest(".checklist-item").addClass("checklist-item-checked") : e.closest(".checklist-item").removeClass("checklist-item-checked")
        }
        e.length && (e.each(function() {
            $(this).find('.checklist-entry input[type="checkbox"]').each(function() {
                a($(this))
            })
        }) && e.find('input[type="checkbox"]').on("change", function() {
            a($(this))
        }))
    }(),
    FormControl = function() {
        var e = $(".form-control");
        e.length && e.on("focus blur", function(e) {
            $(this).parents(".form-group").toggleClass("focused", "focus" === e.type)
        }).trigger("blur")
    }(),
    color = "#5e72e4";
