// Share view for the Nearloop digital card: one QR code at a time,
// native share where the browser has it, copy link everywhere.
(function () {
  "use strict";

  var TARGETS = {
    card: {
      url: "https://card.nearloop.ca/",
      display: "CARD.NEARLOOP.CA",
      headline: "Scan to save my contact",
      support: "Opens my digital card with one-tap save.",
      title: "Abdullah Al Mneni · Founder, Nearloop",
    },
    website: {
      url: "https://nearloop.ca/",
      display: "NEARLOOP.CA",
      headline: "Scan to see how Nearloop works",
      support: "Find the right setup for your business.",
      title: "Nearloop",
    },
  };

  var dialog = document.getElementById("share");
  var status = document.getElementById("status");
  var copyLabel = document.getElementById("copy-label");
  var shareBtn = document.getElementById("share-link");
  var mode = "card";
  var canShare = typeof navigator.share === "function";

  if (canShare) {
    shareBtn.hidden = false;
    document.querySelector(".share-actions").classList.add("two");
  }

  function setStatus(text) {
    status.textContent = text;
    copyLabel.textContent = text === "Link copied" ? "Copied" : "Copy link";
  }

  function setMode(next) {
    mode = next;
    var t = TARGETS[mode];
    document.getElementById("share-title").textContent = t.headline;
    document.getElementById("share-support").textContent = t.support;
    document.getElementById("share-url").textContent = t.display;
    document.querySelectorAll(".toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.mode === mode));
    });
    // The QR codes are SVG elements, which have no `hidden` property: toggle the attribute.
    document.querySelectorAll(".qr").forEach(function (q) {
      q.toggleAttribute("hidden", q.dataset.qr !== mode);
    });
    setStatus("");
  }

  function copyLink() {
    var url = TARGETS[mode].url;
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      setStatus("Copy this link: " + url);
      return Promise.resolve();
    }
    return navigator.clipboard.writeText(url).then(
      function () { setStatus("Link copied"); },
      function () { setStatus("Copy this link: " + url); }
    );
  }

  document.getElementById("open-share").addEventListener("click", function () {
    setMode("card");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  });
  document.getElementById("close-share").addEventListener("click", function () {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  });
  document.querySelectorAll(".toggle button").forEach(function (b) {
    b.addEventListener("click", function () { setMode(b.dataset.mode); });
  });
  document.getElementById("copy-link").addEventListener("click", copyLink);
  shareBtn.addEventListener("click", function () {
    var t = TARGETS[mode];
    navigator.share({ title: t.title, url: t.url }).catch(function (err) {
      if (!err || err.name !== "AbortError") copyLink();
    });
  });
})();
