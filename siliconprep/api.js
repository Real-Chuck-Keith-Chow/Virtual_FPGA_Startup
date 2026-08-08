// Thin wrapper around the FastAPI backend. Change this if your API runs
// somewhere other than localhost:8000 (e.g. once you deploy it).
const API_BASE_URL = "http://127.0.0.1:8000";

const LANG_LABEL = { verilog: "Verilog", sv: "SystemVerilog", vhdl: "VHDL" };

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

function fetchProblems({ search, language, topic, difficulty } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (language) params.set("language", language);
  if (topic) params.set("topic", topic);
  if (difficulty) params.set("difficulty", difficulty);
  const qs = params.toString();
  return apiGet(`/api/problems${qs ? `?${qs}` : ""}`);
}

function fetchTopics() {
  return apiGet("/api/topics");
}

function fetchProblem(slug) {
  return apiGet(`/api/problems/${slug}`);
}

function submitCode({ problemId, language, code, isSubmit }) {
  return apiPost("/api/submissions", {
    problem_id: problemId,
    language,
    code,
    is_submit: isSubmit,
  });
}
