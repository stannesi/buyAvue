// import colorPalette from "@/constants/colorSettings";

// const {
//   COLOR_LANDSCAPE,
//   COLOR_BORDERS,
//   COLOR_WATER,
//   COLOR_LINE,
//   COLOR_POINT_FILL,
//   COLOR_SELECTED_POINT
// } = colorPalette;

// const COLORS = {
//   BORDERS: COLOR_BORDERS,
//   LANDSCAPE: COLOR_LANDSCAPE,
//   LINE: COLOR_LINE,
//   POINT: COLOR_SELECTED_POINT,
//   POINT_FILL: COLOR_POINT_FILL,
//   WATER: COLOR_WATER
// };

const POINT_MARKER_ICON_CONFIG = {
  // path: "M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
  path: "M 0, 0 a 10,10 0 1,1 20,0 a 10,10 0 1,1 -20,0",
  strokeOpacity: 0.5,
  strokeWeight: 5 ,
  strokeColor: "rgb(255,255, 255)",
  fillColor: "rgb(0,155,77)",
  fillOpacity: 0.8,
  scale: 1
};

const mapSettings = {
  zoom: 14
};

export { mapSettings, POINT_MARKER_ICON_CONFIG };
