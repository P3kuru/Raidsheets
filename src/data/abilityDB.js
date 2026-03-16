const ROLE_COLORS = {
  t: "--blue",
  h: "--green",
  m: "--red",
  r: "--yellow",
  c: "--mauve",
};

const CASTER_JOBS = new Set(["BLM", "SMN", "RDM", "PCT"]);

function slotRole(slot, job) {
  if (slot === "T1" || slot === "T2") return "t";
  if (slot === "H1" || slot === "H2") return "h";
  if (slot === "M1" || slot === "M2") return "m";
  return CASTER_JOBS.has(job) ? "c" : "r";
}

export const ABILITY_DB = {
  // Tank shared
  tank_rep: { id: "T_REP", p: 0, ALL: "Reprisal" },
  tank_ramp: { id: "T_RAMP", p: 0, ALL: "Rampart" },
  tank_arms: { id: "T_AL", p: 0, ALL: "Arm's Length" },
  tank_low: { id: "T_LOW", p: 0, ALL: "Low Blow" },
  tank_int: { id: "T_INT", p: 0, ALL: "Interject" },

  // Paladin
  pld_hallowed: {
    id: "PLD_INV",
    job: "PLD",
    p: 1,
    ALL: "Hallowed Ground",
    col: "--red",
  },
  pld_guardian: { id: "PLD_40", job: "PLD", p: 1, ALL: "Guardian" },
  pld_bulwark: { id: "PLD_BUL", job: "PLD", p: 1, ALL: "Bulwark" },
  pld_sheltron: { id: "PLD_SHEL", job: "PLD", p: 1, ALL: "Holy Sheltron" },
  pld_veil: { id: "PLD_VEIL", job: "PLD", p: 1, ALL: "Divine Veil" },
  pld_passage: { id: "PLD_PASS", job: "PLD", p: 1, ALL: "Passage of Arms" },
  pld_inter: { id: "PLD_INT", job: "PLD", p: 1, ALL: "Intervention" },
  pld_cover: { id: "PLD_COV", job: "PLD", p: 1, ALL: "Cover" },
  pld_clemency: { id: "PLD_CLEM", job: "PLD", p: 1, ALL: "Clemency" },

  // Warrior
  war_holm: { id: "WAR_INV", job: "WAR", p: 1, ALL: "Holmgang" },
  war_damnation: { id: "WAR_40", job: "WAR", p: 1, ALL: "Damnation" },
  war_thrall: { id: "WAR_THR", job: "WAR", p: 1, ALL: "Thrill of Battle" },
  war_whetting: { id: "WAR_BW", job: "WAR", p: 1, ALL: "Bloodwhetting" },
  war_equi: { id: "WAR_EQU", job: "WAR", p: 1, ALL: "Equilibrium" },
  war_shake: { id: "WAR_SHK", job: "WAR", p: 1, ALL: "Shake It Off" },
  war_nascent: { id: "WAR_NAS", job: "WAR", p: 1, ALL: "Nascent Flash" },

  // Dark Knight
  drk_ld: { id: "DRK_INV", job: "DRK", p: 1, ALL: "Living Dead" },
  drk_shadowed: { id: "DRK_40", job: "DRK", p: 1, ALL: "Shadowed Vigil" },
  drk_oblation: { id: "DRK_OBL", job: "DRK", p: 1, ALL: "Oblation" },
  drk_black: { id: "DRK_TBN", job: "DRK", p: 1, ALL: "The Black Night" },
  drk_mind: { id: "DRK_DM", job: "DRK", p: 1, ALL: "Dark Mind" },
  drk_mission: { id: "DRK_MSN", job: "DRK", p: 1, ALL: "Dark Missionary" },

  // Gunbreaker
  gnb_bolide: { id: "GNB_INV", job: "GNB", p: 1, ALL: "Superbolide" },
  gnb_great: { id: "GNB_40", job: "GNB", p: 1, ALL: "Great Nebulae" },
  gnb_camo: { id: "GNB_CAM", job: "GNB", p: 1, ALL: "Camouflage" },
  gnb_heart: { id: "GNB_HOC", job: "GNB", p: 1, ALL: "Heart of Corundum" },
  gnb_aurora: { id: "GNB_AUR", job: "GNB", p: 1, ALL: "Aurora" },
  gnb_light: { id: "GNB_LGT", job: "GNB", p: 1, ALL: "Heart of Light" },

  // White Mage
  whm_cure: { id: "WHM_CURE", job: "WHM", p: 1, ALL: "Cure" },
  whm_cure2: { id: "WHM_CURE2", job: "WHM", p: 1, ALL: "Cure II" },
  whm_cure3: { id: "WHM_CURE3", job: "WHM", p: 1, ALL: "Cure III" },
  whm_regen: { id: "WHM_REGEN", job: "WHM", p: 1, ALL: "Regen" },
  whm_bene: { id: "WHM_BENE", job: "WHM", p: 1, ALL: "Benediction" },
  whm_tetra: { id: "WHM_TETRA", job: "WHM", p: 1, ALL: "Tetragrammaton" },
  whm_benis: { id: "WHM_BENIS", job: "WHM", p: 1, ALL: "Divine Benison" },
  whm_aqua: { id: "WHM_AQUA", job: "WHM", p: 1, ALL: "Aquaveil" },
  whm_med: { id: "WHM_MED", job: "WHM", p: 1, ALL: "Medica" },
  whm_med2: { id: "WHM_MED2", job: "WHM", p: 1, ALL: "Medica II" },
  whm_med3: { id: "WHM_MED3", job: "WHM", p: 1, ALL: "Medica III" },
  whm_asyl: { id: "WHM_ASYL", job: "WHM", p: 1, ALL: "Asylum" },
  whm_plen: { id: "WHM_PLEN", job: "WHM", p: 1, ALL: "Plenary Indulgence" },
  whm_temp: { id: "WHM_TEMP", job: "WHM", p: 1, ALL: "Temperance" },
  whm_lotb: { id: "WHM_LOTB", job: "WHM", p: 1, ALL: "Liturgy of the Bell" },
  whm_dcar: { id: "WHM_DCAR", job: "WHM", p: 1, ALL: "Divine Caress" },

  // Scholar
  sch_adlo: { id: "SCH_ADLO", job: "SCH", p: 1, ALL: "Adloquium" },
  sch_spreadlo: { id: "SCH_SPREADLO", job: "SCH", p: 0, ALL: "Spreadlo" },
  sch_succ: { id: "SCH_SUCC", job: "SCH", p: 1, ALL: "Succor" },
  sch_feil: { id: "SCH_FEIL", job: "SCH", p: 1, ALL: "Fey Illumination" },
  sch_soil: { id: "SCH_SOIL", job: "SCH", p: 1, ALL: "Sacred Soil" },
  sch_indo: { id: "SCH_INDO", job: "SCH", p: 1, ALL: "Indomitability" },
  sch_depl: { id: "SCH_DEPL", job: "SCH", p: 1, ALL: "Deployment Tactics" },
  sch_expe: { id: "SCH_EXPE", job: "SCH", p: 1, ALL: "Expedient" },
  sch_sera: { id: "SCH_SERA", job: "SCH", p: 1, ALL: "Seraphism" },
  sch_srph: { id: "SCH_SRPH", job: "SCH", p: 1, ALL: "Summon Seraph" },

  // Astrologian
  ast_cu: { id: "AST_CU", job: "AST", p: 1, ALL: "Collective Unconscious" },
  ast_ns: { id: "AST_NS", job: "AST", p: 1, ALL: "Neutral Sect" },
  ast_macro: { id: "AST_MACRO", job: "AST", p: 1, ALL: "Macrocosmos" },
  ast_sun: { id: "AST_SUN", job: "AST", p: 1, ALL: "Sun Sign" },
  ast_co: { id: "AST_CO", job: "AST", p: 1, ALL: "Celestial Opposition" },
  ast_star: { id: "AST_STAR", job: "AST", p: 1, ALL: "Earthly Star" },
  ast_exal: { id: "AST_EXAL", job: "AST", p: 1, ALL: "Exaltation" },

  // Sage
  sge_kera: { id: "SGE_KERA", job: "SGE", p: 1, ALL: "Kerachole" },
  sge_ixoc: { id: "SGE_IXOC", job: "SGE", p: 1, ALL: "Ixochole" },
  sge_holos: { id: "SGE_HOL", job: "SGE", p: 1, ALL: "Holos" },
  sge_panh: { id: "SGE_PAN", job: "SGE", p: 1, ALL: "Panhaima" },
  sge_phil: { id: "SGE_PHIL", job: "SGE", p: 1, ALL: "Philosophia" },
  sge_zoe: { id: "SGE_ZOE", job: "SGE", p: 1, ALL: "Zoe" },
  sge_eprog: { id: "SGE_EPR", job: "SGE", p: 1, ALL: "Eukrasian Prognosis" },

  // DPS shared
  melee_feint: { id: "M_FEINT", p: 1, ALL: "Feint", roleRestrict: "m" },
  cast_addle: { id: "C_ADDLE", p: 1, ALL: "Addle", roleRestrict: "c" },

  // Monk
  mnk_mantra: { id: "MNK_MAN", job: "MNK", p: 1, ALL: "Mantra" },
  mnk_brother: { id: "MNK_BRO", job: "MNK", p: 1, ALL: "Brotherhood" },
  mnk_riddle: { id: "MNK_RE", job: "MNK", p: 1, ALL: "Riddle of Earth" },

  // Dragoon
  drg_litany: { id: "DRG_LIT", job: "DRG", p: 1, ALL: "Battle Litany" },

  // Ninja
  nin_shade: { id: "NIN_SHA", job: "NIN", p: 1, ALL: "Shade Shift" },
  nin_tenri: { id: "NIN_TEN", job: "NIN", p: 1, ALL: "Tenri Jindo" },

  // Reaper
  rpr_crest: { id: "RPR_ARC", job: "RPR", p: 1, ALL: "Arcane Crest" },

  // Viper
  vpr_shroud: { id: "VPR_SHR", job: "VPR", p: 1, ALL: "Hardened Shroud" },

  // Bard
  brd_troub: { id: "BRD_TRO", job: "BRD", p: 1, ALL: "Troubadour" },
  brd_minne: { id: "BRD_MIN", job: "BRD", p: 1, ALL: "Nature's Minne" },

  // Machinist
  mch_tact: { id: "MCH_TAC", job: "MCH", p: 1, ALL: "Tactician" },
  mch_dismantle: { id: "MCH_DIS", job: "MCH", p: 1, ALL: "Dismantle" },

  // Dancer
  dnc_samba: { id: "DNC_SAM", job: "DNC", p: 1, ALL: "Shield Samba" },
  dnc_waltz: { id: "DNC_WLZ", job: "DNC", p: 1, ALL: "Curing Waltz" },

  // Black Mage
  blm_ward: { id: "BLM_MW", job: "BLM", p: 1, ALL: "Manaward" },

  // Summoner
  smn_aegis: { id: "SMN_AEG", job: "SMN", p: 1, ALL: "Radiant Aegis" },

  // Red Mage
  rdm_magick: { id: "RDM_MB", job: "RDM", p: 1, ALL: "Magick Barrier" },

  // Pictomancer
  pct_tempera: { id: "PCT_TEM", job: "PCT", p: 1, ALL: "Tempera Coat" },
  pct_gratias: { id: "PCT_GRA", job: "PCT", p: 1, ALL: "Tempera Gratias" },
};

export const AbilityEngine = {
  resolve(uID, job, slot) {
    if (!uID) return null;
    const entry = ABILITY_DB[uID.toLowerCase().trim()];
    if (entry) {
      if (entry.job && entry.job !== job) return null;
      if (entry.roleRestrict && slotRole(slot, job) !== entry.roleRestrict)
        return null;
      const name = entry[job] || entry.ALL;
      if (!name) return null;
      const roleCol = slot ? ROLE_COLORS[slotRole(slot, job)] : "--subtext0";
      const col = entry.p
        ? entry.pcol || entry.col || roleCol
        : entry.col || roleCol;
      return { name, type: entry.id, p: entry.p, col };
    }
    const col = slot ? ROLE_COLORS[slotRole(slot, job)] : "--subtext0";
    return { name: uID.trim(), type: "SPEC", p: 0, col };
  },
};

export const HEADER_COLS = [
  { slot: "T1", cls: "col-t", type: "tank" },
  { slot: "T2", cls: "col-t", type: "tank" },
  { slot: "H1", cls: "col-h", type: "healer" },
  { slot: "H2", cls: "col-h", type: "healer" },
  { slot: "M1", cls: "col-m", type: "melee" },
  { slot: "M2", cls: "col-m", type: "melee" },
  { slot: "R1", cls: "col-r", type: "ranged" },
  { slot: "R2", cls: "col-r", type: "ranged" },
];

export const JOB_OPTIONS = {
  tank: {
    jobs: [
      ["PLD", "Paladin", "pld"],
      ["WAR", "Warrior", "war"],
      ["DRK", "Dark Knight", "drk"],
      ["GNB", "Gunbreaker", "gnb"],
    ],
  },
  healer: {
    jobs: [
      ["WHM", "White Mage", "whm"],
      ["SCH", "Scholar", "sch"],
      ["AST", "Astrologian", "ast"],
      ["SGE", "Sage", "sge"],
    ],
  },
  melee: {
    jobs: [
      ["DRG", "Dragoon", "drg"],
      ["MNK", "Monk", "mnk"],
      ["SAM", "Samurai", "sam"],
      ["RPR", "Reaper", "rpr"],
      ["VPR", "Viper", "vpr"],
    ],
  },
  ranged: {
    jobs: [
      ["BRD", "Bard", "brd"],
      ["MCH", "Machinist", "mch"],
      ["DNC", "Dancer", "dnc"],
      ["BLM", "Black Mage", "blm"],
      ["SMN", "Summoner", "smn"],
      ["RDM", "Red Mage", "rdm"],
      ["PCT", "Pictomancer", "pct"],
    ],
  },
};
