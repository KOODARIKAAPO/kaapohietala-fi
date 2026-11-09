(function () {
  var f = document.getElementById('filter'); if (!f) return;
  var label = f.querySelector('span'), quests = [].slice.call(document.querySelectorAll('.quest'));
  function apply(s) {
    quests.forEach(function (q) { q.classList.toggle('dim', !!s && q.dataset.skills.split('|').indexOf(s) < 0); });
    f.hidden = !s; if (s) label.textContent = window.SHOWING + ' ' + s + '.';
  }
  var skills = [].slice.call(document.querySelectorAll('.skill'));
  skills.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) { skills.forEach(function (o) { if (o !== d) o.open = false; }); apply(d.dataset.has ? d.dataset.skill : ''); }
      else if (!skills.some(function (o) { return o.open; })) apply('');
    });
  });
  f.querySelector('button').addEventListener('click', function () { skills.forEach(function (o) { o.open = false; }); apply(''); });
})();
