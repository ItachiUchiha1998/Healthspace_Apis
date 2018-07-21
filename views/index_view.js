var normalizedPath = require("path").join(__dirname);

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  console.log(file);
  fileNameAllSmall = file.substring(5);
  fileNameVariable = fileNameAllSmall.substring(0,fileNameAllSmall.length - 3);
  console.log(fileNameVariable);
  exports[fileNameVariable] = require("./" + file);
});
