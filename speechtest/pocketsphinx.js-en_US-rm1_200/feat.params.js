
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}
Module['FS_createPath']('/', 'rm1_200', true, true);
Module['FS_createDataFile']('/rm1_200', 'feat.params', [45, 110, 102, 105, 108, 116, 32, 52, 48, 10, 45, 108, 111, 119, 101, 114, 102, 32, 49, 51, 51, 46, 51, 51, 51, 52, 10, 45, 117, 112, 112, 101, 114, 102, 32, 54, 56, 53, 53, 46, 52, 57, 55, 54, 10, 45, 102, 101, 97, 116, 32, 115, 50, 95, 52, 120, 10, 45, 97, 103, 99, 32, 110, 111, 110, 101, 10, 45, 99, 109, 110, 32, 99, 117, 114, 114, 101, 110, 116, 10, 45, 118, 97, 114, 110, 111, 114, 109, 32, 110, 111, 10], true, true);

  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();
