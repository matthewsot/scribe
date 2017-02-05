PocketSphinx.js RM1 acoustic model bower package
-------------------------------------------------

This is the bower package for the RM1 acoustic model to be used with `pocketsphinx.js`. 

RM1 is an acoustic model for US English, trained on broadcast news audio. Training data are available as part of [Sphinx](http://cmusphinx.org). Is should be used with audio recorded at 16kHz.

This bower package depends on `pocketsphinx.js-lib` which contains the library, without any language-specific file, such as acoustic or language model.

# 1. usage

For general usage see the docs of the base library (once installed, in `bower_components/pocketsphinx.js-lib/README.md`).

Following are the specific for that model.

a. Loading the acoustic model

The files must be loaded in the recognizer, with a call to the "load" command prior to initialization. The following file names should be used:

```javascript
data = {command: 'load', data: ["feat.params.js", "mdef.js", "means.js", "noisedict.js", "sendump.js", "transition_matrices.js", "variances.js"].map(function(x) {return "../pocketsphinx.js-en_US-rm1_200/" + x;}
```

b. Initializing the recognizer

At init time, this model can be selected with:

```javascript
["-hmm", "rm1_200"]
```

c. Setting the sample rate

The recorder should be initialized with the correct sample rate, 8kHz:

```javascript
outputSampleRate: 16000
```

## License

These files are compiled versions of the acoustic models shipped with PocketSphinx source code. PocketSphinx licensing terms are included in the `pocketsphinx` and `sphinxbase` folders of PocketSphinx.js source repository.