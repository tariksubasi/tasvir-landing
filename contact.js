(function () {
  var API_BASE = /(^|\.)tasvir\.ai$/.test(window.location.hostname)
    ? "https://srv.tasvir.ai/rest"
    : "http://localhost:8080/rest";
  var SUPPORT_EMAIL = "support@tasvir.ai";
  var isTr = document.documentElement.lang === "tr";

  var t = isTr
    ? {
        title: "Bize ulaşın",
        lead: "Mesajınız doğrudan destek ekibimizin gelen kutusuna düşer. Her mesajı okuyor, e-postanıza yanıt yazıyoruz.",
        email: "E-posta",
        copy: "Kopyala",
        copied: "Kopyalandı",
        reply: "Yanıt süresi",
        replyValue: "1 iş günü içinde",
        hours: "Çalışma saatleri",
        hoursValue: "Pzt–Cum, 09:00–18:00 (GMT+3)",
        orgs: "Okul veya dershane misiniz?",
        orgsLink: "Kurum teklifi ve ücretsiz pilot",
        orgsHref: "/tr/kurumlar/#teklif",
        company: "ULUG Yazılım ve Yapay Zeka Teknolojileri Ltd. Şti. · Ümraniye / İstanbul",
        name: "Adınız",
        emailField: "E-posta adresiniz",
        topic: "Konu",
        topics: ["Genel soru", "Teknik destek", "Fatura ve ödeme", "Okul / kurum", "İş birliği"],
        message: "Mesajınız",
        messagePlaceholder: "Nasıl yardımcı olabiliriz?",
        send: "Mesajı gönder",
        sending: "Gönderiliyor...",
        privacy: "Bilgileriniz yalnızca size yanıt vermek için kullanılır.",
        invalid: "Lütfen geçerli bir e-posta adresi ve mesajınızı yazın.",
        failed: "Mesajınız şu anda gönderilemedi. Yazdıklarınız duruyor; tekrar deneyin ya da doğrudan " + SUPPORT_EMAIL + " adresine yazın.",
        doneTitle: "Mesajınız bize ulaştı",
        doneBody: function (email) {
          return "Yanıtımız " + email + " adresine, " + SUPPORT_EMAIL + " üzerinden gelecek. Genelde bir iş günü içinde dönüyoruz.";
        },
        reference: "Talep numaranız",
        referenceHint: "Tekrar yazarsanız bu numarayı ekleyin, mesajınızı hemen bulalım.",
        again: "Yeni mesaj yaz",
        close: "Kapat",
      }
    : {
        title: "Contact us",
        lead: "Your message lands straight in our support team's inbox. We read every one and reply to your email.",
        email: "Email",
        copy: "Copy",
        copied: "Copied",
        reply: "Reply time",
        replyValue: "Within one business day",
        hours: "Working hours",
        hoursValue: "Mon–Fri, 09:00–18:00 (GMT+3)",
        orgs: "Running a school or tutoring center?",
        orgsLink: "Organization quote and free pilot",
        orgsHref: "/organizations/#quote",
        company: "ULUG Yazılım ve Yapay Zeka Teknolojileri Ltd. Şti. · Istanbul, Türkiye",
        name: "Your name",
        emailField: "Your email",
        topic: "Topic",
        topics: ["General question", "Technical support", "Billing and payment", "School / organization", "Partnership"],
        message: "Your message",
        messagePlaceholder: "How can we help?",
        send: "Send message",
        sending: "Sending...",
        privacy: "Your details are only used to reply to you.",
        invalid: "Please enter a valid email address and your message.",
        failed: "Your message could not be sent right now. What you wrote is still here; try again or write to " + SUPPORT_EMAIL + " directly.",
        doneTitle: "We got your message",
        doneBody: function (email) {
          return "Our reply will reach " + email + " from " + SUPPORT_EMAIL + ". We usually answer within one business day.";
        },
        reference: "Your reference",
        referenceHint: "If you write again, include this number so we can find your message right away.",
        again: "Write another message",
        close: "Close",
      };

  var field =
    "h-11 w-full rounded-xl border border-line bg-page px-3 text-base font-normal text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand";
  var icon = function (path) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mt-0.5 h-5 w-5 shrink-0 text-brand-fg">' +
      path +
      "</svg>"
    );
  };

  var dialog = document.createElement("dialog");
  dialog.id = "tasvir-contact";
  dialog.setAttribute("aria-labelledby", "tasvir-contact-title");
  dialog.className =
    "m-auto max-h-[92svh] w-[min(calc(100%_-_1.5rem),52rem)] overflow-y-auto rounded-3xl border border-line bg-elevated p-0 text-ink shadow-lift backdrop:bg-black/60";
  dialog.innerHTML =
    '<div class="grid md:grid-cols-5">' +
    '<aside class="flex flex-col gap-5 bg-alt p-6 md:col-span-2 md:p-8">' +
    '<div><h2 id="tasvir-contact-title" class="text-2xl font-bold tracking-tight"></h2>' +
    '<p data-c="lead" class="mt-2 text-sm text-muted"></p></div>' +
    '<ul class="flex flex-col gap-4 text-sm">' +
    '<li class="flex gap-3">' + icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>') +
    '<div class="min-w-0"><p data-c="email" class="font-semibold"></p>' +
    '<div class="flex flex-wrap items-center gap-2"><a data-c="mailto" class="inline-flex min-h-11 items-center font-semibold text-brand-fg underline hover:text-ink"></a>' +
    '<button type="button" data-c="copy" class="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-xs font-semibold text-ink transition hover:bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"></button></div></div></li>' +
    '<li class="flex gap-3">' + icon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>') +
    '<div><p data-c="reply" class="font-semibold"></p><p data-c="replyValue" class="text-muted"></p></div></li>' +
    '<li class="flex gap-3">' + icon('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>') +
    '<div><p data-c="hours" class="font-semibold"></p><p data-c="hoursValue" class="text-muted"></p></div></li>' +
    '<li class="flex gap-3">' + icon('<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>') +
    '<div><p data-c="orgs" class="font-semibold"></p><a data-c="orgsLink" class="inline-flex min-h-11 items-center font-semibold text-brand-fg underline hover:text-ink"></a></div></li>' +
    "</ul>" +
    '<p data-c="company" class="mt-auto border-t border-line pt-4 text-xs text-muted"></p>' +
    "</aside>" +
    '<div class="relative p-6 md:col-span-3 md:p-8">' +
    '<button type="button" data-c="closeIcon" class="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" class="h-5 w-5"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
    '<form data-c="form" class="flex flex-col gap-4 pt-8 md:pt-2" novalidate>' +
    '<div class="grid gap-4 sm:grid-cols-2">' +
    '<label class="flex flex-col gap-1 text-sm font-medium"><span data-c="name"></span><input name="name" maxlength="120" autocomplete="name" class="' + field + '"></label>' +
    '<label class="flex flex-col gap-1 text-sm font-medium"><span data-c="emailField"></span><input name="email" type="email" required maxlength="254" autocomplete="email" inputmode="email" class="' + field + '"></label>' +
    "</div>" +
    '<label class="flex flex-col gap-1 text-sm font-medium"><span data-c="topic"></span><select name="subject" data-c="topics" class="' + field + '"></select></label>' +
    '<label class="flex flex-col gap-1 text-sm font-medium"><span data-c="message"></span><textarea name="message" required rows="5" maxlength="4000" data-c="messageField" class="w-full rounded-xl border border-line bg-page px-3 py-2 text-base font-normal text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"></textarea></label>' +
    '<input name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden">' +
    '<button type="submit" data-c="send" class="inline-flex h-12 items-center justify-center rounded-full bg-brand px-6 text-base font-semibold text-white shadow-card transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:opacity-60"></button>' +
    '<p data-c="status" role="status" aria-live="polite" class="text-sm text-muted"></p>' +
    '<p data-c="privacy" class="text-xs text-muted"></p>' +
    "</form>" +
    '<div data-c="done" class="hidden flex-col items-start gap-4 pt-8 md:pt-2" role="status" aria-live="polite">' +
    '<span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-fg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-6 w-6"><path d="m5 12 5 5 9-10"/></svg></span>' +
    '<h3 data-c="doneTitle" class="text-xl font-bold tracking-tight"></h3>' +
    '<p data-c="doneBody" class="text-sm text-muted"></p>' +
    '<div class="w-full rounded-2xl border border-line bg-page p-4"><p data-c="reference" class="text-xs font-semibold uppercase tracking-wide text-muted"></p>' +
    '<p data-c="referenceValue" class="mt-1 font-mono text-2xl font-bold tracking-wider text-ink"></p>' +
    '<p data-c="referenceHint" class="mt-2 text-xs text-muted"></p></div>' +
    '<div class="flex flex-wrap gap-2"><button type="button" data-c="again" class="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-semibold text-ink transition hover:bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"></button>' +
    '<button type="button" data-c="close" class="inline-flex h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"></button></div>' +
    "</div>" +
    "</div>" +
    "</div>";

  var el = function (key) {
    return dialog.querySelector('[data-c="' + key + '"]');
  };
  dialog.querySelector("#tasvir-contact-title").textContent = t.title;
  ["lead", "email", "reply", "replyValue", "hours", "hoursValue", "orgs", "company", "name", "emailField", "topic", "message", "privacy", "doneTitle", "reference", "referenceHint", "again", "close"].forEach(function (key) {
    el(key).textContent = t[key];
  });
  el("mailto").textContent = SUPPORT_EMAIL;
  el("mailto").href = "mailto:" + SUPPORT_EMAIL;
  el("copy").textContent = t.copy;
  el("orgsLink").textContent = t.orgsLink;
  el("orgsLink").href = t.orgsHref;
  el("send").textContent = t.send;
  el("closeIcon").setAttribute("aria-label", t.close);
  el("messageField").placeholder = t.messagePlaceholder;
  t.topics.forEach(function (topic) {
    var option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    el("topics").appendChild(option);
  });
  document.body.appendChild(dialog);

  var form = el("form");
  var done = el("done");
  var status = el("status");
  var send = el("send");

  var showForm = function () {
    done.classList.add("hidden");
    done.classList.remove("flex");
    form.classList.remove("hidden");
    status.textContent = "";
  };
  var open = function () {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      window.location.href = "mailto:" + SUPPORT_EMAIL;
      return;
    }
    var first = form.querySelector("input[name=name]");
    if (first && !done.classList.contains("flex")) first.focus();
  };
  var close = function () {
    dialog.close();
  };

  el("closeIcon").addEventListener("click", close);
  el("close").addEventListener("click", close);
  el("again").addEventListener("click", showForm);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) close();
  });
  el("copy").addEventListener("click", function () {
    var button = el("copy");
    var finish = function () {
      button.textContent = t.copied;
      setTimeout(function () {
        button.textContent = t.copy;
      }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(SUPPORT_EMAIL).then(finish, function () {});
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = String(value || "").trim();
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "") || !data.message) {
      status.textContent = t.invalid;
      return;
    }

    var showDone = function (reference) {
      el("doneBody").textContent = t.doneBody(data.email);
      el("referenceValue").textContent = reference;
      form.reset();
      form.classList.add("hidden");
      done.classList.remove("hidden");
      done.classList.add("flex");
      el("close").focus();
    };
    if (data.website) {
      showDone("TSV-" + Math.random().toString(16).slice(2, 10).toUpperCase());
      return;
    }

    send.disabled = true;
    send.textContent = t.sending;
    status.textContent = "";
    fetch(API_BASE + "/tasvir-noauth/v1/account/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        source: "landing:" + window.location.pathname,
        clientLanguage: isTr ? "tr" : "en",
      }),
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
        if (!result.ok || !result.body || !result.body.reference) {
          var serverMessage = result.body && result.body.error && result.body.error.message;
          status.textContent = isTr && serverMessage ? serverMessage : t.failed;
          return;
        }
        showDone(result.body.reference);
        if (typeof window.plausible === "function") {
          window.plausible("contact_sent", { props: { topic: data.subject } });
        }
      })
      .catch(function () {
        status.textContent = t.failed;
      })
      .then(function () {
        send.disabled = false;
        send.textContent = t.send;
      });
  });

  var navActions = document.querySelector("header nav > div:last-child");
  if (navActions) {
    var navButton = document.createElement("button");
    navButton.type = "button";
    navButton.setAttribute("data-contact-open", "");
    navButton.className =
      "hidden h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink transition hover:bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:inline-flex";
    navButton.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-4 w-4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
    navButton.appendChild(document.createTextNode(isTr ? "İletişim" : "Contact"));
    navActions.insertBefore(navButton, navActions.firstChild);
  }
  var menu = document.querySelector("[data-nav-menu] > div");
  if (menu) {
    var menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.setAttribute("data-contact-open", "");
    menuButton.className =
      "flex min-h-11 items-center rounded-xl px-3 text-left text-sm font-medium text-ink transition hover:bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand";
    menuButton.textContent = isTr ? "İletişim · Bize ulaşın" : "Contact us";
    menu.appendChild(menuButton);
  }
  document.querySelectorAll('footer a[href^="mailto:' + SUPPORT_EMAIL + '"]').forEach(function (link) {
    link.setAttribute("data-contact-open", "");
  });

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest && event.target.closest("[data-contact-open]");
    if (!trigger) return;
    event.preventDefault();
    var menu = trigger.closest("details");
    if (menu) menu.removeAttribute("open");
    open();
  });

  if (window.location.hash === "#iletisim" || window.location.hash === "#contact") open();
})();
