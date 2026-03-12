// ═══════════════════════════════════════════════════════════════
//  ability_db.js — The Brain
//  Shared ability database for all DYM fight sheets.
//  Also contains UI config (HEADER_COLS, JOB_OPTIONS) shared by
//  every 8-man fight template.
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// PILL COLOR SYSTEM
//
// Role colors are the default — pills inherit the color of the
// column they appear in. An optional `col` on an entry overrides
// this for that specific ability regardless of slot.
//
// Values are CSS variable names (e.g. '--blue').
// The HTML applies them as: style="--c: var(--blue)"
// CSS then uses: color-mix(in srgb, var(--c) 18%, transparent)
// ─────────────────────────────────────────────
const ROLE_COLORS = {
  t: '--blue',    // Tank columns  (T1/T2)
  h: '--green',   // Healer columns (H1/H2)
  m: '--red',     // Melee columns  (M1/M2)
  r: '--yellow',  // Ranged columns (R1/R2, non-caster)
  c: '--mauve',   // Caster columns (R1/R2, caster job)
};

const CASTER_JOBS = new Set(['BLM', 'SMN', 'RDM', 'PCT']);

function slotRole(slot, job) {
  if (slot === 'T1' || slot === 'T2') return 't';
  if (slot === 'H1' || slot === 'H2') return 'h';
  if (slot === 'M1' || slot === 'M2') return 'm';
  return CASTER_JOBS.has(job) ? 'c' : 'r';
}


// ─────────────────────────────────────────────
// ABILITY DATABASE
// id:   identifier (kept for debugging/future use)
// p:    1 = personal mit, 0 = group/party mit
// col:  (optional) color override for party pills
// pcol: (optional) color override for personal pills
//       if absent, inherits col or slot's role color
// ALL:  fallback name if no job-specific key
// ─────────────────────────────────────────────
const ABILITY_DB = {

  // ── Tank Personal ────────────────────────────
  't_inv':   { id: 'INV',  p:1, pcol:'--peach', PLD:'Hallowed Ground',    WAR:'Holmgang',          DRK:'Living Dead',        GNB:'Superbolide'       },
  't_40':    { id: 'BIG',  p:1, pcol:'--peach', PLD:'Guardian',           WAR:'Damnation',         DRK:'Shadowed Vigil',     GNB:'Great Nebula'      },
  't_90s':   { id: 'MED',  p:1, pcol:'--peach', PLD:'Bulwark',            WAR:'Thrill of Battle',  DRK:'Dark Mind',          GNB:'Camouflage'        },
  't_short': { id: 'SHT',  p:1, pcol:'--peach', PLD:'Holy Sheltron',      WAR:'Bloodwhetting',     DRK:'The Blackest Night', GNB:'Heart of Corundum' },
  't_ramp':  { id: 'RAMP', p:1, pcol:'--peach', ALL:'Rampart'                                                                                        },

  // ── Tank Party ───────────────────────────────
  't_rep':   { id: 'PRTY', p:0, ALL:'Reprisal'                                                                                       },
  't_pmit':  { id: 'PRTY', p:0, PLD:'Divine Veil',        WAR:'Shake It Off',      DRK:'Dark Missionary',    GNB:'Heart of Light'    },

  // ── Healer Ground / Bubble ───────────────────
  'h_soil':  { id: 'SL',   p:0, SCH:'Sacred Soil',        SGE:'Kerachole',         AST:'Collective Unconscious', WHM:'Asylum'        },

  // ── Healer Big Mit ───────────────────────────
  'h_120':   { id: 'BMIT', p:0, WHM:'Temperance',         AST:'Neutral Sect',      SCH:'Expedient',          SGE:'Holos'            },

  // ── Healer Capstone (Lv100) ──────────────────
  'h_cap':   { id: 'CAP',  p:0, WHM:'Divine Caress',      AST:'Sun Sign',          SCH:'Seraphism',          SGE:'Philosophia'      },

  // ── Healer Burst ─────────────────────────────
  'h_burst': { id: 'BRST', p:0, WHM:'Liturgy of the Bell',AST:'Macrocosmos',       SCH:'Summon Seraph',      SGE:'Panhaima'         },

  // ── SGE Shields ──────────────────────────────
  'zoe_shields': { id: 'SL', p:0, ALL:'Zoe Shields'                                                                                  },

  // ── Special (explicit color overrides) ───────
  'kitchen_sink': { id: 'SINK', p:1, col: '--red', ALL:'Kitchen Sink'                                                                },

  // ── DPS ──────────────────────────────────────
  'd_feint': { id: 'PRTY', p:0, ALL:'Feint'                                                                                          },
  'd_addle': { id: 'PRTY', p:0, ALL:'Addle'                                                                                          },
  'd_mit':   { id: 'DMIT', p:0, MNK:'Mantra', BRD:'Troubadour', MCH:'Tactician', DNC:'Shield Samba', RDM:'Magick Barrier', PCT:'Tempera Grassa' },
};


// ─────────────────────────────────────────────
// ABILITY ENGINE
// ─────────────────────────────────────────────
const AbilityEngine = {
  resolve(uID, job, slot) {
    if (!uID) return null;
    const entry = ABILITY_DB[uID.toLowerCase().trim()];
    if (entry) {
      const name = entry[job] || entry.ALL;
      if (!name) return null;
      const roleCol = slot ? ROLE_COLORS[slotRole(slot, job)] : '--subtext0';
      const col = entry.p
        ? (entry.pcol || entry.col || roleCol)
        : (entry.col  || roleCol);
      return { name, type: entry.id, p: entry.p, col };
    }
    // Passthrough — literal string (e.g. "Everything", "Use Personals")
    const col = slot ? ROLE_COLORS[slotRole(slot, job)] : '--subtext0';
    return { name: uID.trim(), type: 'SPEC', p: 0, col };
  }
};


// ─────────────────────────────────────────────
// PILL STYLES — injected at runtime so all pill
// logic lives here, not in the fight HTML.
// ─────────────────────────────────────────────
(function injectPillStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .pill.is-g {
      background: color-mix(in srgb, var(--c) 30%, var(--mantle));
      color:      var(--c);
      border:     1px solid color-mix(in srgb, var(--c) 40%, transparent);
    }
    .pill.is-p {
      background: color-mix(in srgb, var(--c) 30%, var(--surface0));
      color:      white;
      border:     1px solid color-mix(in srgb, var(--c) 60%, transparent);
    }
  `;
  document.head.appendChild(style);
})();


// ─────────────────────────────────────────────
// HEADER COLUMN DEFINITIONS
// Shared across all 8-man fight sheets.
// ─────────────────────────────────────────────
const HEADER_COLS = [
  { slot: 'T1', cls: 'col-t', type: 'tank'   },
  { slot: 'T2', cls: 'col-t', type: 'tank'   },
  { slot: 'H1', cls: 'col-h', type: 'healer' },
  { slot: 'H2', cls: 'col-h', type: 'healer' },
  { slot: 'M1', cls: 'col-m', type: 'melee'  },
  { slot: 'M2', cls: 'col-m', type: 'melee'  },
  { slot: 'R1', cls: 'col-r', type: 'ranged' },
  { slot: 'R2', cls: 'col-r', type: 'ranged' },
];


// ─────────────────────────────────────────────
// JOB OPTIONS
// [abbreviation, full name, icon path]
// ─────────────────────────────────────────────
const JOB_OPTIONS = {
  tank: {
    icon: '../../images/icons/roletank.png',
    jobs: [
      ['PLD', 'Paladin',     '../../images/icons/pld.png'],
      ['WAR', 'Warrior',     '../../images/icons/war.png'],
      ['DRK', 'Dark Knight', '../../images/icons/drk.png'],
      ['GNB', 'Gunbreaker',  '../../images/icons/gnb.png'],
    ],
  },
  healer: {
    icon: '../../images/icons/rolehealer.png',
    jobs: [
      ['WHM', 'White Mage',  '../../images/icons/whm.png'],
      ['SCH', 'Scholar',     '../../images/icons/sch.png'],
      ['AST', 'Astrologian', '../../images/icons/ast.png'],
      ['SGE', 'Sage',        '../../images/icons/sge.png'],
    ],
  },
  melee: {
    icon: '../../images/icons/roledeeps.png',
    jobs: [
      ['DRG', 'Dragoon', '../../images/icons/drg.png'],
      ['MNK', 'Monk',    '../../images/icons/mnk.png'],
      ['SAM', 'Samurai', '../../images/icons/sam.png'],
      ['RPR', 'Reaper',  '../../images/icons/rpr.png'],
      ['VPR', 'Viper',   '../../images/icons/vpr.png'],
    ],
  },
  ranged: {
    icon: '../../images/icons/roledeeps.png',
    jobs: [
      ['BRD', 'Bard',        '../../images/icons/brd.png'],
      ['MCH', 'Machinist',   '../../images/icons/mch.png'],
      ['DNC', 'Dancer',      '../../images/icons/dnc.png'],
      ['BLM', 'Black Mage',  '../../images/icons/blm.png'],
      ['SMN', 'Summoner',    '../../images/icons/smn.png'],
      ['RDM', 'Red Mage',    '../../images/icons/rdm.png'],
      ['PCT', 'Pictomancer', '../../images/icons/pct.png'],
    ],
  },
};