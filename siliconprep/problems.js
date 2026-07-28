// Renders and filters the problem table. Backed by the mock data in data.js —
// swap `PROBLEMS` for a fetch() to your API once the judge backend exists.
document.addEventListener("DOMContentLoaded", () => {
  const rowsEl = document.getElementById("problem-rows");
  const countEl = document.getElementById("result-count");
  const searchEl = document.getElementById("search");
  const langEl = document.getElementById("filter-lang");
  const topicEl = document.getElementById("filter-topic");
  const diffEl = document.getElementById("filter-difficulty");

  // Populate the topic dropdown from whatever topics exist in the data.
  const topics = [...new Set(PROBLEMS.map((p) => p.topic))].sort();
  topics.forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    topicEl.appendChild(opt);
  });

  function render() {
    const q = searchEl.value.trim().toLowerCase();
    const lang = langEl.value;
    const topic = topicEl.value;
    const diff = diffEl.value;

    const filtered = PROBLEMS.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q)) return false;
      if (lang && !p.langs.includes(lang)) return false;
      if (topic && p.topic !== topic) return false;
      if (diff && p.difficulty !== diff) return false;
      return true;
    });

    countEl.textContent = `${filtered.length} of ${PROBLEMS.length} problems`;

    rowsEl.innerHTML = filtered
      .map(
        (p) => `
      <tr onclick="window.location.href='problem.html?id=${p.id}'">
        <td class="num">${String(p.id).padStart(2, "0")}</td>
        <td class="title">${p.title}</td>
        <td>${p.topic}</td>
        <td><span class="pip ${p.difficulty}">${capitalize(p.difficulty)}</span></td>
        <td>${p.langs.map((l) => `<span class="lang-tag">${LANG_LABEL[l]}</span>`).join(" ")}</td>
        <td class="rate">${p.rate}%</td>
      </tr>`
      )
      .join("");
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  [searchEl, langEl, topicEl, diffEl].forEach((el) =>
    el.addEventListener("input", render)
  );
  render();
});
