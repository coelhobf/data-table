const fs = require('fs');
const path = require('path');

const masterPath = path.resolve(__dirname, '../screenshot/builds/master.json');
const imagesDir = path.resolve(__dirname, '../screenshot/images');

async function clearScreenshots(){

  const masterContent = fs.readFileSync(masterPath);
  const masterJson = JSON.parse(masterContent);
  let files = fs.readdirSync(imagesDir);

  try {
    //Filtering only files that are not in the master build
    files = files.filter( file => !masterJson.screenshots.some( shot => shot.image === file ));

    if(files.length > 0) {
      //Removing files
      files.forEach( (file) => {
        console.log('Removing ' + file + ' ...');
        fs.unlinkSync(path.resolve(imagesDir, file));
      });
    } else {
      console.log('No files to remove...')
    }
  } catch(err) {
    console.error('Error while removing files: ' + err);
  }
}

clearScreenshots();
