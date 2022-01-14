var themes = {
    "light": "/static/css/epub_themes/light.css",
    "dark": "/static/css/epub_themes/dark.css"
};

var dark_mode = window.localStorage.getItem("dark_mode") === "y";
var theme = dark_mode ? "dark" : "light";

var e_css = "<link rel=\"stylesheet\" href=\"/static/css/epub_themes/base_page.css\">";
var e_switch = "<a id=\"theme\" class=\"icon-theme\">✾</a>";

$("head").append(e_css);
$("#title-controls").prepend(e_switch);

reader.rendition.themes.register("light", themes["light"]);
reader.rendition.themes.register("dark", themes["dark"]);
reader.rendition.themes.default(themes[theme]);
switchBasePageTheme(theme);

function switchEpubjsTheme(theme) {
    reader.rendition.themes.select(theme);
    /* There is a bug in epub.js. */
    /* If you select one theme that have selected before, it doesn't work */
    /* The following codes restart the rendition to make it looks like work well */
    /* The related issue: https://github.com/futurepress/epub.js/issues/1208 */
    reader.rendition.clear();
    reader.rendition.start();
}

function switchBasePageTheme(theme) {
    var elements_to_be_modify = "body, #main, #panels, #tocView, #bookmarksView, #sidebar, #titlebar";
    if (theme == "dark")
        $(elements_to_be_modify).addClass("dark");
    else
        $(elements_to_be_modify).removeClass("dark");
}

function switchTheme(theme) {
    switchEpubjsTheme(theme);
    switchBasePageTheme(theme);
}

$("#theme").click(function() {
    dark_mode = !dark_mode;
    switchTheme(dark_mode ? "dark" : "light");
    window.localStorage.setItem("dark_mode", dark_mode ? "y" : "n");
});
