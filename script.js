document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 150);
  });

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  const darkBtn = document.getElementById("darkToggle");

  if (darkBtn) {
    const updateIcon = () => {
      darkBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    };
    updateIcon();
    
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      updateIcon();
      localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }
  const currentLang = localStorage.getItem("lang") || "tr";
  const langButtons = document.querySelectorAll(".language-switcher button");
  
  langButtons.forEach(btn => {
    if (btn.getAttribute("data-lang") === currentLang) {
      btn.classList.add("active");
    }
  });


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    }
  });

});

function changeLang(lang) {
  localStorage.setItem("lang", lang);
  window.location.href =
    lang === "en"
      ? window.location.pathname.replace(".html", "-en.html")
      : window.location.pathname.replace("-en.html", ".html");
}
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.getAttribute('data-progress');
      entry.target.style.width = progress + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

