// Mobile sidebar toggle.
(function () {
  var toggle = document.getElementById("sidebar-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", function () {
    document.body.classList.toggle("sidebar-open");
  });

  // Close the sidebar when a nav link is clicked on mobile.
  document.querySelectorAll(".sidebar-nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        document.body.classList.remove("sidebar-open");
      }
    });
  });
})();
