/* =================== HELPERS =================== */
function q(x) {
  return document.querySelector(x);
}

function qA(x) {
  return document.querySelectorAll(x);
}

function log(msg, lvl = 1, info = null) {
  /* msg: debugging message
     lvl: 1 = info, 2 = warning, 3 = error, 4 = fatal
  */
  switch (lvl) {
    case 1:
      var color = "color:green";
      break;
    case 2:
      var color = "color:yellow";
      break;
    case 3:
      var color = "color:orange";
      break;
    case 4:
      var color = "color:red";
      break;
    default:
      var color = "color:green";
      break;
  }
  console.log("[Debug-Log] =========== START ==========");
  console.log("[Debug-Log] Message: %c%s", color, msg);
  if (!!info) {
    console.log("[Debug-Log] Additional information: ", info);
  }
  console.log("[Debug-Log] =========== END ==========");
}

function dirname(path) {
  return path.match(/.*\//);
}

/* ============ SMOOTH SCROLL =================== */
var scroll = new SmoothScroll('a[href*="#"]', {
  easing: "easeInOutQuad",
  // header: "[navbar]",
  offset: function (anchor, toggle) {
    var anchor = toggle.getAttribute("href");

    switch (anchor) {
      case "#home":
        return 0;
      case "#service":
        return 60;
      default:
        return 50;
    }
  },
});

(function () {
  /* =================== HEADER =================== */
  window.onscroll = function () {
    var currentWindowPos =
      document.documentElement.scrollTop || document.body.scrollTop;
    currentWindowPos > 0
      ? q("#navbar").classList.add("scrolled")
      : q("#navbar").classList.remove("scrolled");
  };

  /* =================== THEME =================== */
  var _light = true;

  function theme() {
    var theme = localStorage.getItem("theme");

    if (theme === "dark") {
      _light = false;
      dark();
    } else if (theme === "light") {
      _light = true;
      light();
    } else {
      localStorage.setItem("theme", "light"); // Set default theme
      _light = true;
      light();
    }
  }

  function dark() {
    q(".navbar").style.transition = "none";
    q("body").classList.add("dark-mode");
    qA(".sun").forEach(function (element) {
      element.style.display = "inline";
    });
    qA(".moon").forEach(function (element) {
      element.style.display = "none";
    });
    qA(".svg-dark").forEach(function (element) {
      element.style.display = "block";
    });
    qA(".svg-light").forEach(function (element) {
      element.style.display = "none";
    });
    localStorage.setItem("theme", "dark");
    setTimeout(() => {
      q(".navbar").style.transition =
        "background-color 0.2s ease, padding 0.2s ease, box-shadow 0.2s ease";
    }, 0.5); // Wait for animation to complete
  }

  function light() {
    q(".navbar").style.transition = "none";
    q("body").classList.remove("dark-mode");
    qA(".sun").forEach(function (element) {
      element.style.display = "none";
    });
    qA(".moon").forEach(function (element) {
      element.style.display = "inline";
    });
    qA(".svg-dark").forEach(function (element) {
      element.style.display = "none";
    });
    qA(".svg-light").forEach(function (element) {
      element.style.display = "block";
    });
    localStorage.setItem("theme", "light");
    setTimeout(() => {
      q(".navbar").style.transition =
        "background-color 0.2s ease, padding 0.2s ease, box-shadow 0.2s ease";
    }, 0.5); // Wait for animation to complete
  }

  theme();

  document.defaultView.addEventListener("storage", theme); // LocalStorage event listener

  qA(".theme-button").forEach(function (element) {
    element.addEventListener("click", function () {
      if (_light) {
        dark();
        _light = false;
      } else {
        light();
        _light = true;
      }
    });
  });

  /* =================== MOBILE NAVBAR =================== */
  var isNavOpen = false;

  function toggleNav() {
    if (isNavOpen) {
      isNavOpen = false;

      q("#side-bar").style.right = "-85vw";
      setTimeout(() => {
        q("#side-bar").style.display = "none";
      }, 300);

      q("#burger").style.display = "block";
      q("#close").style.display = "none";
    } else {
      isNavOpen = true;

      q("#side-bar").style.display = "block";
      setTimeout(() => {
        q("#side-bar").style.right = "0px";
      }, 10);

      q("#close").style.display = "block";
      q("#burger").style.display = "none";
    }
  }

  qA("#side-bar div ul li").forEach(function (el) {
    el.addEventListener("click", toggleNav);
  });

  q("#menu").addEventListener("click", toggleNav);

  /* ============== TOOLTIP ============== */
  function tip() {
    var t = this.querySelector(".tt");
    if (t === null) {
      t = document.createElement("div");
      t.classList.add("tt");
      t.style.zIndex = "99999999";
      this.append(t);
    }

    // Optional direction
    var dir = this.getAttribute("tt-dir");
    if (dir && dir === "bottom") {
      t.classList.add("tt-bottom");
    }

    // Optional event call
    var onHover = this.getAttribute("onhover");
    var hasOnHover = onHover && onHover in window;
    if (hasOnHover && typeof window[onHover] === "function") {
      window[onHover].call(this);
    }

    t.innerHTML = this.getAttribute("tt") || "";

    var width = t.offsetWidth;
    var halfWidth = width / 2;
    // t.setAttribute('radius', halfWidth);
    t.style.marginLeft = `${-halfWidth}px`;
  }

  qA(".tipped").forEach(function (el) {
    el.addEventListener("mouseenter", tip);
    el.addEventListener("touchstart", tip);
  });
})();
