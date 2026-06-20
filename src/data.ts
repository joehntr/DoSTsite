/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, FolderBlurb, ShopItem } from './types';

// Asset paths
export const ASSETS = {
  logo: 'src/assets/images/DoSTlogo.png',
  logoBadge: 'src/assets/images/DoSTlogoBadge.png',
  stickerAlien: 'src/assets/images/sticker_alien_1779958948909.png',
  stickerAvatar: 'src/assets/images/sticker_avatar_hunter_1779958970783.png',
};

export const PROJECTS: Project[] = [
  {
    "id": "emblem-03",
    "title": "Pencil Knot",
    "subtitle": "COGNITIVE ALPHABET ORBITER",
    "description": "",
    "additionalInfo": [
      "The central letter displays infinite depth when viewed through a polarizing stencil.",
      "Surrounded by a high-intensity hot pink visual bubble that repels rain and dew particles.",
      "Form coordinates remain perfectly stationary regardless of tectonic shifts."
    ],
    "image": "src/assets/images/Project3.png",
    "medium": "Ink, Starry Pattern Overlay & 3D Offset",
    "date": "2025",
    "client": "Self-Initiated Graphic Study",
    "anomalyLevel": "SAFE",
    "coordinates": "Polaris Delta-9",
    "classificationCode": "D.ST-SYM-0099"
  },
  {
    "id": "rose-07",
    "title": "Counterspell",
    "subtitle": "ORGANIC TEMPORAL STYLING",
    "description": "",
    "additionalInfo": [
      "Stippled inks consist of microscopic dark iron oxide which responds to localized electromagnetic waves.",
      "Slightly warm to the touch (constant 31°C).",
      "Releases a mild scent of fresh mountain pine and old comic papers."
    ],
    "image": "src/assets/images/Project7.png",
    "medium": "American Traditional Ink & Dotwork",
    "date": "2024",
    "client": "Iron & Petals Parlor",
    "anomalyLevel": "SAFE",
    "coordinates": "Section 4, Row B-Grave",
    "classificationCode": "D.ST-ECO-0221"
  },
  {
    "id": "project-08",
    "title": "Cruzin'",
    "subtitle": "CLASSIFIED INVESTIGATION ASSET",
    "description": "",
    "additionalInfo": [
      "Underwent thorough validation checks by the Senior Compiler.",
      "Maintains pristine geometric properties regardless of medium rotation."
    ],
    "image": "src/assets/images/Project8.png",
    "medium": "Digital Ink Poster",
    "date": "2025",
    "client": "The Dept. of Strange Things",
    "anomalyLevel": "SAFE",
    "coordinates": "Sector 8-K Archive",
    "classificationCode": "D.ST-DOC-0824"
  },
  {
    "id": "roll-02",
    "title": "Totally Wizard",
    "subtitle": "KINETIC MOMENTUM PROPULSION",
    "description": "",
    "additionalInfo": [
      "The subject demonstrates extreme propulsion thresholds to typical drag laws.",
      "Features a signature magenta and lime chromatic offset signature.",
      "Saturates surrounding graphic media with positive, high-intensity playful kinetic feedback."
    ],
    "image": "src/assets/images/Project2.png",
    "medium": "Risograph Vector Illustration",
    "date": "2024",
    "client": "Subway Shufflers Association",
    "anomalyLevel": "SAFE",
    "coordinates": "40.7128° N, 74.0060° W",
    "classificationCode": "D.ST-KINET-5509"
  },
  {
    "id": "pilot-05",
    "title": "BONE TO BE WILD",
    "subtitle": "DEPT. PHANTOM LEADER",
    "description": "",
    "additionalInfo": [
      "Goggles emit a low click-hum when active.",
      "Text emblazoned on collar collar triggers strong commands of adventure and rebellion in reader subjects.",
      "Retained original vocal cords which occasionally recite radio transmissions from 1952."
    ],
    "image": "src/assets/images/Project5.png",
    "medium": "Sumi Ink & Digital Screenprint Duo-Tone",
    "date": "2024",
    "client": "104th Phantom Squadron",
    "anomalyLevel": "EUCLID",
    "coordinates": "Point Nemo / Deep Pacific",
    "classificationCode": "D.ST-AVI-8812"
  },
  {
    "id": "out-01",
    "title": "Magic Fingers",
    "subtitle": "COGNITIVE HAZARD OUTPOST",
    "description": "",
    "additionalInfo": [
      "Visual frequency measured at exactly 540nm (Emerald green glow).",
      "Exhibits sympathetic resonance with retro video synthesizers and low-fidelity audio recordings.",
      "Recommended protocols: Contain in lead-lined dark frame; avoid direct eye-contact during periods of celestial alignment."
    ],
    "image": "src/assets/images/Project1.png",
    "medium": "Digital Comic Art & Screenprint",
    "date": "2025",
    "client": "The Dept. of Strange Things",
    "anomalyLevel": "EUCLID",
    "coordinates": "RA 18h 36m 56s | Dec +38° 47′ 1″",
    "classificationCode": "D.ST-SKELE-1031",
    "isMultiImage": false,
    "images": [
      "src/assets/images/Project1.png",
      "src/assets/images/Project4.png",
      "src/assets/images/Project6.png"
    ]
  },
  {
    "id": "abstract-04",
    "title": "Rock 'n' Rose",
    "subtitle": "COGNITIVE BLINDNESS ARRAY",
    "description": "",
    "additionalInfo": [
      "Renders facial-recognition scanners completely non-responsive in a 10-meter radius when worn as custom-printed gear.",
      "Geometric flows trigger brief periods of pleasant aesthetic daydreaming in sentient observers.",
      "Constructed strictly from interlocking pill grids and continuous sine-waves."
    ],
    "image": "src/assets/images/Project4.png",
    "medium": "Screenprint & Dynamic Pattern Design",
    "date": "2023",
    "client": "Inconspicuous Gear Corp.",
    "anomalyLevel": "SAFE",
    "coordinates": "Sub-Sector 12 / Grid C",
    "classificationCode": "D.ST-GRID-1102"
  },
  {
    "id": "pencil-06",
    "title": "West Coast Dots",
    "subtitle": "KNOTTED SCULPTURAL TOOL",
    "description": "",
    "additionalInfo": [
      "The structural graphite core is unbroken despite being bent at a 180-degree radius.",
      "When picked up, users experience an immediate, intense urge to organize files alphabetically.",
      "Responds exceptionally well to classic rubber erasers."
    ],
    "image": "src/assets/images/Project6.png",
    "medium": "3D Concept Art & Graphic Poster",
    "date": "2025",
    "client": "D.ST Creative Advisory",
    "anomalyLevel": "SAFE",
    "coordinates": "Desk Left Margin",
    "classificationCode": "D.ST-TOOL-8819"
  }
];

export const BLURBS: Record<'dost' | 'me', FolderBlurb> = {
  dost: {
    id: 'blurb-dost',
    title: 'Dept. of Strange Things',
    subtitle: 'SECURE — IDENTIFY — DOCUMENT',
    paragraphs: [
      "The Department of Strange Things is a fictional government agency that operates to understand the things that don't fit neatly into our world. To investigate, identify, and contain anomalies, entities and creatures.",
      "It consists of many divisions covering a wide range of areas, from the Paranormal Investigation Division and the Cryptid Research Unit to the Division of Peculiar Phenomena. Each division handles a specific type of strangeness. It could be a cursed object in an abandoned house, a creature sighted in the woods or a hostile spirit from another dimension."
    ],
    bulletPointsListHeader: 'CORE DIRECTIVES FOR FIELD RESEARCHERS:',
    bulletPoints: [
      'No contact should be initiated with Level-Keter anomalies without dual supervisor approval stamp.',
      'Ensure standard field notebooks remain double-sleeved to avoid psychic graphite bleeding.',
      'If your yellow pencils begin to tie themselves in knots, exit the vicinity immediately.'
    ],
    additionalNote: 'Official Agency Seal registered under Act #992-B. Under penalty of cosmic classification.'
  },
  me: {
    id: 'blurb-me',
    title: "Hi, I'm Joe",
    subtitle: 'CREATIVE WORKER CODE #JH-90',
    paragraphs: [
      "I'm an illustrator and animator from New Zealand.",
      "I create motion graphics and playful illustration that moves between styles.",
      "Most days, you'll find me drawing silly imaginary worlds (like the Department of Strange Things)."
    ],
    bulletPointsListHeader: 'OPERATIONAL FOCUS AREAS:',
    bulletPoints: [
      'Comic layouting and sequential multi-frame horror sketching',
      'Tactile print design, including silk screen printing, ink stippling, and risograph texture building',
      'Creative branding for mysterious, fictional, or highly eccentric governmental programs'
    ],
    additionalNote: 'Based out of the Department\'s Pacific Northwest sector. Coffee-fueled and ready for anomalous collaborations.'
  }
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'shop-01',
    name: 'D.ST Official Enamel Crest Pin',
    price: '$12.00',
    description: 'High-quality gold plated enamel badge featuring the official All-Seeing crest of the Department. Instantly grants minor clearance inside sector libraries.',
    image: 'src/assets/images/DoSTlogo.png',
    tags: ['Merch', 'Accessory']
  },
  {
    id: 'shop-02',
    name: 'The Creative Block Keychain',
    price: '$8.50',
    description: 'A miniature high-density vinyl keychain replicating the signature knotted pencil anomaly. Does not write, but guarantees curious glances.',
    image: 'src/assets/images/gallery_pencil_knot_1779958896877.png',
    tags: ['Interactive', 'Keychain']
  },
  {
    id: 'shop-03',
    name: 'Screeching Skeleton Risograph Print',
    price: '$28.00',
    description: 'A limited edition heavy cardstock risograph screenprint of our orbit-recovered Screaming Skeleton anomaly. Hand stamped and signed by Joseph Hunter.',
    image: 'src/assets/images/gallery_skeleton_1779958789302.png',
    tags: ['Wall Art', 'Risograph']
  },
  {
    id: 'shop-04',
    name: 'Anomalous Sticker Pack (5-Pcs)',
    price: '$9.99',
    description: 'Die-cut vinyl stickers including the green alien head, red ghost, bone-handler hand, and a miniature goggle pilot skull. Waterproof and signal-shielded.',
    image: 'src/assets/images/sticker_alien_1779958948909.png',
    tags: ['Stickers', 'Waterproof']
  }
];