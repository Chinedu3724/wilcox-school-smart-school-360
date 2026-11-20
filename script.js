
/* =========================================
   WILCOX SCHOOL - SMART SCHOOL 360
   Main JavaScript File
========================================= */


/* =========================================
   1. SELECT HTML ELEMENTS
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const currentYear = document.getElementById("current-year");


/* =========================================
   2. MOBILE NAVIGATION MENU
========================================= */

function openMenu() {
    navbar.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");

    const icon = menuToggle.querySelector("i");

    if (icon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }
}

function closeMenu() {
    navbar.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");

    const icon = menuToggle.querySelector("i");

    if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
}

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navbar.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });

}


/* =========================================
   3. CLOSE MENU WHEN A LINK IS CLICKED
========================================= */

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        closeMenu();
    });

});


/* =========================================
   4. CLOSE MENU WITH ESCAPE KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =========================================
   5. AUTOMATIC COPYRIGHT YEAR
========================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   6. ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


/* =========================================
   7. CLOSE MOBILE MENU WHEN RESIZED
========================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {
        closeMenu();
    }

});


/* =========================================
   8. WEBSITE INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Welcome to Wilcox School - SMART SCHOOL 360!"
    );

});
