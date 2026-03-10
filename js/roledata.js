// ═══════════════════════════════════════════════════════════════
//  dym-core.js
//  Shared mitigation engine for all DYM? fight sheets.
//  Include this file in every fight sheet with:
//    <script src="js/dym-core.js"></script>
// ═══════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────
// PARTY COMPOSITION
// Single source of truth. Fight sheets read and
// write to this via changeJob().
// ─────────────────────────────────────────────
const PARTY_COMPOSITION = {
  T1: '', T2: '', H1: '', H2: '', M1: '', M2: '', R1: '', R2: ''
};


// ─────────────────────────────────────────────
// GENERIC ABILITY RESOLUTION TABLE
//
// Keys are lowercase generic terms used in fight data.
// Each maps to { JOB: 'Actual in-game ability name' }.
//
// Rules:
//   null     → job has no equivalent; pill is omitted entirely
//   undefined → job not listed; generic label is shown as fallback
//   'Name'   → resolved and displayed
//
// Anything NOT in this table (e.g. 'Kerachole', 'Reprisal',
// 'Feint') passes through unchanged.
// ─────────────────────────────────────────────
const GENERIC_ABILITIES = {

  // ── INVULNERABILITIES ──
  'invulnerability': {
    PLD: 'Hallowed Ground',
    WAR: 'Holmgang',
    DRK: 'Living Dead',
    GNB: 'Superbolide',
  },

  // ── TANK PARTY / RAID MIT ──
  'party mit': {
    // Tanks
    PLD: 'Divine Veil',
    WAR: 'Shake It Off',
    DRK: 'Dark Missionary',
    GNB: 'Heart of Light',
    // Healers
    WHM: 'Temperance',
    SCH: 'Expedient',
    AST: 'Celestial Opposition',
    SGE: 'Holos',
    // Phys Ranged
    BRD: 'Troubadour',
    MCH: 'Tactician',
    DNC: 'Shield Samba',
    // Casters — no party mit
    BLM: null,
    SMN: null,
    RDM: null,
    PCT: null,
  },

  // ── SHORT-CD PERSONAL MIT (~30s) ──
  'short mit': {
    PLD: 'Holy Sheltron',
    WAR: 'Bloodwhetting',
    DRK: 'The Blackest Night',
    GNB: 'Heart of Corundum',
  },

  // ── 90s PERSONAL MIT (also labelled "40%" in some sheets) ──
  '90s': {
    PLD: 'Guardian',
    WAR: 'Damnation',
    DRK: 'Shadowed Vigil',
    GNB: 'Great Nebula',
  },
  '40%': {
    PLD: 'Guardian',
    WAR: 'Damnation',
    DRK: 'Shadowed Vigil',
    GNB: 'Great Nebula',
  },

};


// ─────────────────────────────────────────────
// PILL STYLING SETS
// ─────────────────────────────────────────────

// Resolved names that get invuln bold treatment
const INVULN_NAMES = new Set([
  'hallowed ground', 'holmgang', 'living dead', 'superbolide', 'invulnerability',
]);

// Resolved names that get peach personal-mit styling
const PERSONAL_NAMES = new Set([
  'hallowed ground', 'holmgang', 'living dead', 'superbolide',
  'guardian', 'damnation', 'shadowed vigil', 'great nebula',
  'holy sheltron', 'bloodwhetting', 'the blackest night', 'heart of corundum',
  'rampart',
]);

// Generic terms (pre-resolution) that are personal
const PERSONAL_KEYWORDS = [
  'invuln', 'invulnerability', 'rampart', 'kitchen sink',
  'short mit', '40%', '90s',
];

function isPersonalAbility(name) {
  const lower = name.toLowerCase().trim();
  if (PERSONAL_NAMES.has(lower)) return true;
  return PERSONAL_KEYWORDS.some(k => lower.includes(k));
}


// ─────────────────────────────────────────────
// RESOLUTION
// ─────────────────────────────────────────────
function resolveAbility(term, slot) {
  const job   = PARTY_COMPOSITION[slot];
  const entry = GENERIC_ABILITIES[term.toLowerCase().trim()];

  if (!entry) return term;            // not a generic term — pass through
  if (!job)   return term;            // no job selected — show generic label
  if (entry[job] === null) return null;      // job has no equivalent — omit pill
  if (entry[job] === undefined) return term; // job not in table — fallback to generic
  return entry[job];
}


// ─────────────────────────────────────────────
// RENDER HELPERS
// ─────────────────────────────────────────────
const ROLE_PILL = { t: 'pill-t', h: 'pill-h', m: 'pill-m', r: 'pill-r' };

// Column index → slot + role (matches T1 T2 H1 H2 M1 M2 R1 R2 column order)
const COL_SLOTS = ['T1', 'T2', 'H1', 'H2', 'M1', 'M2', 'R1', 'R2'];
const COL_ROLES = ['t',  't',  'h',  'h',  'm',  'm',  'r',  'r' ];

function renderCell(rawAbilities, role, slot) {
  if (!rawAbilities || rawAbilities.length === 0) return '<td></td>';

  const resolved = rawAbilities
    .map(a => resolveAbility(a, slot))
    .filter(a => a !== null && a.trim() !== '');

  if (resolved.length === 0) return '<td></td>';

  const pills = resolved.map(a => {
    const lower   = a.toLowerCase();
    const personal = isPersonalAbility(a);
    const cls      = personal ? 'pill-personal' : ROLE_PILL[role];
    const invuln   = INVULN_NAMES.has(lower) ? 'pill-invuln' : '';
    return `<span class="pill ${cls} ${invuln}">${a}</span>`;
  }).join('');

  return `<td><div class="pills">${pills}</div></td>`;
}

// Renders a single table row.
// cells = [T1val, T2val, H1val, H2val, M1val, M2val, R1val, R2val]
// each value is a raw string like 'Reprisal + Party Mit' or null.
function renderRow(time, mech, ...cells) {
  const split = s => s ? s.split('+').map(p => p.trim()).filter(Boolean) : [];

  const cellsHTML = cells.map((c, i) =>
    renderCell(split(c), COL_ROLES[i], COL_SLOTS[i])
  ).join('');

  return `<tr>
    <td class="td-time">${time}</td>
    <td class="td-mech">${mech}</td>
    ${cellsHTML}
  </tr>`;
}


// ─────────────────────────────────────────────
// JOB CHANGE HANDLER
// Called by every dropdown's onchange.
// Updates PARTY_COMPOSITION, syncs all dropdowns
// sharing the same slot (across phases), then calls
// the fight sheet's own rerenderTables() function.
// ─────────────────────────────────────────────
function changeJob(selectElement) {
  const slot = selectElement.dataset.slot;
  const job  = selectElement.value;

  PARTY_COMPOSITION[slot] = job;

  // Sync every other dropdown with the same slot on the page
  document.querySelectorAll(`select[data-slot="${slot}"]`).forEach(sel => {
    if (sel !== selectElement) sel.value = job;
  });

  // Each fight sheet defines its own rerenderTables()
  if (typeof rerenderTables === 'function') rerenderTables();
}


// ─────────────────────────────────────────────
// TAB SWITCHING
// Generic — works for any sheet with .tab-btn
// and panels named tab-{id}.
// ─────────────────────────────────────────────
function switchTab(id, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p  => p.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}
