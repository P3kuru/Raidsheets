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


  // ── Special (explicit color overrides) ───────
  'kitchen_sink': { id: 'SINK', p:1, col: '--red', ALL:'Kitchen Sink'                                                                },

  // ── WHM Unique — Personal Heals ──────────────
  'whm_cure':              { id: 'WHM_CURE',    p:1, ALL:'Cure'              },
  'whm_cure2':             { id: 'WHM_CURE2',   p:1, ALL:'Cure II'           },
  'whm_cure3':             { id: 'WHM_CURE3',   p:0, ALL:'Cure III'          },
  'whm_regen':             { id: 'WHM_REGEN',   p:1, ALL:'Regen'             },
  'whm_raise':             { id: 'WHM_RAISE',   p:1, ALL:'Raise'             },
  'whm_afflatus_solace':   { id: 'WHM_SOLACE',  p:1, ALL:'Afflatus Solace'   },
  'whm_benediction':       { id: 'WHM_BENE',    p:1, ALL:'Benediction'       },
  'whm_tetragrammaton':    { id: 'WHM_TETRA',   p:1, ALL:'Tetragrammaton'    },
  'whm_divine_benison':    { id: 'WHM_BENIS',   p:1, ALL:'Divine Benison'    },
  'whm_aquaveil':          { id: 'WHM_AQUA',    p:1, ALL:'Aquaveil'          },

  // ── WHM Unique — Party Heals & Mits ──────────
  'whm_medica':            { id: 'WHM_MED',     p:0, ALL:'Medica'            },
  'whm_medica2':           { id: 'WHM_MED2',    p:0, ALL:'Medica II'         },
  'whm_medica3':           { id: 'WHM_MED3',    p:0, ALL:'Medica III'        },
  'whm_afflatus_rapture':  { id: 'WHM_RAPT',    p:0, ALL:'Afflatus Rapture'  },
  'whm_asylum':            { id: 'WHM_ASYL',    p:0, ALL:'Asylum'            },
  'whm_plenary_indulgence':{ id: 'WHM_PLEN',    p:0, ALL:'Plenary Indulgence'},
  'whm_temperance':        { id: 'WHM_TEMP',    p:0, ALL:'Temperance'        },
  'whm_liturgy_of_the_bell':{ id:'WHM_LOTB',    p:0, ALL:'Liturgy of the Bell'},
  'whm_divine_caress':     { id: 'WHM_DCAR',    p:0, ALL:'Divine Caress'     },

  // ── WHM Unique — Self Buffs & Utility ────────
  'whm_presence_of_mind':  { id: 'WHM_POM',     p:1, ALL:'Presence of Mind'  },
  'whm_thin_air':          { id: 'WHM_THIN',    p:1, ALL:'Thin Air'          },
  'whm_aetherial_shift':   { id: 'WHM_DASH',    p:1, ALL:'Aetherial Shift'   },

  // ── SCH Unique — Personal Heals ──────────────
  'sch_physick':           { id: 'SCH_PHY',   p:1, ALL:'Physick'            },
  'sch_lustrate':          { id: 'SCH_LUST',  p:1, ALL:'Lustrate'           },
  'sch_excogitation':      { id: 'SCH_EXCOG', p:1, ALL:'Excogitation'       },
  'sch_protraction':       { id: 'SCH_PROT',  p:1, ALL:'Protraction'        },
  'sch_resurrection':      { id: 'SCH_RES',   p:1, ALL:'Resurrection'       },

  // ── SCH Unique — Party Heals, Shields & Mits ─
  'sch_adloquium':         { id: 'SCH_ADLO',  p:0, ALL:'Adloquium'          },
  'sch_succor':            { id: 'SCH_SUCC',  p:0, ALL:'Succor'             },
  'sch_concitation':       { id: 'SCH_CONC',  p:0, ALL:'Concitation'        },
  'sch_whispering_dawn':   { id: 'SCH_WHSP',  p:0, ALL:'Whispering Dawn'    },
  'sch_fey_illumination':  { id: 'SCH_FEIL',  p:0, ALL:'Fey Illumination'   },
  'sch_sacred_soil':       { id: 'SCH_SOIL',  p:0, ALL:'Sacred Soil'        },
  'sch_indomitability':    { id: 'SCH_INDO',  p:0, ALL:'Indomitability'     },
  'sch_deployment_tactics':{ id: 'SCH_DEPL',  p:0, ALL:'Deployment Tactics' },
  'sch_fey_blessing':      { id: 'SCH_FEYB',  p:0, ALL:'Fey Blessing'       },
  'sch_consolation':       { id: 'SCH_CONS',  p:0, ALL:'Consolation'        },
  'sch_expedient':         { id: 'SCH_EXPE',  p:0, ALL:'Expedient'          },
  'sch_seraphism':         { id: 'SCH_SERA',  p:0, ALL:'Seraphism'          },

  // ── SCH Unique — Self Buffs & Utility ────────
  'sch_summon_eos':        { id: 'SCH_EOS',   p:1, ALL:'Summon Eos'         },
  'sch_aetherflow':        { id: 'SCH_AETH',  p:1, ALL:'Aetherflow'         },
  'sch_dissipation':       { id: 'SCH_DISS',  p:1, ALL:'Dissipation'        },
  'sch_emergency_tactics': { id: 'SCH_EMTC',  p:1, ALL:'Emergency Tactics'  },
  'sch_recitation':        { id: 'SCH_RECI',  p:1, ALL:'Recitation'         },
  'sch_aetherpact':        { id: 'SCH_AETP',  p:1, ALL:'Aetherpact'         },
  'sch_summon_seraph':     { id: 'SCH_SRPH',  p:1, ALL:'Summon Seraph'      },

  // ── AST Unique — Personal Heals ──────────────
  'ast_benefic':               { id: 'AST_BEN',   p:1, ALL:'Benefic'                  },
  'ast_benefic2':              { id: 'AST_BEN2',  p:1, ALL:'Benefic II'               },
  'ast_aspected_benefic':      { id: 'AST_ABEN',  p:1, ALL:'Aspected Benefic'         },
  'ast_essential_dignity':     { id: 'AST_ED',    p:1, ALL:'Essential Dignity'        },
  'ast_celestial_intersection':{ id: 'AST_CI',    p:1, ALL:'Celestial Intersection'   },
  'ast_exaltation':            { id: 'AST_EXAL',  p:1, ALL:'Exaltation'              },
  'ast_ascend':                { id: 'AST_RES',   p:1, ALL:'Ascend'                   },

  // ── AST Unique — Party Heals & Mits ──────────
  'ast_helios':                { id: 'AST_HEL',   p:0, ALL:'Helios'                   },
  'ast_aspected_helios':       { id: 'AST_AHEL',  p:0, ALL:'Aspected Helios'          },
  'ast_helios_conjunction':    { id: 'AST_HCON',  p:0, ALL:'Helios Conjunction'       },
  'ast_collective_unconscious':{ id: 'AST_CU',    p:0, ALL:'Collective Unconscious'   },
  'ast_celestial_opposition':  { id: 'AST_CO',    p:0, ALL:'Celestial Opposition'     },
  'ast_earthly_star':          { id: 'AST_STAR',  p:0, ALL:'Earthly Star'             },
  'ast_horoscope':             { id: 'AST_HORO',  p:0, ALL:'Horoscope'                },
  'ast_neutral_sect':          { id: 'AST_NS',    p:0, ALL:'Neutral Sect'             },
  'ast_macrocosmos':           { id: 'AST_MACRO', p:0, ALL:'Macrocosmos'              },
  'ast_microcosmos':           { id: 'AST_MICRO', p:0, ALL:'Microcosmos'              },
  'ast_sun_sign':              { id: 'AST_SUN',   p:0, ALL:'Sun Sign'                 },
  'ast_lady_of_crowns':        { id: 'AST_LADY',  p:0, ALL:'Lady of Crowns'           },

  // ── AST Unique — Cards ────────────────────────
  'ast_the_balance':           { id: 'AST_CARD',  p:1, ALL:'The Balance'              },
  'ast_the_spear':             { id: 'AST_CARD',  p:1, ALL:'The Spear'                },
  'ast_the_arrow':             { id: 'AST_CARD',  p:0, ALL:'The Arrow'                },
  'ast_the_bole':              { id: 'AST_CARD',  p:0, ALL:'The Bole'                 },
  'ast_the_spire':             { id: 'AST_CARD',  p:1, ALL:'The Spire'                },
  'ast_the_ewer':              { id: 'AST_CARD',  p:1, ALL:'The Ewer'                 },

  // ── AST Unique — Self Buffs & Utility ────────
  'ast_lightspeed':            { id: 'AST_LS',    p:1, ALL:'Lightspeed'               },
  'ast_divination':            { id: 'AST_DIV',   p:0, ALL:'Divination'               },
  'ast_synastry':              { id: 'AST_SYN',   p:1, ALL:'Synastry'                 },
  'ast_astral_draw':           { id: 'AST_DRAW',  p:1, ALL:'Astral Draw'              },
  'ast_umbral_draw':           { id: 'AST_DRAW',  p:1, ALL:'Umbral Draw'              },

  // ── SGE Unique — Personal Heals & Shields ────
  'sge_diagnosis':           { id: 'SGE_DIAG',  p:1, ALL:'Diagnosis'              },
  'sge_eukrasian_diagnosis': { id: 'SGE_EDIAG', p:1, ALL:'Eukrasian Diagnosis'    },
  'sge_druochole':           { id: 'SGE_DRUO',  p:1, ALL:'Druochole'              },
  'sge_taurochole':          { id: 'SGE_TAURO', p:1, ALL:'Taurochole'             },
  'sge_haima':               { id: 'SGE_HAIMA', p:1, ALL:'Haima'                  },
  'sge_krasis':              { id: 'SGE_KRAS',  p:1, ALL:'Krasis'                 },
  'sge_egeiro':              { id: 'SGE_RES',   p:1, ALL:'Egeiro'                 },

  // ── SGE Unique — Party Heals, Shields & Mits ─
  'sge_prognosis':           { id: 'SGE_PROG',  p:0, ALL:'Prognosis'              },
  'sge_eukrasian_prognosis': { id: 'SGE_EPROG', p:0, ALL:'Eukrasian Prognosis II' },
  'sge_physis':              { id: 'SGE_PHYS',  p:0, ALL:'Physis II'              },
  'sge_kerachole':           { id: 'SGE_KERA',  p:0, ALL:'Kerachole'              },
  'sge_ixochole':            { id: 'SGE_IXOC',  p:0, ALL:'Ixochole'               },
  'sge_pepsis':              { id: 'SGE_PEPS',  p:0, ALL:'Pepsis'                 },
  'sge_holos':               { id: 'SGE_HOLOS', p:0, ALL:'Holos'                  },
  'sge_panhaima':            { id: 'SGE_PANH',  p:0, ALL:'Panhaima'               },
  'sge_philosophia':         { id: 'SGE_PHIL',  p:0, ALL:'Philosophia'            },

  // ── SGE Unique — Self Buffs & Utility ────────
  'sge_kardia':              { id: 'SGE_KARD',  p:1, ALL:'Kardia'                 },
  'sge_eukrasia':            { id: 'SGE_EUK',   p:1, ALL:'Eukrasia'               },
  'sge_soteria':             { id: 'SGE_SOTER', p:1, ALL:'Soteria'                },
  'sge_zoe':                 { id: 'SGE_ZOE',   p:1, ALL:'Zoe'                    },
  'sge_icarus':              { id: 'SGE_ICAR',  p:1, ALL:'Icarus'                 },
  'sge_rhizomata':           { id: 'SGE_RHIZ',  p:1, ALL:'Rhizomata'              },

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