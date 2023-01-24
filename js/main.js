const colorsLi = document.querySelectorAll(".colors-list li");
let backGround = document.querySelectorAll(".random-background span");

let maincolor = localStorage.getItem("color_option");

if (maincolor !== null) {
  document.documentElement.style.setProperty("--main-color", maincolor);
  colorsLi.forEach(function (li) {
    li.classList.remove("active");

    if (li.dataset.color === maincolor) {
      li.classList.add("active");
    }
  });
}

// start settings box
let stBox = document.querySelector(".settings-box");
let icon = document.querySelector(".settings-box .fa-gear");

icon.onclick = function () {
  stBox.classList.toggle("open");
  this.classList.toggle("fa-spin");
};

let landingPage = document.querySelector(".landing-page");
let imges = ["img-2.jpg", "img-1.jpg", "img-3.jpg", "img-4.jpg", "img-5.jpg"];
let option = true;
let intervalBG;

let LSBG = localStorage.getItem("backGround");
if (LSBG !== null) {
  if (LSBG === "true") {
    option = true;
  } else {
    option = false;
  }

  backGround.forEach(function (span) {
    span.classList.remove("active");
  });
  if (LSBG === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

function interval() {
  if (option === true) {
    intervalBG = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imges.length);
      landingPage.style.backgroundImage = `url("imges/${imges[randomNum]}")`;
    }, 3000);
  }
}

//  switch color

colorsLi.forEach((li) => {
  li.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);

    classActive(e);
  });
});

//switch backGround

backGround.forEach((span) => {
  span.addEventListener("click", function (e) {
    classActive(e);

    if (document.querySelector(".yes") === e.target) {
      option = true;
      localStorage.setItem("backGround", true);
      interval();
    } else if (document.querySelector(".no") === e.target) {
      option = false;
      localStorage.setItem("backGround", false);
      clearInterval(intervalBG);
    }
  });
});
interval();
// start skills

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffSetTop = ourSkills.offsetTop;
  let skillsOuterHight = ourSkills.offsetHeight;
  let windowSCrollTop = this.pageYOffset;
  let windowHight = this.innerHeight;

  if (
    windowSCrollTop >
    skillsOffSetTop + skillsOuterHight - windowHight - 350
  ) {
    let allSkills = document.querySelectorAll(".skill-progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// start Gallery

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", function () {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let heading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);

      heading.appendChild(imgText);
      popupBox.appendChild(heading);
    }

    let popupImg = document.createElement("img");

    popupImg.src = img.src;

    popupBox.appendChild(popupImg);

    document.body.appendChild(popupBox);

    let closeBt = document.createElement("span");

    let textClose = document.createTextNode("X");

    closeBt.appendChild(textClose);
    closeBt.className = "close-bt";

    popupBox.appendChild(closeBt);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-bt") {
    document.querySelector(".popup-overlay").remove();
    document.querySelector(".popup-box").remove();
  }
});

// start bullit
let allBullets = document.querySelectorAll(".nav-bullets .bullets");

scrolling(allBullets);

// start links

let allLinks = document.querySelectorAll(".links a");
scrolling(allLinks);

// start functions
function scrolling(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function classActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(function (e) {
    e.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsCon = document.querySelector(".nav-bullets");

let bulletlocal = localStorage.getItem("bullets_option");

if (bulletlocal !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletlocal === "block") {
    bulletsCon.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    document.querySelector(".bullets-option .no").classList.add("active");

    bulletsCon.style.display = "none";
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsCon.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsCon.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    classActive(e);
  });
});

// start header

let listIcon = document.querySelector(".links-container i");

scrolling(document.querySelectorAll(".links-icon a"));

listIcon.onclick = function () {
  document
    .querySelector(".container-icon .links-icon")
    .classList.toggle("display-block");
};
document.addEventListener("click", function (e) {
  if (
    e.target !== listIcon &&
    e.target !== document.querySelector(".container-icon .links-icon")
  ) {
    if (
      document
        .querySelector(".container-icon .links-icon")
        .classList.contains("display-block")
    ) {
      document
        .querySelector(".container-icon .links-icon")
        .classList.remove("display-block");
    }
  }
});
