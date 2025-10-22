// questions.js — fetch and display questions using JSONPlaceholder API
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const statusEl = document.getElementById('status');
const questionsListEl = document.getElementById('questionsList');
const searchInput = document.getElementById('search');
const typeFilter = document.getElementById('typeFilter');
const reloadBtn = document.getElementById('reloadBtn');

let questionsCache = [];

// helper to escape HTML for safety
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function setStatus(message = '', type = '') {
  statusEl.textContent = message;
  statusEl.className = 'status ' + type;
}

function showLoading() {
  setStatus('Loading questions…', 'loading');
}

function showError(msg) {
  setStatus(`Error: ${msg}`, 'error');
}

function clearStatus() {
  setStatus('', '');
}

function renderQuestions(list) {
  questionsListEl.innerHTML = '';
  list.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'question';

    // derive a fake “type” for demo filtering
    const titleLower = (item.title || '').toLowerCase();
    let type = 'coding';
    if (titleLower.includes('eum') || titleLower.includes('laudantium')) type = 'behavioral';
    if (titleLower.includes('qui') || titleLower.includes('ratione')) type = 'system';

    li.innerHTML = `
      <h4>${escapeHtml(item.title || '')} <small>(${escapeHtml(item.id)})</small></h4>
      <p>${escapeHtml(item.body || '')}</p>
      <p><em>Type: ${type}</em></p>
    `;
    li.dataset.qtype = type;
    questionsListEl.appendChild(li);
  });
}

async function fetchQuestions() {
  try {
    showLoading();
    const response = await fetch(API_URL, { cache: 'no-cache' });
    if (!response.ok) {
      if (response.status >= 500) throw new Error('Server error — try again later.');
      if (response.status === 404) throw new Error('Resource not found (404).');
      throw new Error(`Unexpected response: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Received unexpected data format.');

    questionsCache = data.slice(0, 50);
    renderQuestions(questionsCache);
    setStatus(`Loaded ${questionsCache.length} questions.`, 'success');
  } catch (err) {
    console.error('Fetch questions failed:', err);
    if (err instanceof TypeError) {
      showError('Network error — check your connection.');
    } else {
      showError(err.message || 'An unknown error occurred.');
    }
  }
}

function applyFilters() {
  const q = (searchInput.value || '').trim().toLowerCase();
  const selectedType = typeFilter.value;
  const filtered = questionsCache.filter(item => {
    const hay = ( (item.title || '') + ' ' + (item.body || '') ).toLowerCase();
    if (q && !hay.includes(q)) return false;
    if (selectedType !== 'all') {
      const titleLower = (item.title || '').toLowerCase();
      let type = 'coding';
      if (titleLower.includes('eum') || titleLower.includes('laudantium')) type = 'behavioral';
      if (titleLower.includes('qui') || titleLower.includes('ratione')) type = 'system';
      if (type !== selectedType) return false;
    }
    return true;
  });
  renderQuestions(filtered);
  setStatus(`${filtered.length} result(s)`, 'info');
}

document.addEventListener('DOMContentLoaded', () => {
  fetchQuestions();
  searchInput.addEventListener('input', applyFilters);
  typeFilter.addEventListener('change', applyFilters);
  reloadBtn.addEventListener('click', fetchQuestions);
});
