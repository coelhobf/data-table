const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../');

const DIST_PATH = path.resolve(ROOT_DIR, './dist');
const LOADER_PATH = path.resolve(ROOT_DIR, './loader');
const SCREENSHOT_BUILDS = path.resolve(ROOT_DIR, './screenshot/builds');
const SCREENSHOT_IMAGES = path.resolve(ROOT_DIR, './screenshot/images');
const COMPONENTS = path.resolve(ROOT_DIR, './src/components');

const paths = [
  DIST_PATH,
  LOADER_PATH,
  SCREENSHOT_BUILDS,
  SCREENSHOT_IMAGES
]


console.log(paths);
