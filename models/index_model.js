var normalizedPath = require("path").join(__dirname);

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  console.log(file);
  fileNameAllSmall = file.substring(6);
  fileNameSecondLetterCaps = "m"+fileNameAllSmall.charAt(0).toUpperCase() + fileNameAllSmall.substring(1);
  fileNameVariable = fileNameSecondLetterCaps.substring(0,fileNameSecondLetterCaps.length - 3);
  console.log(fileNameVariable);
  exports[fileNameVariable] = require("./" + file);  
});
