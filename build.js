// Rakentaa staattisen sivun src/data.js-tiedostosta kansioon dist. Ei riippuvuuksia.
const fs = require('fs'), path = require('path');
const D = require('./src/data.js');
const e = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const crest = `<svg class="crest" viewBox="0 0 120 136" aria-hidden="true"><path class="c-a" d="M60 6 110 19v52c0 32-25 50-50 60C35 121 10 103 10 71V19Z"/><path class="c-b" d="M60 14 103 25v46c0 27-21 43-43 52-22-9-43-25-43-52V25Z"/><g class="c-t"><path d="M26 40h16l8 8M94 40H78l-8 8M26 92h14l10-10M94 92H80L70 82"/><circle cx="26" cy="40" r="3"/><circle cx="94" cy="40" r="3"/><circle cx="26" cy="92" r="3"/><circle cx="94" cy="92" r="3"/></g><text x="60" y="80" text-anchor="middle">KH</text></svg>`;
function rank(n) { return n >= 3 ? 3 : n >= 1 ? 2 : 1; }
function page(L) {
  const T = D.t[L], tx = o => o[L];
  const uses = s => D.quests.filter(q => q.skills.includes(s));
  const skill = s => { const qs = uses(s), r = rank(qs.length), [nm, d] = T.ranks[r];
    return `<details class="skill" name="skill" data-skill="${e(s)}"${qs.length ? ' data-has="1"' : ''}><summary><span class="s-n">${e(s)}</span><span class="pips" role="img" aria-label="${e(nm)}, ${r + 1}/4">${[0,1,2,3].map(i => `<i${i <= r ? ' class="on"' : ''}></i>`).join('')}</span></summary><div class="s-d"><b>${e(nm)}.</b> ${e(d)}${qs.length ? ` ${e(T.evidence)} ${qs.map(q => `<a href="#${q.id}">${e(tx(q.title))}</a>`).join(', ')}.` : ''}</div></details>`; };
  const quest = q => `<article class="quest" id="${q.id}" data-skills="${e(q.skills.join('|'))}"><header><h3>${e(tx(q.title))}</h3><span class="seal${q.status.fi === 'Käynnissä' ? ' live' : ''}">${e(tx(q.status))}</span></header><p class="q-k">${e(tx(q.kind))}${q.when ? `, ${e(typeof q.when === 'string' ? q.when : tx(q.when))}` : ''}</p><p>${e(tx(q.summary))}</p>${tx(q.points).length ? `<ul>${tx(q.points).map(p => `<li>${e(p)}</li>`).join('')}</ul>` : ''}${q.skills.length ? `<p class="tags">${q.skills.map(s => `<span>${e(s)}</span>`).join('')}</p>` : ''}${q.repo ? `<p><a class="more" href="${e(q.repo)}" rel="noopener">${e(T.code)}</a></p>` : `<p class="q-k">${e(tx(q.noRepo))}</p>`}</article>`;
  const job = j => `<li><span class="when">${e(tx(j.when))}</span><h3>${e(tx(j.role))}</h3><p class="org">${e(j.org)}</p><ul>${tx(j.points).map(p => `<li>${e(p)}</li>`).join('')}</ul></li>`;
  const r = T.root, cvHref = `${r}${T.cvFile}`;
  const alt = L === 'fi' ? `${D.site}/en/` : `${D.site}/`;
  return `<!doctype html>
<html lang="${L}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${e(T.title)}</title><meta name="description" content="${e(T.desc)}">
<link rel="canonical" href="${L === 'fi' ? D.site + '/' : D.site + '/en/'}"><link rel="alternate" hreflang="${L === 'fi' ? 'en' : 'fi'}" href="${alt}">
<meta property="og:title" content="${e(T.title)}"><meta property="og:description" content="${e(T.desc)}"><meta property="og:image" content="${D.site}/og.png"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml"><link rel="preload" href="${r}fonts/almendra-bold.woff" as="font" type="font/woff" crossorigin><link rel="stylesheet" href="${r}styles.css">
</head><body>
<a class="skip" href="#main">${e(T.skip)}</a>
<nav class="top" aria-label="${L === 'fi' ? 'Päävalikko' : 'Main'}"><a href="#taidot">${e(T.navSkills)}</a><a href="#tehtavat">${e(T.navQuests)}</a><a href="#tarina">${e(T.navStory)}</a><a href="#yhteys">${e(T.navContact)}</a><a class="lang" href="${T.otherHref}" lang="${L === 'fi' ? 'en' : 'fi'}">${e(T.other)}</a></nav>
<header class="hero"><div class="id">${crest}<div><h1>${e(D.name)}</h1><p class="klass">${e(T.klass)}</p></div><p class="intro">${e(T.intro)}</p><p class="cta"><a class="btn" href="${cvHref}" download>${e(T.cv)}</a><a class="btn alt" href="${D.github}" rel="noopener">${e(T.gh)}</a></p></div>
<section class="stats" aria-label="${e(T.sheet)}"><h2>${e(T.sheet)}</h2><dl><div><dt>${e(T.cClass)}</dt><dd>${e(T.cClassV)}</dd></div><div><dt>${e(T.cGuild)}</dt><dd>${e(T.cGuildV)}</dd></div><div><dt>${e(T.cGrad)}</dt><dd>${e(T.cGradV)}</dd></div><div><dt>${e(T.cQuest)}</dt><dd>${e(T.cQuestV)}</dd></div><div><dt>${e(T.langs)}</dt><dd>${D.languages.map(l => `${e(l[L])} (${e(l.lv[L])})`).join(', ')}</dd></div></dl><p class="mail"><a href="mailto:${D.email}">${D.email}</a></p></section></header>
<div class="rule" aria-hidden="true"></div>
<main id="main" class="grid">
<aside id="taidot" class="skills"><h2>${e(T.skills)}</h2><p class="lead">${e(T.skillsLead)}</p>${D.skillGroups.map(g => `<section><h3>${e(g[L])}</h3>${g.items.map(skill).join('')}</section>`).join('')}</aside>
<div class="log">
<section id="tehtavat"><h2>${e(T.quests)}</h2><p class="lead">${e(T.questsLead)}</p><p class="filter" id="filter" aria-live="polite" hidden><span></span> <button type="button">${e(T.clear)}</button></p><div class="quests">${D.quests.map(quest).join('')}</div><p><a class="more" href="${D.github}?tab=repositories" rel="noopener">${e(T.all)}</a></p></section>
<section id="tarina"><h2>${e(T.story)}</h2><p class="lead">${e(T.storyLead)}</p><ol class="route">${D.work.map(job).join('')}</ol>
<h2 class="sub">${e(T.edu)}</h2><ol class="route">${D.education.map(x => `<li><span class="when">${e(tx(x.when))}</span><h3>${e(tx(x.what))}</h3><p class="org">${e(tx(x.org))}</p></li>`).join('')}</ol></section>
<section class="pair"><div><h2>${e(T.perks)}</h2><dl class="perks">${D.perks.map(p => `<div><dt>${e(tx(p.t))}</dt><dd>${e(tx(p.d))}</dd></div>`).join('')}</dl></div><div><h2>${e(T.side)}</h2><p>${e(tx(D.hobbies))}</p></div></section>
</div></main>
<footer id="yhteys" class="end"><h2>${e(T.contact)}</h2><p>${e(T.contactLead)}</p><p class="mailbig"><a href="mailto:${D.email}">${D.email}</a></p><p class="cta"><a class="btn" href="${cvHref}" download>${e(T.cv)}</a><a class="btn alt" href="${D.github}" rel="noopener">${e(T.gh)}</a></p></footer>
<script>window.SHOWING=${JSON.stringify(T.showing)}</script><script src="${r}app.js" defer></script>
</body></html>`;
}
const dist = path.join(__dirname, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(__dirname, 'public'), dist, { recursive: true });
fs.cpSync(path.join(__dirname, 'src/styles.css'), path.join(dist, 'styles.css'));
fs.cpSync(path.join(__dirname, 'src/app.js'), path.join(dist, 'app.js'));
fs.mkdirSync(path.join(dist, 'en'));
fs.writeFileSync(path.join(dist, 'index.html'), page('fi'));
fs.writeFileSync(path.join(dist, 'en/index.html'), page('en'));
console.log('Valmis: dist/');
