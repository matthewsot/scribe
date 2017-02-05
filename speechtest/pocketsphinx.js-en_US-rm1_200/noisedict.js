
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
Module['FS_createDataFile']('/rm1_200', 'noisedict', [60, 115, 62, 9, 9, 83, 73, 76, 10, 60, 47, 115, 62, 9, 9, 83, 73, 76, 10, 60, 115, 105, 108, 62, 9, 32, 32, 32, 32, 32, 32, 32, 32, 83, 73, 76, 10], true, true);

  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();
