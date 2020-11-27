// #!/usr/bin/env node

// var fs = require('fs');
// var path = require('path');
// var axios = require('axios');

// /**
//  * Command line arguments
//  */

// var cliArgv = process.argv;
// var avlArgv = {
//   "-s": "Plugin raw source url to be downloaded"
// };

// /**
//  * Root dir
//  */

// var projectDir = '';
// var tempDir = path.join(__dirname, '../temp');

// /**
//  * Plugins
//  */

// var pluginDir = path.join(projectDir, 'plugins');

// /**
//  * Initializing...
//  */

// console.log('Initializing...');

// /**
//  * Creating plugin directory if it doesn't exist
//  */

// if (!fs.existsSync(pluginDir)) {
//   fs.mkdirSync(pluginDir);
//   console.log('Create "Plugin" folder (ok)');
// }

// /**
//  * Creating temp directory if it doesn't exist
//  */

// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir);
// }

// var sourceUrl = cliArgv.indexOf('-s');
// var sourceUrlVal = cliArgv[sourceUrl + 1];

// if (sourceUrl < 0) throw new Error('No raw source url to be downloaded! Use the argument "-s".');

// async function downloadPlugin() {
//   var filePath = path.resolve(tempDir, 'file.js');
//   var writer = fs.createWriteStream(filePath);
//   var response = await axios({
//     url: sourceUrlVal,
//     method: 'GET',
//     responseType: 'stream'
//   });
//   response.data.pipe(writer)
//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve)
//     writer.on('error', reject)
//   });
// }

// downloadPlugin();














// // axios.get(sourceUrlVal).then(function(res) {
// //   console.log(res);
// // }).catch(function(err) {
// //   throw new Error(err);
// // });

// /**
//  * Creating new plugin
//  */

// // if (!fs.existsSync(pluginExample)) {
// //   fs.readFile(pluginExampleSource, 'utf8', function (err, data) {
// //     if (err) throw new Error(err);
// //     fs.writeFile(pluginExample, data, function (err) {
// //       if (err) throw new Error(err);
// //       console.log('Create "Plugin" example (ok)');
// //     });
// //   });
// // }