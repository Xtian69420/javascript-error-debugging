let codes = [
  `function toUpperCaseName(name) { 
    return name.toUpperCase(); 
  } 
  toUpperCaseName(123); 
  // 1.) Fix
  // 2.) Display the value.`,

  `// Function to find the largest number in an array
function findLargestNumber(arr) {
    let largest = arr[0]; 

    for (let i = 0; i < arr(length); i++) {
        if (arr[i] > largest) {
            largest = arr[i];
        }
    }

    return largest;
}

let numbers = [5, 1, 9, 3, 7];
let largestNumber = findLargestNumber(number);
// Display output
// Expected output: 9`,

  `// Bonus!
// Ligtas ka, hindi nga lang sa langit.`,

  `// Function to check if a number is even
function isEven(number) {
    if (number / 2 === 1) {  
        break;
        return true; 
    } else {
        break;
        return false;
    }
}

let result = isEven(4);  
console.log(result);  `
];

let currentCode = 0; 

let editor;

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' }});
require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: codes[currentCode],
    language: 'javascript',
    theme: 'vs-dark',
    fontSize: 24,
    automaticLayout: true,
    glyphMargin: false,
    accessibilitySupport: 'on',
    minimap: {
      enabled: false
    },
    scrollbar: {
      vertical: "auto",
      horizontal: "auto"
    },
    lineNumbers: window.innerWidth <= 550 ? 'off' : 'on'
  });

  const mediaQuery = window.matchMedia('(max-width: 650px)');
  const fontSizeQuery = window.matchMedia('(max-width: 725px)');
  const smallScreenQuery = window.matchMedia('(max-width: 400px)');

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

document.getElementById("prev").addEventListener("click", () => {
  if (currentCode > 0) {
    currentCode--;
    editor.setValue(codes[currentCode]); 
  }
  updateButtonState();  
});

document.getElementById("next").addEventListener("click", () => {
  if (currentCode < codes.length - 1) {
    currentCode++;
    editor.setValue(codes[currentCode]); 
  }
  updateButtonState(); 
});

function updateButtonState() {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  prevButton.disabled = currentCode === 0;
  nextButton.disabled = currentCode === codes.length - 1;

  prevButton.style.cursor = prevButton.disabled ? 'not-allowed' : 'pointer';
  nextButton.style.cursor = nextButton.disabled ? 'not-allowed' : 'pointer';
}

updateButtonState();
