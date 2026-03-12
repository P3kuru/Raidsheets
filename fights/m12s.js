// ═══════════════════════════════════════════════════════════════
//  m12s.js — The Cargo
//  M12S Lindwurm fight data.
//  All cell values use IDs from ability_db.js.
//  Separators: use + or , (both supported by the engine).
//  Literal strings (e.g. "Kitchen Sink") pass through as-is.
// ═══════════════════════════════════════════════════════════════

const FIGHT_CONFIG = {

  title:       'M12S',
  subtitle:    'Lindwurm',
  lastUpdated: '11/03/2026',

  phases: [
    {
      id:   'p1',
      name: 'Phase 1',
      notes: [
        'All mechanics require shields.',
        'For the Slaughtersheds, delay 15s mitigation until the later half of the cast bar so it covers both the spread and stack damage.',
      ],
      data: [
        // time    mech                                       T1                     T2                     H1                   H2                         M1        M2        R1      R2
        [ '0:16', 'The Fixer',                               't_rep',               't_pmit',              'h_soil',            'zoe_shields+h_soil',      'd_feint', null,     'd_mit','d_addle' ],
        [ '1:20', 'Mortal Slayer',                           't_ramp+t_90s+t_short','t_ramp+t_90s+t_short', null,               'h_soil',                  null,      null,     null,   null      ],
        [ '1:28', 'Ravenous Reach',                          't_pmit',              't_rep',               'h_120+h_cap',        'h_120+h_burst+h_cap',     null,      'd_feint',null,   null      ],
        [ '1:37', 'Fourth-wall Fusion / Visceral Burst',     't_rep+t_40+t_short',  't_40+t_short',        'h_burst',            'zoe_shields+h_soil',      'd_feint', null,     'd_mit','d_addle' ],
        [ '1:48', 'The Fixer',                               null,                  't_pmit',              'h_soil',             null,                      null,      null,     null,   null      ],
        [ '3:08', 'Splattershed',                            null,                  null,                  null,                 'h_soil',                  null,      'd_feint',null,   null      ],
        [ '3:49', 'Split Scourge',                           't_inv',               't_inv',               null,                 null,                      null,      null,     null,   null      ],
        [ '3:51', 'Venomous Scourge',                        't_rep',               null,                  null,                 'h_burst+h_soil+zoe_shields','d_feint',null,    'd_mit','d_addle' ],
        [ '4:01', 'The Fixer',                               null,                  't_pmit',              'h_soil',             null,                      null,      null,     null,   null      ],
        [ '4:28', 'Ravenous Reach',                          't_pmit',              't_rep',               'h_120+h_cap',        'h_120',                   null,      null,     null,   null      ],
        [ '4:50', 'Splattershed',                            't_rep',               null,                  null,                 'h_soil',                  null,      'd_feint',null,   null      ],
        [ '5:15', 'Mortal Slayer',                           'Kitchen Sink',        'Kitchen Sink',        null,                 'Eukrasian Prognosis',     null,      null,     null,   null      ],
        [ '5:42', 'Slaughtershed I',                         null,                  't_rep',               'h_soil',             'h_soil+h_cap',            'd_feint', null,     null,   'd_addle' ],
        [ '6:11', 'Slaughtershed II',                        't_rep',               't_pmit',              'h_burst',            'h_soil+h_burst+zoe_shields',null,    null,     'd_mit',null      ],
        [ '6:40', 'Slaughtershed III',                       't_pmit',              't_rep',               'h_soil+h_120+h_cap', 'h_soil+h_120',            null,      'd_feint',null,   null      ],
      ],
    },
    {
      id:   'p2',
      name: 'Phase 2',
      notes: [
        'All mechanics require shields.',
        "Using 15s mitigation late for Lindwurm's Meteor will also cover Arcadian Arcanum.",
        'Arcadian Hell I and II are ~16s apart — 20s mitigation covers both. Sacred Soil covers both if used late; Kerachole only covers one.',
        'Healers: keep spare single-target heals and mits on the MT throughout — autos average ~70,000 per hit.',
      ],
      data: [
        // time    mech                                       T1                     T2                     H1                   H2                         M1        M2        R1      R2
        [ '0:17', 'Arcadia Aflame',                          't_rep',               't_pmit',              'h_soil',             'h_120+h_soil',            'd_feint', null,     'd_mit','d_addle' ],
        [ '0:40', 'Mighty Magic / Top-tier Slam I',          null,                  null,                  'h_120',              'h_burst+zoe_shields',     null,      null,     null,   null      ],
        [ '1:01', 'Mighty Magic / Top-tier Slam II',         't_pmit',              't_rep',               'h_cap',              'h_soil',                  null,      'd_feint',null,   null      ],
        [ '1:10', 'Double Sabat',                            't_inv',               'Kitchen Sink',        null,                 null,                      null,      null,     null,   null      ],
        [ '2:08', 'Firefall Splash',                         't_rep',               't_pmit',              'h_burst',            'h_cap+h_120+h_soil',      'd_feint', null,     'd_mit','d_addle' ],
        [ '2:41', 'Reenactment',                             't_pmit',              't_rep',               'h_soil+h_120+h_cap', 'zoe_shields+h_burst+h_soil',null,    'd_feint',null,   null      ],
        [ '3:22', 'Blood Mana',                              't_ramp+t_short',      't_ramp+t_short',      null,                 'h_soil',                  null,      null,     null,   null      ],
        [ '3:50', 'Netherworld Near/Far',                    't_rep',               null,                  'h_soil',             'h_soil',                  'd_feint', null,     'd_mit','d_addle' ],
        [ '3:58', 'Arcadia Aflame',                          null,                  't_pmit',              null,                 null,                      null,      null,     null,   null      ],
        [ '4:06', 'Double Sabat',                            'Kitchen Sink',        't_inv',               null,                 null,                      null,      null,     null,   null      ],
        [ '4:30', 'Idyllic Dream',                           't_pmit',              't_rep',               null,                 'h_120+zoe_shields+h_soil', null,     'd_feint',null,   null      ],
        [ '5:45', "Lindwurm's Meteor",                       't_rep',               't_pmit',              'h_soil',             'h_soil',                  'd_feint', null,     'd_mit','d_addle' ],
        [ '6:12', 'Twisted Vision',                          't_pmit',              null,                  'Everything',         null,                      'Use Personals',null,null,   null      ],
        [ '7:20', 'Reenactment + Twisted Vision',            't_rep',               't_pmit',              null,                 'h_soil',                  null,      'd_feint','d_mit',null      ],
        [ '7:53', 'Idyllic Dream',                           't_pmit',              't_rep',               'h_soil',             'h_soil',                  'd_feint', null,     null,   'd_addle' ],
        [ '8:01', 'Double Sabat',                            't_inv',               'Kitchen Sink',        null,                 null,                      null,      null,     null,   null      ],
        [ '8:36', 'Arcadian Hell I',                         't_rep',               null,                  'h_120',              'h_120',                   null,      null,     null,   null      ],
        [ '8:52', 'Arcadian Hell II',                        null,                  't_rep+t_pmit',        'h_soil+h_cap',       'zoe_shields+h_burst+h_soil',null,    'd_feint','d_mit',null      ],
      ],
    },
  ],
};
