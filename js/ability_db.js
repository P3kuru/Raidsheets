// Ability database to resolve ability IDs to display names, plus related metadata like personal vs. party, and pill colors.

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

// ABILITY DATABASE
const ABILITY_DB = {

  // Tank Shared 
  'tank_rep':       { id: 'T_REP',    p: 1, ALL: 'Reprisal' },
  'tank_ramp':      { id: 'T_RAMP',   p: 1, ALL: 'Rampart' },
  'tank_arms':      { id: 'T_AL',     p: 1, ALL: "Arm's Length" },
  'tank_low':       { id: 'T_LOW',    p: 1, ALL: 'Low Blow' },
  'tank_int':       { id: 'T_INT',    p: 1, ALL: 'Interject' },

  // Paladin
  'pld_hallowed':   { id: 'PLD_INV',  job: 'PLD', p: 1, ALL: 'Hallowed Ground' },
  'pld_guardian':   { id: 'PLD_40',   job: 'PLD', p: 1, ALL: 'Guardian' }, 
  'pld_bulwark':    { id: 'PLD_BUL',  job: 'PLD', p: 1, ALL: 'Bulwark' },
  'pld_sheltron':   { id: 'PLD_SHEL', job: 'PLD', p: 1, ALL: 'Holy Sheltron' },
  'pld_veil':       { id: 'PLD_VEIL', job: 'PLD', p: 1, ALL: 'Divine Veil' },
  'pld_passage':    { id: 'PLD_PASS', job: 'PLD', p: 1, ALL: 'Passage of Arms' },
  'pld_inter':      { id: 'PLD_INT',  job: 'PLD', p: 1, ALL: 'Intervention' },
  'pld_cover':      { id: 'PLD_COV',  job: 'PLD', p: 1, ALL: 'Cover' },
  'pld_clemency':   { id: 'PLD_CLEM', job: 'PLD', p: 1, ALL: 'Clemency' },

  // Warrior
  'war_holm':       { id: 'WAR_INV',  job: 'WAR', p: 1, ALL: 'Holmgang' },
  'war_damnation':  { id: 'WAR_40',   job: 'WAR', p: 1, ALL: 'Damnation' },
  'war_thrall':     { id: 'WAR_THR',  job: 'WAR', p: 1, ALL: 'Thrill of Battle' },
  'war_whetting':   { id: 'WAR_BW',   job: 'WAR', p: 1, ALL: 'Bloodwhetting' },
  'war_equi':       { id: 'WAR_EQU',  job: 'WAR', p: 1, ALL: 'Equilibrium' },
  'war_shake':      { id: 'WAR_SHK',  job: 'WAR', p: 1, ALL: 'Shake It Off' },
  'war_nascent':    { id: 'WAR_NAS',  job: 'WAR', p: 1, ALL: 'Nascent Flash' },

  // Dark Knight
  'drk_ld':         { id: 'DRK_INV',  job: 'DRK', p: 1, ALL: 'Living Dead' },
  'drk_shadowed':   { id: 'DRK_40',   job: 'DRK', p: 1, ALL: 'Shadowed Vigil' },
  'drk_oblation':   { id: 'DRK_OBL',  job: 'DRK', p: 1, ALL: 'Oblation' },
  'drk_black':      { id: 'DRK_TBN',  job: 'DRK', p: 1, ALL: 'The Black Night' },
  'drk_mind':       { id: 'DRK_DM',   job: 'DRK', p: 1, ALL: 'Dark Mind' },
  'drk_mission':    { id: 'DRK_MSN',  job: 'DRK', p: 1, ALL: 'Dark Missionary' },

  // Gunbreaker
  'gnb_bolide':     { id: 'GNB_INV',  job: 'GNB', p: 1, ALL: 'Superbolide' },
  'gnb_great':      { id: 'GNB_40',   job: 'GNB', p: 1, ALL: 'Great Nebulae' },
  'gnb_camo':       { id: 'GNB_CAM',  job: 'GNB', p: 1, ALL: 'Camouflage' },
  'gnb_heart':      { id: 'GNB_HOC',  job: 'GNB', p: 1, ALL: 'Heart of Corundum' },
  'gnb_aurora':     { id: 'GNB_AUR',  job: 'GNB', p: 1, ALL: 'Aurora' },
  'gnb_light':      { id: 'GNB_LGT',  job: 'GNB', p: 1, ALL: 'Heart of Light' },

  // White Mage
  'whm_cure':   { id: 'WHM_CURE',   job:'WHM', p:1, ALL:'Cure'              },
  'whm_cure2':  { id: 'WHM_CURE2',  job:'WHM', p:1, ALL:'Cure II'           },
  'whm_cure3':  { id: 'WHM_CURE3',  job:'WHM', p:1, ALL:'Cure III'          },
  'whm_regen':  { id: 'WHM_REGEN',  job:'WHM', p:1, ALL:'Regen'             },
  'whm_raise':  { id: 'WHM_RAISE',  job:'WHM', p:1, ALL:'Raise'             },
  'whm_solace': { id: 'WHM_SOLACE', job:'WHM', p:1, ALL:'Afflatus Solace'   },
  'whm_bene':   { id: 'WHM_BENE',   job:'WHM', p:1, ALL:'Benediction'       },
  'whm_tetra':  { id: 'WHM_TETRA',  job:'WHM', p:1, ALL:'Tetragrammaton'    },
  'whm_benis':  { id: 'WHM_BENIS',  job:'WHM', p:1, ALL:'Divine Benison'    },
  'whm_aqua':   { id: 'WHM_AQUA',   job:'WHM', p:1, ALL:'Aquaveil'          },
  'whm_med':    { id: 'WHM_MED',    job:'WHM', p:1, ALL:'Medica'            },
  'whm_med2':   { id: 'WHM_MED2',   job:'WHM', p:1, ALL:'Medica II'         },
  'whm_med3':   { id: 'WHM_MED3',   job:'WHM', p:1, ALL:'Medica III'        },
  'whm_rapt':   { id: 'WHM_RAPT',   job:'WHM', p:1, ALL:'Afflatus Rapture'  },
  'whm_asyl':   { id: 'WHM_ASYL',   job:'WHM', p:1, ALL:'Asylum'            },
  'whm_plen':   { id: 'WHM_PLEN',   job:'WHM', p:1, ALL:'Plenary Indulgence'},
  'whm_temp':   { id: 'WHM_TEMP',   job:'WHM', p:1, ALL:'Temperance'        },
  'whm_lotb':   { id: 'WHM_LOTB',   job:'WHM', p:1, ALL:'Liturgy of the Bell'},
  'whm_dcar':   { id: 'WHM_DCAR',   job:'WHM', p:1, ALL:'Divine Caress'     },
  'whm_pom':    { id: 'WHM_POM',    job:'WHM', p:1, ALL:'Presence of Mind'  },
  'whm_thin':   { id: 'WHM_THIN',   job:'WHM', p:1, ALL:'Thin Air'          },
  'whm_dash':   { id: 'WHM_DASH',   job:'WHM', p:1, ALL:'Aetherial Shift'   },

  // Scholar
  'sch_phy':    { id: 'SCH_PHY',    job:'SCH', p:1, ALL:'Physick'            },
  'sch_lust':   { id: 'SCH_LUST',   job:'SCH', p:1, ALL:'Lustrate'           },
  'sch_excog':  { id: 'SCH_EXCOG',  job:'SCH', p:1, ALL:'Excogitation'       },
  'sch_prot':   { id: 'SCH_PROT',   job:'SCH', p:1, ALL:'Protraction'        },
  'sch_res':    { id: 'SCH_RES',    job:'SCH', p:1, ALL:'Resurrection'       },
  'sch_adlo':   { id: 'SCH_ADLO',   job:'SCH', p:1, ALL:'Adloquium'          },
  'sch_succ':   { id: 'SCH_SUCC',   job:'SCH', p:1, ALL:'Succor'             },
  'sch_conc':   { id: 'SCH_CONC',   job:'SCH', p:1, ALL:'Concitation'        },
  'sch_whsp':   { id: 'SCH_WHSP',   job:'SCH', p:1, ALL:'Whispering Dawn'    },
  'sch_feil':   { id: 'SCH_FEIL',   job:'SCH', p:1, ALL:'Fey Illumination'   },
  'sch_soil':   { id: 'SCH_SOIL',   job:'SCH', p:1, ALL:'Sacred Soil'        },
  'sch_indo':   { id: 'SCH_INDO',   job:'SCH', p:1, ALL:'Indomitability'     },
  'sch_depl':   { id: 'SCH_DEPL',   job:'SCH', p:1, ALL:'Deployment Tactics' },
  'sch_feyb':   { id: 'SCH_FEYB',   job:'SCH', p:1, ALL:'Fey Blessing'       },
  'sch_cons':   { id: 'SCH_CONS',   job:'SCH', p:1, ALL:'Consolation'        },
  'sch_expe':   { id: 'SCH_EXPE',   job:'SCH', p:1, ALL:'Expedient'          },
  'sch_sera':   { id: 'SCH_SERA',   job:'SCH', p:1, ALL:'Seraphism'          },
  'sch_eos':    { id: 'SCH_EOS',    job:'SCH', p:1, ALL:'Summon Eos'         },
  'sch_aeth':   { id: 'SCH_AETH',   job:'SCH', p:1, ALL:'Aetherflow'         },
  'sch_diss':   { id: 'SCH_DISS',   job:'SCH', p:1, ALL:'Dissipation'        },
  'sch_emtc':   { id: 'SCH_EMTC',   job:'SCH', p:1, ALL:'Emergency Tactics'  },
  'sch_reci':   { id: 'SCH_RECI',   job:'SCH', p:1, ALL:'Recitation'         },
  'sch_aetp':   { id: 'SCH_AETP',   job:'SCH', p:1, ALL:'Aetherpact'         },
  'sch_srph':   { id: 'SCH_SRPH',   job:'SCH', p:1, ALL:'Summon Seraph'      },

  // Astrologian
  'ast_ben':    { id: 'AST_BEN',    job:'AST', p:1, ALL:'Benefic'                  },
  'ast_ben2':   { id: 'AST_BEN2',   job:'AST', p:1, ALL:'Benefic II'               },
  'ast_aben':   { id: 'AST_ABEN',   job:'AST', p:1, ALL:'Aspected Benefic'         },
  'ast_ed':     { id: 'AST_ED',     job:'AST', p:1, ALL:'Essential Dignity'        },
  'ast_ci':     { id: 'AST_CI',     job:'AST', p:1, ALL:'Celestial Intersection'   },
  'ast_exal':   { id: 'AST_EXAL',   job:'AST', p:1, ALL:'Exaltation'               },
  'ast_res':    { id: 'AST_RES',    job:'AST', p:1, ALL:'Ascend'                   },
  'ast_hel':    { id: 'AST_HEL',    job:'AST', p:1, ALL:'Helios'                   },
  'ast_ahel':   { id: 'AST_AHEL',   job:'AST', p:1, ALL:'Aspected Helios'          },
  'ast_hcon':   { id: 'AST_HCON',   job:'AST', p:1, ALL:'Helios Conjunction'       },
  'ast_cu':     { id: 'AST_CU',     job:'AST', p:1, ALL:'Collective Unconscious'   },
  'ast_co':     { id: 'AST_CO',     job:'AST', p:1, ALL:'Celestial Opposition'     },
  'ast_star':   { id: 'AST_STAR',   job:'AST', p:1, ALL:'Earthly Star'             },
  'ast_horo':   { id: 'AST_HORO',   job:'AST', p:1, ALL:'Horoscope'                },
  'ast_ns':     { id: 'AST_NS',     job:'AST', p:1, ALL:'Neutral Sect'             },
  'ast_macro':  { id: 'AST_MACRO',  job:'AST', p:1, ALL:'Macrocosmos'              },
  'ast_micro':  { id: 'AST_MICRO',  job:'AST', p:1, ALL:'Microcosmos'              },
  'ast_sun':    { id: 'AST_SUN',    job:'AST', p:1, ALL:'Sun Sign'                 },
  'ast_lady':   { id: 'AST_LADY',   job:'AST', p:1, ALL:'Lady of Crowns'           },
  'ast_balance':{ id: 'AST_CARD',   job:'AST', p:1, ALL:'The Balance'              },
  'ast_spear':  { id: 'AST_CARD',   job:'AST', p:1, ALL:'The Spear'                },
  'ast_arrow':  { id: 'AST_CARD',   job:'AST', p:1, ALL:'The Arrow'                },
  'ast_bole':   { id: 'AST_CARD',   job:'AST', p:1, ALL:'The Bole'                 },
  'ast_spire':  { id: 'AST_CARD',   job:'AST', p:1, ALL:'The Spire'                },
  'ast_ewer':   { id: 'AST_CARD',   job:'AST', p:1, ALL:'The Ewer'                 },
  'ast_ls':     { id: 'AST_LS',     job:'AST', p:1, ALL:'Lightspeed'               },
  'ast_div':    { id: 'AST_DIV',    job:'AST', p:1, ALL:'Divination'               },
  'ast_syn':    { id: 'AST_SYN',    job:'AST', p:1, ALL:'Synastry'                 },
  'ast_adraw':  { id: 'AST_ADRAW',  job:'AST', p:1, ALL:'Astral Draw'              },
  'ast_udraw':  { id: 'AST_UDRAW',  job:'AST', p:1, ALL:'Umbral Draw'              },

  // Sage
  'sge_diag':   { id: 'SGE_DIAG',   job:'SGE', p:1, ALL:'Diagnosis'              },
  'sge_ediag':  { id: 'SGE_EDIAG',  job:'SGE', p:1, ALL:'Eukrasian Diagnosis'    },
  'sge_druo':   { id: 'SGE_DRUO',   job:'SGE', p:1, ALL:'Druochole'              },
  'sge_tauro':  { id: 'SGE_TAURO',  job:'SGE', p:1, ALL:'Taurochole'             },
  'sge_haima':  { id: 'SGE_HAIMA',  job:'SGE', p:1, ALL:'Haima'                  },
  'sge_kras':   { id: 'SGE_KRAS',   job:'SGE', p:1, ALL:'Krasis'                 },
  'sge_res':    { id: 'SGE_RES',    job:'SGE', p:1, ALL:'Egeiro'                 },
  'sge_prog':   { id: 'SGE_PROG',   job:'SGE', p:1, ALL:'Prognosis'              },
  'sge_eprog':  { id: 'SGE_EPROG',  job:'SGE', p:1, ALL:'Eukrasian Prognosis II' },
  'sge_phys':   { id: 'SGE_PHYS',   job:'SGE', p:1, ALL:'Physis II'              },
  'sge_kera':   { id: 'SGE_KERA',   job:'SGE', p:1, ALL:'Kerachole'              },
  'sge_ixoc':   { id: 'SGE_IXOC',   job:'SGE', p:1, ALL:'Ixochole'               },
  'sge_peps':   { id: 'SGE_PEPS',   job:'SGE', p:1, ALL:'Pepsis'                 },
  'sge_holos':  { id: 'SGE_HOLOS',  job:'SGE', p:1, ALL:'Holos'                  },
  'sge_panh':   { id: 'SGE_PANH',   job:'SGE', p:1, ALL:'Panhaima'               },
  'sge_phil':   { id: 'SGE_PHIL',   job:'SGE', p:1, ALL:'Philosophia'            },
  'sge_kard':   { id: 'SGE_KARD',   job:'SGE', p:1, ALL:'Kardia'                 },
  'sge_euk':    { id: 'SGE_EUK',    job:'SGE', p:1, ALL:'Eukrasia'               },
  'sge_soter':  { id: 'SGE_SOTER',  job:'SGE', p:1, ALL:'Soteria'                },
  'sge_zoe':    { id: 'SGE_ZOE',    job:'SGE', p:1, ALL:'Zoe'                    },
  'sge_icar':   { id: 'SGE_ICAR',   job:'SGE', p:1, ALL:'Icarus'                 },
  'sge_rhiz':   { id: 'SGE_RHIZ',   job:'SGE', p:1, ALL:'Rhizomata'              },

  // DPS Shared
  'melee_feint':    { id: 'M_FEINT', p: 1, ALL: 'Feint' },
  'cast_addle':     { id: 'C_ADDLE', p: 1, ALL: 'Addle' },

   // Monk 
  'mnk_mantra':     { id: 'MNK_MAN', job: 'MNK', p: 1, ALL: 'Mantra' },
  'mnk_brother':    { id: 'MNK_BRO', job: 'MNK', p: 1, ALL: 'Brotherhood' },
  'mnk_riddle':     { id: 'MNK_RE',  job: 'MNK', p: 1, ALL: 'Riddle of Earth' },

  // Dragoon
  'drg_litany':     { id: 'DRG_LIT', job: 'DRG', p: 1, ALL: 'Battle Litany' },
  'drg_sight':      { id: 'DRG_DS',  job: 'DRG', p: 1, ALL: 'Dragon Sight' },

  // Ninja
  'nin_shade':      { id: 'NIN_SHA', job: 'NIN', p: 1, ALL: 'Shade Shift' },
  'nin_tenri':      { id: 'NIN_TEN', job: 'NIN', p: 1, ALL: 'Tenri Jindo' },

  // Samurai
  'sam_third':      { id: 'SAM_TE',  job: 'SAM', p: 1, ALL: 'Third Eye' },

  // Reaper
  'rpr_crest':      { id: 'RPR_ARC', job: 'RPR', p: 1, ALL: 'Arcane Crest' },

  // Viper
  'vpr_shroud':     { id: 'VPR_SHR', job: 'VPR', p: 1, ALL: 'Hardened Shroud' },

  // Bard
  'brd_troub':      { id: 'BRD_TRO', job: 'BRD', p: 1, ALL: 'Troubadour' },
  'brd_minne':      { id: 'BRD_MIN', job: 'BRD', p: 1, ALL: "Nature's Minne" },
  'brd_paean':      { id: 'BRD_PAE', job: 'BRD', p: 1, ALL: "The Warden's Paean" },

  // Machinist
  'mch_tact':       { id: 'MCH_TAC', job: 'MCH', p: 1, ALL: 'Tactician' },
  'mch_dismantle':  { id: 'MCH_DIS', job: 'MCH', p: 1, ALL: 'Dismantle' },

  // Dancer
  'dnc_samba':      { id: 'DNC_SAM', job: 'DNC', p: 1, ALL: 'Shield Samba' },
  'dnc_waltz':      { id: 'DNC_WLZ', job: 'DNC', p: 1, ALL: 'Curing Waltz' },
  'dnc_improv':     { id: 'DNC_IMP', job: 'DNC', p: 1, ALL: 'Improvisation' },
  'dnc_finish':     { id: 'DNC_FIN', job: 'DNC', p: 1, ALL: 'Finishing Move' },

  // Black Mage
  'blm_ward':       { id: 'BLM_MW',  job: 'BLM', p: 1, ALL: 'Manaward' },

  // Summoner
  'smn_aegis':      { id: 'SMN_AEG', job: 'SMN', p: 1, ALL: 'Radiant Aegis' },
  'smn_lux':        { id: 'SMN_LUX', job: 'SMN', p: 1, ALL: 'Solar Bahamut (Lux)' },
  'smn_swift':      { id: 'SMN_SWI', job: 'SMN', p: 1, ALL: 'Swiftcast' },

  // Red Mage
  'rdm_magick':     { id: 'RDM_MB',  job: 'RDM', p: 1, ALL: 'Magick Barrier' },
  'rdm_verraise':   { id: 'RDM_REZ', job: 'RDM', p: 1, ALL: 'Verraise' },
  'rdm_vheal':      { id: 'RDM_VHL', job: 'RDM', p: 1, ALL: 'Vercure' },

  // Pictomancer
  'pct_tempera':    { id: 'PCT_TEM', job: 'PCT', p: 1, ALL: 'Tempera Coat' },
  'pct_gratias':    { id: 'PCT_GRA', job: 'PCT', p: 1, ALL: 'Tempera Gratias' },
  'pct_starry':     { id: 'PCT_MUS', job: 'PCT', p: 1, ALL: 'Starry Muse' },
};

const AbilityEngine = {
  resolve(uID, job, slot) {
    if (!uID) return null;
    const entry = ABILITY_DB[uID.toLowerCase().trim()];
    if (entry) {
      if (entry.job && entry.job !== job) return null;
      const name = entry[job] || entry.ALL;
      if (!name) return null;
      const roleCol = slot ? ROLE_COLORS[slotRole(slot, job)] : '--subtext0';
      const col = entry.p
        ? (entry.pcol || entry.col || roleCol)
        : (entry.col  || roleCol);
      return { name, type: entry.id, p: entry.p, col };
    }
    const col = slot ? ROLE_COLORS[slotRole(slot, job)] : '--subtext0';
    return { name: uID.trim(), type: 'SPEC', p: 0, col };
  }
};

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

const JOB_OPTIONS = {
  tank: {
    icon: '../images/icons/roletank.png',
    jobs: [
      ['PLD', 'Paladin',     '../images/icons/pld.png'],
      ['WAR', 'Warrior',     '../images/icons/war.png'],
      ['DRK', 'Dark Knight', '../images/icons/drk.png'],
      ['GNB', 'Gunbreaker',  '../images/icons/gnb.png'],
    ],
  },
  healer: {
    icon: '../images/icons/rolehealer.png',
    jobs: [
      ['WHM', 'White Mage',  '../images/icons/whm.png'],
      ['SCH', 'Scholar',     '../images/icons/sch.png'],
      ['AST', 'Astrologian', '../images/icons/ast.png'],
      ['SGE', 'Sage',        '../images/icons/sge.png'],
    ],
  },
  melee: {
    icon: '../images/icons/roledeeps.png',
    jobs: [
      ['DRG', 'Dragoon', '../images/icons/drg.png'],
      ['MNK', 'Monk',    '../images/icons/mnk.png'],
      ['SAM', 'Samurai', '../images/icons/sam.png'],
      ['RPR', 'Reaper',  '../images/icons/rpr.png'],
      ['VPR', 'Viper',   '../images/icons/vpr.png'],
    ],
  },
  ranged: {
    icon: '../images/icons/roledeeps.png',
    jobs: [
      ['BRD', 'Bard',        '../images/icons/brd.png'],
      ['MCH', 'Machinist',   '../images/icons/mch.png'],
      ['DNC', 'Dancer',      '../images/icons/dnc.png'],
      ['BLM', 'Black Mage',  '../images/icons/blm.png'],
      ['SMN', 'Summoner',    '../images/icons/smn.png'],
      ['RDM', 'Red Mage',    '../images/icons/rdm.png'],
      ['PCT', 'Pictomancer', '../images/icons/pct.png'],
    ],
  },
};