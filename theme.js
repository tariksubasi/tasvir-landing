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

  function init() {
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
