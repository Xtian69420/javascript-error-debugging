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
