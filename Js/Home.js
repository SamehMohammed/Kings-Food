// Check If There's local Storage Color Option
let mainColors = localStorage.getItem("color_option");
let mainLogo = localStorage.getItem("Logo_option");
let mainLogoSticky = localStorage.getItem("Logo_optionSticky");
let dataTheme = localStorage.getItem("datatheme");
// Start If !== null

mainLogo !== null
  ? document.documentElement.style.setProperty("--main-logo", mainLogo)
  : mainLogo;
mainLogoSticky !== null
  ? document.documentElement.style.setProperty(
      "--main-logoSticky",
      mainLogoSticky
    )
  : mainLogoSticky;
dataTheme !== null
  ? document.documentElement.setAttribute("datatheme", dataTheme)
  : dataTheme;

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  // Remove Active Class From All Color List Item
  document.querySelectorAll(".colors-list li").forEach((elementAc) => {
    elementAc.classList.remove("active-color");
    // Add Active Class On Element Data Color = Local Storage
    if (elementAc.dataset.color === mainColors) {
      // Add Class Active
      elementAc.classList.add("active-color");
    }
  });
}
// End If !== null

/* Start BackGrount Home Page */
let homePage = document.querySelector(".Home-Page"),
  imagArray = [
    "Home-1.jpg",
    "Home-2.jpg",
    "Home-3.jpg",
    "Home-4.jpg",
    "Home-5.jpg",
  ],
  randomNumber;

setInterval(() => {
  // Get Random Nubmer
  randomNumber = Math.floor(Math.random() * imagArray.length);
  // Change Background Url()
  homePage.style.backgroundImage =
    'url("Images/Home/body/' + imagArray[randomNumber] + '")';
}, 5000);

/* Start Fixed Navbar On Scroll */
window.addEventListener("scroll", () => {
  let header = document.querySelector("header");
  header.classList.toggle("header-Sticky", window.scrollY > 50);
});

/* Start Bullets Section */
const allBullets = document.querySelectorAll(".nav-bullet .bullet"),
  allLinks = document.querySelectorAll(".Link-home a");
function elScroll(elemnts) {
  elemnts.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
elScroll(allBullets);
elScroll(allLinks);

/* Start Header Icon Home-Page And header Toggle Menu */
let IconMore = document.querySelectorAll(".icon-More"),
  SettingAll = document.querySelectorAll(".Setting-All"),
  toggleMenu = document.querySelector(".toggle-menu"),
  tLinks = document.querySelector(".Link-home");

IconMore.forEach((iconOne) => {
  iconOne.addEventListener("click", (e) => {
    // Stop Propagation
    e.stopPropagation();
    // Active Icon
    IconMore.forEach((iconOne) => {
      iconOne.classList.remove("active-More");
    });
    iconOne.classList.toggle("active-More");
    // Click Icon More remove Toggle Menu
    toggleMenu.classList.remove("menu-active");
    tLinks.classList.remove("open");
    // Loop SettingAll => [ Contact And Setting And Account ]
    SettingAll.forEach((setAll) => {
      setAll.addEventListener("click", (e) => {
        // Stop Propagation
        e.stopPropagation();
      });
      if (
        setAll.getAttribute("data-IconDisplay") ===
        iconOne.getAttribute("data-IconDisplay")
      ) {
        setAll.classList.toggle("Show");
        if (setAll.classList.contains("Show")) {
          iconOne.classList.add("active-More");
        } else {
          iconOne.classList.remove("active-More");
        }
      } else {
        setAll.classList.remove("Show");
      }
      document.addEventListener("click", (e) => {
        if (e.target !== IconMore && e.target !== SettingAll) {
          // Check If Menu Open
          if (setAll.classList.contains("Show")) {
            iconOne.classList.remove("menu-active");
            setAll.classList.remove("Show");
            IconMore.forEach((iconOne) => {
              iconOne.classList.remove("active-More");
            });
          }
        }
      });
    });
  });
});

// Start header Toggle Menu
toggleMenu.onclick = function (e) {
  // Stop Propagation On Toggle Menu
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
  document.querySelector(".settings-box").classList.remove("open");
  // Click Toggle Menu remove Icon More
  IconMore.forEach((iconOne) => {
    iconOne.classList.remove("active-More");
  });
  SettingAll.forEach((setAll) => {
    setAll.classList.remove("Show");
  });
};
// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
// Click AnyWhere OutSide Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== tLinks) {
    // Check If Menu Open
    if (tLinks.classList.contains("open")) {
      toggleMenu.classList.remove("menu-active");
      tLinks.classList.remove("open");
    }
  }
});

/* Start Header Icon Home-Page Change Color */
let elColor = document.querySelectorAll(".colors-list li").forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    document.documentElement.style.setProperty(
      "--main-logo",
      `url("../Images/Home/Navbar/Logo-Header/header/${e.target.getAttribute(
        "data-logoImg"
      )}.png")`
    );
    document.documentElement.style.setProperty(
      "--main-logoSticky",
      `url("../Images/Home/Navbar/Logo-Header/header-Sticky/${e.target.getAttribute(
        "data-logoImg"
      )}.png")`
    );
    // Set Color On Logal Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    localStorage.setItem(
      "Logo_option",
      `url("../Images/Home/Navbar/Logo-Header/header/${e.target.getAttribute(
        "data-logoImg"
      )}.png")`
    );
    localStorage.setItem(
      "Logo_optionSticky",
      `url("../Images/Home/Navbar/Logo-Header/header-Sticky/${e.target.getAttribute(
        "data-logoImg"
      )}.png")`
    );
    // Remove Active Class From All
    e.target.parentElement
      .querySelectorAll(".active-color")
      .forEach((elementAc) => {
        elementAc.classList.remove("active-color");
      });
    e.target.classList.add("active-color");
  });
});

/* Start Dark Mode */
let checkbox = document.querySelectorAll("input[name=theme]"),
  transitionBody = () => {
    document.documentElement.classList.add("transition-body");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition-body");
    }, 1000);
  };

checkbox.forEach((checkboxs) => {
  checkboxs.addEventListener("change", function () {
    if (this.checked) {
      transitionBody();
      document.documentElement.setAttribute("datatheme", "dark");
      localStorage.setItem("datatheme", "dark");
    } else {
      transitionBody();
      document.documentElement.setAttribute("datatheme", "light");
      localStorage.setItem("datatheme", "light");
    }
  });
});
// Click On Toggle Settings Gear
let toggleSetting = document.querySelector(".toggle-settings");
toggleSetting.onclick = function () {
  document.querySelector(".settings-box").classList.toggle("open");
};

/* Start layer Aboute Us Speed Img */
// let ab = document.querySelector(".About-Us");
// document.addEventListener("mousemove", translateimg);
// function translateimg(img) {
//   this.querySelectorAll(".layer").forEach((layer) => {
//     var speed = layer.getAttribute("data-speed");
//     const x = (window.innerWidth - img.pageX * speed) / 100;
//     const y = (window.innerHeight - img.pageY * speed) / 100;
//     layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
//   });
// }

/* Start Select-data */
const date = new Date(),
  prevMonths = document.getElementById("prev"),
  nextMonths = document.getElementById("next");
const renderCalendar = () => {
  date.setDate(1);
  const monthDays = document.querySelector(".days"),
    selDays = document.querySelector(".sel-days"),
    lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    firstDayIndex = date.getDay(),
    prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
    lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay(),
    nextDays = 7 - lastDayIndex - 1,
    months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Septemper",
      "October",
      "November",
      "December",
    ];

  document.querySelector(".sel-data").innerHTML = months[date.getMonth()];
  document.querySelector(".data p").innerHTML = new Date().toDateString();
  let days = "";
  for (let dI = firstDayIndex; dI > 0; dI--) {
    days += `<div class="prev-date">${prevLastDay - dI + 1}</div>`;
  }

  for (let d = 1; d <= lastDay; d++) {
    days += `<div>${d}</div>`;
    monthDays.innerHTML = days;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};
prevMonths.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});
nextMonths.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});
renderCalendar();

/* Start Order */
// Filter All
let OrLi = document.querySelectorAll(".menu-Or li"),
  OrImg = document.querySelectorAll(".menu-item");
// Li Loop
OrLi.forEach((item) => {
  item.addEventListener("click", () => {
    OrLi.forEach((item) => {
      item.className = "";
    });
    item.className = "active-filter";
    // Show Burger
    let orVlaues = item.getAttribute("data-filter");
    OrImg.forEach((orShow) => {
      orShow.style.display = "none";
      if (
        orShow.getAttribute("data-OrItem") === orVlaues ||
        orVlaues === "all"
      ) {
        orShow.style.display = "inline-flex";
      }
    });
  });
});
// count Plus And Minus
let countOrder = document.querySelectorAll(".order-count"),
  orPuls = document.querySelectorAll(".Or-plus"),
  orMinus = document.querySelectorAll(".Or-minus");

orMinus.forEach((minus) => {
  minus.addEventListener("click", (itemMinus) => {
    countOrder.forEach((count) => {
      if (
        count.getAttribute("data-OrPlus") ===
        itemMinus.target.getAttribute("data-OrPlus")
      ) {
        if (count.value > 1) {
          count.value = parseInt(count.value) - 1;
        }
      }
    });
  });
});
orPuls.forEach((plus) => {
  plus.addEventListener("click", (itemPlus) => {
    countOrder.forEach((count) => {
      if (
        count.getAttribute("data-OrPlus") ===
        itemPlus.target.getAttribute("data-OrPlus")
      ) {
        if (count.value < 99) {
          count.value = parseInt(count.value) + 1;
        }
      }
    });
  });
});

/* Start Loading */
const load = document.querySelector(".loading");
window.addEventListener("load", () => {
  setInterval(() => {
    load.classList.add("fade");
  }, 6500);
});
