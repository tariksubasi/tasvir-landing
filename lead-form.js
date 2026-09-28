(function () {
  var API_BASE = /(^|\.)tasvir\.ai$/.test(window.location.hostname)
    ? "https://srv.tasvir.ai/rest"
    : "http://localhost:8080/rest";
  var MESSAGES = {
    tr: {
      invalid: "Lütfen kurum adını ve geçerli bir e-posta adresini yazın.",
      sending: "Gönderiliyor...",
      done: "Talebiniz alındı. En geç bir iş günü içinde e-postanıza dönüyoruz.",
      failed:
        "Talebiniz şu anda gönderilemedi. Bilgileriniz formda duruyor; tekrar deneyin ya da support@tasvir.ai adresine yazın.",
    },
    en: {
      invalid: "Please enter your organization's name and a valid email address.",
      sending: "Sending...",
      done: "We got your request and will reply to your email within one business day.",
      failed:
        "Your request could not be sent right now. Your details are still in the form; try again or write to support@tasvir.ai.",
    },
  };
  var t = MESSAGES[document.documentElement.lang === "tr" ? "tr" : "en"];

  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    var status = form.querySelector("[data-lead-status]");
    var submit = form.querySelector("button[type=submit]");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = String(value || "").trim();
      });
      if (!data.organizationName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "")) {
        status.textContent = t.invalid;
        return;
      }
      data.source = form.getAttribute("data-source") || "landing";
      submit.disabled = true;
      status.textContent = t.sending;

      fetch(API_BASE + "/tasvir-noauth/v1/organization/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json().then(
            function (body) {
              return { ok: response.ok, body: body };
            },
            function () {
              return { ok: response.ok, body: null };
            }
          );
        })
        .then(function (result) {
          if (!result.ok) {
            var serverMessage = result.body && result.body.error && result.body.error.message;
            status.textContent = serverMessage && t === MESSAGES.tr ? serverMessage : t.failed;
            submit.disabled = false;
            return;
          }
          form.reset();
          status.textContent = t.done;
          submit.disabled = false;
          if (typeof window.plausible === "function") {
            window.plausible("org_lead_sent", { props: { source: data.source, kind: data.kind } });
          }
        })
        .catch(function () {
          status.textContent = t.failed;
          submit.disabled = false;
        });
    });
  });
})();
