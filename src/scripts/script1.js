let editor;

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' }}); 
require(['vs/editor/editor.main'], function () { 
  editor = monaco.editor.create(document.getElementById('editor'), { 
    value: `  // TODO:

  // 1.) Create a try block
  // 2.) Create a process that has runtime error
  // 3.) Create a catch block`, 
    language: 'javascript', 
    theme: 'vs-dark', 
    fontSize: 24, 
    automaticLayout: true 
  }); 

  const mediaQuery = window.matchMedia('(max-width: 650px)');
  const fontSizeQuery = window.matchMedia('(max-width: 725px)');
  const smallScreenQuery = window.matchMedia('(max-width: 410px)');

  function handleMediaChange(e) {
    editor.updateOptions({
      lineNumbers: e.matches ? 'off' : 'on'
    });
  }
  function handleFontSizeChange(e) {
    editor.updateOptions({
      fontSize: e.matches ? 18 : 24
    });
  }
  function handleSmallScreenFontSizeChange(e) {
    editor.updateOptions({
      fontSize: e.matches ? 10 : (fontSizeQuery.matches ? 18 : 24)
    });
  }

  function handleMarginChange(e) {
    editor.updateOptions({
      glyphMargin: !e.matches
    });
  }

  handleMarginChange(mediaQuery);
  mediaQuery.addEventListener('change', handleMarginChange);

  handleMediaChange(mediaQuery);
  mediaQuery.addEventListener('change', handleMediaChange);

  handleFontSizeChange(fontSizeQuery);
  fontSizeQuery.addEventListener('change', handleFontSizeChange);

  handleSmallScreenFontSizeChange(smallScreenQuery);
  smallScreenQuery.addEventListener('change', handleSmallScreenFontSizeChange);
});


document.getElementById("runButton").addEventListener("click", () => {
  const code = editor.getValue();
  const outputEl = document.getElementById("output");
  outputEl.textContent = ""; 

  const originalLog = console.log;
  let logBuffer = "";

  console.log = function (...args) {
    logBuffer += args.join(" ") + "\n";
  };

  try {
    new Function(code)(); 
    outputEl.textContent = logBuffer || "(no output)";
  } catch (err) {
    outputEl.textContent = "❌ Error: " + err.message;
  }

  console.log = originalLog; 
});
