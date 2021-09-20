const fs = require('fs');
const path = require('path');

const masterPath = path.resolve(__dirname, '../screenshot/builds/master.json');
const args = process.argv.slice(2);

function clearCompBuild(json, comp) {
  const regex = RegExp('^(' + comp + '$|' + comp + '\\s.*)')
  json.screenshots = json.screenshots.filter( shot => !regex.test(shot.desc));
}

async function clearBuild(){
  let masterContent = fs.readFileSync(masterPath);
  let masterJson = JSON.parse(masterContent);

  try {
    if(args.length > 0) {
      args.forEach( (comp) => {
        console.log('Removing all ' + comp + ' screenshots from build...');
        clearCompBuild(masterJson, comp);
      });
    } else{
      console.log('Removing all screenshots from build...')
      masterJson.screenshots = []; //Clear all screenshots
    }

    masterContent = JSON.stringify(masterJson, null, '\t');
    fs.writeFileSync(masterPath, masterContent);

    console.log('Screenshots removed from build successfully...');

  } catch(err) {
    console.error('Error while removing screenshots from build: ' + err);
  }
}

clearBuild();
