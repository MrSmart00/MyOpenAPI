const { Gaze } = require('gaze');
const path = require('path');
const { exec } = require('child_process')

function generate_json() {
  const stdout = exec('sc generate  -i ../aquiz-api.yaml -l openapi -o ../dist/', (err, stdout, stderr) => {
    if (err) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  }
  )
}
function watch() {
  const gaze = new Gaze(['../aquiz-api.yaml', '../paths/**', '../definitions/**']);
  gaze.on('error', (err) => { throw err; });
  gaze.on('all', (event, file) => {
    console.log(event, file);
    generate_json();
  });
  const restart = () => {
    gaze.close();
    watch();
  }
  gaze.on('added', (watcher) => restart());
  gaze.on('removed', (watcher) => restart());
}
watch();
