// Builds the quiz page from QUIZ_QUESTIONS (see quiz-data.js) and handles
// answer selection, scoring, per-question retry, and pagination.
document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("quiz-list");
  const summaryEl = document.getElementById("quiz-summary");
  const paginationEl = document.getElementById("quiz-pagination");
  const results = {}; // question id -> true (correct) | false (incorrect)

  const QUESTIONS_PER_PAGE = 3;
  const totalPages = Math.max(1, Math.ceil(QUIZ_QUESTIONS.length / QUESTIONS_PER_PAGE));
  let currentPage = 0; // 0-indexed

  function updateSummary() {
    const total = QUIZ_QUESTIONS.length;
    const done = Object.keys(results).length;
    const correct = Object.values(results).filter(Boolean).length;
    const scoreText =
      done === 0
        ? `${total} question${total === 1 ? "" : "s"}`
        : `${correct}/${done} correct so far · ${total - done} left`;
    summaryEl.textContent = `${scoreText} · Page ${currentPage + 1} of ${totalPages}`;
  }

  function renderQuestion(q) {
    const card = document.createElement("div");
    card.className = "panel quiz-card";
    card.dataset.answered = "false";

    const topic = document.createElement("span");
    topic.className = "tag";
    topic.textContent = q.topic;

    const questionText = document.createElement("p");
    questionText.className = "quiz-question-text";
    questionText.textContent = q.question;

    const optionsEl = document.createElement("div");
    optionsEl.className = "quiz-options";

    const feedbackEl = document.createElement("div");
    feedbackEl.className = "quiz-feedback";

    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.dataset.key = opt.key;

      const keyEl = document.createElement("span");
      keyEl.className = "quiz-option-key";
      keyEl.textContent = opt.key;

      const textEl = document.createElement("span");
      textEl.className = "quiz-option-text";
      textEl.textContent = opt.text;

      btn.appendChild(keyEl);
      btn.appendChild(textEl);
      btn.addEventListener("click", () => selectAnswer(q, opt.key, card, optionsEl, feedbackEl));
      optionsEl.appendChild(btn);
    });

    card.appendChild(topic);
    card.appendChild(questionText);
    if (q.code) {
      const codeEl = document.createElement("pre");
      codeEl.className = "quiz-code";
      codeEl.textContent = q.code;
      card.appendChild(codeEl);
    }
    card.appendChild(optionsEl);
    card.appendChild(feedbackEl);
    return card;
  }

  function selectAnswer(q, chosenKey, card, optionsEl, feedbackEl) {
    if (card.dataset.answered === "true") return;
    card.dataset.answered = "true";

    const isCorrect = chosenKey === q.correct;
    results[q.id] = isCorrect;

    optionsEl.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.key === q.correct) btn.classList.add("correct");
      else if (btn.dataset.key === chosenKey) btn.classList.add("incorrect");
    });

    feedbackEl.innerHTML = isCorrect
      ? '<span class="ok-text">Correct.</span>'
      : `<span class="fail-text">Not quite — correct answer is ${q.correct}.</span>` +
        '<a href="#" class="quiz-retry">Try again</a>';

    if (!isCorrect) {
      feedbackEl.querySelector(".quiz-retry").addEventListener("click", (e) => {
        e.preventDefault();
        resetQuestion(q, card, optionsEl, feedbackEl);
      });
    }

    updateSummary();
  }

  function resetQuestion(q, card, optionsEl, feedbackEl) {
    card.dataset.answered = "false";
    delete results[q.id];
    optionsEl.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("correct", "incorrect");
    });
    feedbackEl.innerHTML = "";
    updateSummary();
  }

  function showPage(page, { scroll = true } = {}) {
    currentPage = page;
    listEl.querySelectorAll(".quiz-card").forEach((card) => {
      card.style.display = Number(card.dataset.page) === page ? "" : "none";
    });
    renderPagination();
    updateSummary();
    if (scroll) listEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderPagination() {
    paginationEl.innerHTML = "";
    if (totalPages <= 1) return;

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "quiz-page-btn";
    prevBtn.textContent = "← Prev";
    prevBtn.disabled = currentPage === 0;
    prevBtn.addEventListener("click", () => showPage(currentPage - 1));
    paginationEl.appendChild(prevBtn);

    for (let i = 0; i < totalPages; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-page-btn" + (i === currentPage ? " active" : "");
      btn.textContent = String(i + 1);
      btn.addEventListener("click", () => showPage(i));
      paginationEl.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "quiz-page-btn";
    nextBtn.textContent = "Next →";
    nextBtn.disabled = currentPage === totalPages - 1;
    nextBtn.addEventListener("click", () => showPage(currentPage + 1));
    paginationEl.appendChild(nextBtn);
  }

  QUIZ_QUESTIONS.forEach((q, i) => {
    const card = renderQuestion(q);
    card.dataset.page = Math.floor(i / QUESTIONS_PER_PAGE);
    listEl.appendChild(card);
  });

  showPage(0, { scroll: false });
});
