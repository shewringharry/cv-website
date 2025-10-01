document.addEventListener("DOMContentLoaded", function () {
   // Smooth Scrolling for all nav links
   document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
         e.preventDefault();

         const headerOffset = document.querySelector("header").offsetHeight;
         const targetElement = document.querySelector(
            this.getAttribute("href")
         );
         const elementPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;
         const offsetPosition = elementPosition - headerOffset - 20;

         window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
         });

         // Auto-close mobile nav after clicking
         if (window.innerWidth <= 768) {
            document.getElementById("nav-menu").classList.remove("active");
         }
      });
   });

   // Hamburger Menu Toggle
   const menuToggle = document.getElementById("menu-toggle");
   const navMenu = document.getElementById("nav-menu");
   menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
   });

   // Dark Mode Toggle (with localStorage memory)
   const darkModeToggle = document.getElementById("dark-mode-toggle");
   const icon = darkModeToggle.querySelector("i");

   if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
   }

   darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
         icon.classList.remove("fa-moon");
         icon.classList.add("fa-sun");
         localStorage.setItem("dark-mode", "enabled");
      } else {
         icon.classList.remove("fa-sun");
         icon.classList.add("fa-moon");
         localStorage.setItem("dark-mode", "disabled");
      }
   });

   // Add shadow on header when scrolling
   const header = document.querySelector("header");
   window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
         header.classList.add("scrolled");
      } else {
         header.classList.remove("scrolled");
      }
   });

   // Scrollspy: Highlight active section in navbar
   const sections = document.querySelectorAll("main section");
   const navLinks = document.querySelectorAll("nav a");

   window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
         const sectionTop = section.offsetTop - header.offsetHeight - 30;
         if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
         }
      });

      navLinks.forEach((link) => {
         link.classList.remove("active");
         if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
         }
      });
   });

   // Back to Top Button
   const backToTop = document.createElement("button");
   backToTop.innerHTML = "↑";
   backToTop.id = "back-to-top";
   document.body.appendChild(backToTop);

   // Style it quickly (better put in CSS)
   backToTop.style.position = "fixed";
   backToTop.style.bottom = "20px";
   backToTop.style.right = "20px";
   backToTop.style.padding = "10px 15px";
   backToTop.style.fontSize = "18px";
   backToTop.style.borderRadius = "50%";
   backToTop.style.border = "none";
   backToTop.style.background = "#333";
   backToTop.style.color = "#fff";
   backToTop.style.cursor = "pointer";
   backToTop.style.opacity = "0";
   backToTop.style.transition = "opacity 0.3s ease";

   // Show/hide on scroll
   window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
         backToTop.style.opacity = "1";
      } else {
         backToTop.style.opacity = "0";
      }
   });

   // Scroll to top on click
   backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   });
});