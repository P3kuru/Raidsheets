export const FIGHTS = [
  {
    patch: "7.4",
    label: "Dawntrail · Patch 7.4",
    fights: [
      {
        id: "m12s",
        name: "M12S",
        subtitle: "AAC Heavyweight M4",
        type: "savage",
        hasSheet: true,
      },
      {
        id: "m11s",
        name: "M11S",
        subtitle: "AAC Heavyweight M3",
        type: "savage",
        hasSheet: false,
      },
      {
        id: "m10s",
        name: "M10S",
        subtitle: "AAC Heavyweight M2",
        type: "savage",
        hasSheet: false,
      },
      {
        id: "m9s",
        name: "M9S",
        subtitle: "AAC Heavyweight M1",
        type: "savage",
        hasSheet: false,
      },
    ],
  },
  {
    patch: "ultimates",
    label: "Ultimates",
    fights: [
      {
        id: "fru",
        name: "FRU",
        subtitle: "Futures Rewritten",
        type: "ultimate",
        hasSheet: false,
      },
      {
        id: "top",
        name: "TOP",
        subtitle: "The Omega Protocol",
        type: "ultimate",
        hasSheet: false,
      },
      {
        id: "dsr",
        name: "DSR",
        subtitle: "Dragonsong's Reprise",
        type: "ultimate",
        hasSheet: false,
      },
      {
        id: "tea",
        name: "TEA",
        subtitle: "The Epic of Alexander",
        type: "ultimate",
        hasSheet: false,
      },
      {
        id: "uwu",
        name: "UWU",
        subtitle: "The Weapon's Refrain",
        type: "ultimate",
        hasSheet: false,
      },
      {
        id: "ucob",
        name: "UCoB",
        subtitle: "Unending Coil of Bahamut",
        type: "ultimate",
        hasSheet: false,
      },
    ],
  },
];

export const ALL_FIGHTS = FIGHTS.flatMap((g) => g.fights);
