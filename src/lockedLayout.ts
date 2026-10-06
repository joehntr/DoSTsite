/**
 * LOCKED PRODUCTION LAYOUT CONFIGURATION
 * 
 * You can freeze your custom layout placements (stickers and gallery order)
 * by pasting the generated export config inside here!
 * Once updated, this will be the default layout seen by visitors globally.
 */

/**
 * LOCKED PRODUCTION LAYOUT CONFIGURATION
 * 
 * Generated with Department of Strange Things Layout Studio.
 * Copy and paste this complete code to overwrite '/src/lockedLayout.ts'.
 */

export const LOCKED_STICKERS = {
  "alien": {
    "x": -75,
    "y": -32,
    "scale": 1,
    "rotate": -12,
    "layer": "middle" as const,
    "mobileX": -60,
    "mobileY": -26,
    "mobileScale": 0.85
  },
  "pencil": {
    "x": 65,
    "y": -35,
    "scale": 1.05,
    "rotate": 18,
    "layer": "front" as const,
    "mobileX": 50,
    "mobileY": -30,
    "mobileScale": 0.85
  },
  "can": {
    "x": -85,
    "y": 20,
    "scale": 1.1,
    "rotate": -15,
    "layer": "front" as const,
    "mobileX": -65,
    "mobileY": 18,
    "mobileScale": 0.9
  },
  "ghost": {
    "x": 75,
    "y": 25,
    "scale": 1,
    "rotate": 12,
    "layer": "front" as const,
    "mobileX": 60,
    "mobileY": 20,
    "mobileScale": 0.85
  },
  "zombie": {
    "x": -5,
    "y": 45,
    "scale": 1,
    "rotate": 6,
    "layer": "front" as const,
    "mobileX": -5,
    "mobileY": 38,
    "mobileScale": 0.85
  },
  "deadInside": {
    "x": -5,
    "y": -10,
    "scale": 1.05,
    "rotate": -6,
    "layer": "back" as const,
    "mobileX": -5,
    "mobileY": -10,
    "mobileScale": 0.9
  },
  "aboutAvatar": {
    "x": 77.3203125,
    "y": -48.53515625,
    "scale": 1.7,
    "rotate": 10,
    "layer": "back",
    "mobileX": 20.3359375,
    "mobileY": -46.921875,
    "tabletX": 77.55859375,
    "tabletY": -48.41015625
  },
  "aboutSkull": {
    "x": 196.91796875,
    "y": 45.41796875,
    "scale": 0.8,
    "rotate": 15,
    "layer": "front",
    "mobileX": 219.46875,
    "mobileY": 27.73046875,
    "tabletX": 189.29296875,
    "tabletY": 51.70703125
  },
  "aboutDesign": {
    "x": -52.765625,
    "y": 9.671875,
    "scale": 0.9,
    "rotate": -10,
    "layer": "front",
    "mobileX": -54.234375,
    "mobileY": -30.59765625,
    "tabletX": -57.53125,
    "tabletY": 16.12109375,
    "mobileScale": 0.7
  }
};

export const LOCKED_CUSTOM_IMAGES = {
  "alien": "src/assets/images/Sticker%2004.png",
  "pencil": "src/assets/images/Sticker%2002.png",
  "can": "src/assets/images/Sticker%2003.png",
  "ghost": "src/assets/images/Sticker%2007.png",
  "zombie": "src/assets/images/Sticker%2006.png",
  "deadInside": "src/assets/images/Sticker%2005.png",
  "aboutAvatar": "src/assets/images/Sticker%2008.png",
  "aboutSkull": "src/assets/images/Sticker%2009.png",
  "aboutDesign": "src/assets/images/Sticker%2010.png"
};

export const LOCKED_PROJECT_MAPPING = [
  {
    "id": "out-01",
    "column": 1 as const,
    "order": 0
  },
  {
    "id": "abstract-04",
    "column": 1 as const,
    "order": 1
  },
  {
    "id": "pencil-06",
    "column": 1 as const,
    "order": 2
  },
  {
    "id": "roll-02",
    "column": 2 as const,
    "order": 0
  },
  {
    "id": "pilot-05",
    "column": 2 as const,
    "order": 1
  },
  {
    "id": "project-08",
    "column": 3 as const,
    "order": 0
  },
  {
    "id": "rose-07",
    "column": 3 as const,
    "order": 1
  },
  {
    "id": "emblem-03",
    "column": 3 as const,
    "order": 2
  }
];
