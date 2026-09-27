(function () {
  var KEY = "tasvir:theme";

  function isDark() {
    return document.documentElement.classList.contains("dark");
  }

  function apply(dark) {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", dark ? "#1e1f20" : "#ffffff");
    }
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      var darkLabel = btn.getAttribute("data-label-dark") || "";
      var lightLabel = btn.getAttribute("data-label-light") || "";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? lightLabel : darkLabel);
    });
  }

  // <details> opens and closes by itself; this only adds the closing paths a
  // menu is expected to have (outside tap, Escape, choosing a link).
  function initMenus() {
    var menus = document.querySelectorAll("[data-nav-menu]");
    if (!menus.length) return;

    function sync(menu) {
      var summary = menu.querySelector("summary");
      if (summary) summary.setAttribute("aria-expanded", menu.open ? "true" : "false");
    }

    menus.forEach(function (menu) {
      sync(menu);
      menu.addEventListener("toggle", function () {
        sync(menu);
      });
      menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          menu.open = false;
        });
      });
    });

    document.addEventListener("click", function (event) {
      menus.forEach(function (menu) {
        if (menu.open && !menu.contains(event.target)) menu.open = false;
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      menus.forEach(function (menu) {
        if (!menu.open) return;
        menu.open = false;
        var summary = menu.querySelector("summary");
        if (summary) summary.focus();
      });
    });
  }

  function init() {
    initMenus();
    var stored = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch (e) {}
    apply(stored === "dark");

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = !isDark();
        try {
          window.localStorage.setItem(KEY, next ? "dark" : "light");
        } catch (e) {}
        apply(next);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
