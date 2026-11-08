// Endereço da API (onde os dados ficam salvos). Publicado: servidor externo (codificado só pra não ficar
// legível no código-fonte; quem abrir as ferramentas de rede ainda vê). Local (XAMPP): api.php ao lado.
const API = location.hostname.endsWith('github.io') ? atob('aHR0cHM6Ly9zeXNybS5jb20uYnIvd3MtYWwvYXBpLnBocA==') : 'api.php';

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');
const lerLocal = k => { try { return JSON.parse(localStorage.getItem(k)) } catch { return null } };
const gravarLocal = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)) } catch {} };

async function chamar(a, dados, query = '') {
  const r = await fetch(API + '?a=' + a + query,
    dados ? { method: 'POST', body: new URLSearchParams(dados) } : { cache: 'no-store' });
  return r.json();
}

const ICONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>';

// '2026-11-13' -> '13/11'
const dataCurta = iso => iso ? iso.slice(8, 10) + '/' + iso.slice(5, 7) : '';

// lista de nomes (sempre todos, sem marcar quem já sorteou)
const chipsLista = (lista, eu) => lista.length
  ? `<div class="chips">${lista.map(n => `<span class="chip ${n === eu ? 'eu' : ''}">${esc(n)}</span>`).join('')}</div>`
  : '<p class="vazio">Ninguém na lista ainda.</p>';
