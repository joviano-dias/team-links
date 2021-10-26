window.onload = function () {
    document.getElementById("search_box").focus();
};

function searchApp() {
    let input, i, txtValue;
    input = $("#search_box").val().toUpperCase();
    let appLi = document.querySelectorAll("#app_li");

    for (i = 0; i < appLi.length; i++) {
        let appNameSpan = appLi[i].getElementsByTagName("span").item(0);
        txtValue = appNameSpan.textContent || appNameSpan.innerText;

        if (txtValue.toUpperCase().indexOf(input) > -1) {
            appLi[i].style.display = "block";
        } else {
            appLi[i].style.display = "none";
        }
    }

    let first_result = document.querySelector("#app_li[style=\"display: block;\"] div:nth-child(2) > a")
    if (input.value === "" || first_result == null) {
        document.querySelector("#sipper").innerHTML
            = "";
        document.querySelector("#go_to_url").innerHTML
            = "";
    } else {
        document.querySelector("#sipper").innerHTML
            = "Press ↵ to go to";
        document.querySelector("#go_to_url").innerHTML
            = first_result;
    }

}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function themeActivateDropdown() {
    document.getElementById("themeDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function copyToClipboard(copyText) {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText).then(function () {
    }, function () {
        console.log("Failed to copy!")
    });
}

$(document).ready(function () {

    $(".themer").ready(function () {
        let supported_themes = []
        let $css_theme_file=$('link[theme-file="yes"]')
        let theme_button = $('.dropbtn')
        supported_themes = $(".themer").attr("themes-list")

        theme_button.html($css_theme_file.attr('href').replace("themes/","").split('.').slice(0, -1).join('.'))

        let local_stored_theme = localStorage.getItem('theme')
        if(supported_themes.includes(local_stored_theme)) {

            theme_button.html(local_stored_theme)
            $css_theme_file.attr('href','themes/' + local_stored_theme + '.css')
        }
    })

    $(".theme-item").on('click',function () {
        let theme_file = $(this).attr('theme-filename')

        var $css_theme_file=$('link[theme-file="yes"]')
        $css_theme_file.attr('href','themes/' + theme_file + '.css')
        $('.dropbtn').html(theme_file)
        localStorage.setItem('theme',theme_file)
    })

    function tog(v){return v?'addClass':'removeClass';}

    $(document).on('input', '.search-box', function(){
        $(this)[tog(this.value)]('x');
    }).on('mousemove', '.x', function( e ){
        $(this)[tog(this.offsetWidth-30 < e.clientX-this.getBoundingClientRect().left)]('onX');
    }).on('click', '.onX', function(){
        $(this).removeClass('x onX').val('');
        searchApp()
    });

    $(".copyclip").on('click', function () {
        copyToClipboard($(this).text())
        var $clicked_el = $(this)
        var original_html = $(this).html()

        $clicked_el.html('[Copied]&nbsp;&nbsp;' + original_html)
        $clicked_el.effect("bounce", "slow");
        setTimeout(function () {
            $clicked_el.html(original_html)
        }, 1600);

    })

    $("#search_box").on('keydown focusin', function (event) {
        if (event.type === "keydown") {
            if (event.keyCode === 13 && $(this).val() !== "") {
                $("#application").find('li:visible:first').find(".app").first().click()
            }
        } else if (event.type === "focusin") {
            let input;
            input = $("#search_box");

            let first_result = $("#app_li[style=\"display: block;\"] div:nth-child(2) > a").attr("href");
            if (input.value === "" || first_result == null) {
                $("#sipper").text("");
                $("#go_to_url").text("");
            } else {
                $("#sipper").text("Press ↵ to go to");
                $("#go_to_url").text("<a href=" + first_result + ">" + first_result + "</a>");
            }
        }
    });

    $('#original').click(function (){
        $('link[href="style2.css"]').attr('href','style1.css');
    });

    $(".app_details_text_area").each(function () {

        var val_with_links = $(this).text().replace(/(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi, function () {
            return '<a href="' + arguments[2] + '" target="_blank">' + (arguments[7] || arguments[2]).replace(/[.,;]+$/,'') + '</a>'
        });
        $(this).html(val_with_links);
    })

    var timer_appurl_hover;
    $("a.app_url").hover(function () {
        var $appurl = $(this)

        if(!$appurl.hasClass("app_url_link_active")) {
            clearTimeout(timer_appurl_hover);
            timer_appurl_hover = setTimeout(function () {
                expandOnHover($appurl)
            }, 300)
        }
    }, function () {
        clearTimeout(timer_appurl_hover);
        // timer_app_hover = setTimeout(function() {
        //     // Mouse Out
        // }, 1000);
    });

    $(".app-info").on('click dblclick', function (event) {
        event.stopPropagation()
    })

    // var timer_app_hover;
    // $(".app").hover(function () {
    //     var $app = $(this)
    //
    //     clearTimeout(timer_app_hover);
    //     timer_app_hover = setTimeout(function () {
    //
    //         if ($app.attr("active") !== "yes") {
    //             $app.find('#app_info_box').slideToggle("fast", "swing", function () {
    //                 // Animation complete.
    //                 $app.attr("active", "yes")
    //             });
    //         }
    //     }, 900);
    // }, function () {
    //     clearTimeout(timer_app_hover);
    //     // timer_app_hover = setTimeout(function() {
    //     //     // Mouse Out
    //     // }, 1000);
    // });

    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    function adjust(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }

    $(".app").click(function () {
        var $app = $(this)
        var div_color = rgb2hex($(this).css("background-color"))
        $(this).effect("highlight", { color: adjust(div_color, +20) })
        // clearTimeout(timer_app_hover);

        //hide all
        // $(".app").each(function () {
        //     if($(this).attr("active") === "yes") {
        //         $(this).find('#app_info_box').slideToggle( "slow",function () {
        //             // $(this).attr("active", "no")
        //         })
        //         $(this).attr("active", "no")
        //
        //     }
        // })
        // $(".app").each(function () {
        //     if($(this).attr("active") === "yes") {
        //         // $(this).find('#app_info_box').slideToggle( "slow",function () {
        //         //     // $(this).attr("active", "no")
        //         // })
        //         $(this).attr("active", "no")
        //
        //     }
        // })

        //show clicked
        $(this).find('#app_info_box').slideToggle("fast", "swing", function () {
            // Animation complete.
            if ($app.attr("active") !== "yes") {
                $app.attr("active", "yes")
            } else {
                $app.attr("active", "no")
            }
        });
    })

    function expandOnHover($appurl) {
        if (!$appurl.hasClass("app_url_link_active")) {

            $appurl.parent().find("a.app_url").each(function () {
                $(this).removeClass("app_url_link_active")
            })

            $appurl.addClass("app_url_link_active")

            let parent_div = $appurl.parent().closest('div#app_info_box')

            $(parent_div).find('.app_details_notes').each(function () {
                $(this).stop(true, true).slideUp("fast");
            })

            $(parent_div).find('.app_details_login').each(function () {
                $(this).stop(true, true).slideUp("fast");
            })

            let show_divs_linked_to = $appurl.attr("divdisplayid")
            $('div[divdisplayid="' + show_divs_linked_to + '"]').each(function () {
                $(this).slideDown("slow")
            })
        }

    }
    $("a:not(.themelink)").on("focusin mouseenter mouseleave", function (event) {
        let link = $(this).attr("href");
        let event_type = event.type;

        if (event_type === "focusin") {
            $("#sipper").text("Press ↵ to go to");
            $("#go_to_url").html("<a href=" + link + ">" + link + "</a>");

            if ($(this).hasClass("app_url")) {
                var $appurl = $(this)
                expandOnHover($appurl)
            }

        } else if (event_type === "mouseenter") {
            $("#sipper").text("Link trails");
            // $("#go_to_url").html(link);
            $("#go_to_url").html("<a href=" + link + ">" + link + "</a>");
        } else if (event_type === "mouseleave") {
            // if ($('a').is(':focus')) {
            //     $("#sipper").text("Press ↵ to go to");
            //     $("#go_to_url").text(link);
            // } else {
            //     $("#sipper").text("");
            //     $("#go_to_url").html("");
            // }
        }
    });

    $("#my_div_button").click(function () {
        window.location = $(this).find("a").attr("href");
        return false;
    });


});

