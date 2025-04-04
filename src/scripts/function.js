function gotoice() {window.location = "src/iceBreaker.html";}
function gotoppt() {window.location = "src/ppt.html";}
function gotodemo() {window.location = "src/demo.html";}
function gotohome() {window.location = "../index.html"; console.log("called")}

if (document.getElementById("ice")) {
    document.getElementById("ice").addEventListener("click", gotoice);
}
if (document.getElementById("ppt")) {
    document.getElementById("ppt").addEventListener("click", gotoppt);
}
if (document.getElementById("demo")) {
    document.getElementById("demo").addEventListener("click", gotodemo);
}
if (document.getElementById("home")) {
    document.getElementById("home").addEventListener("click", gotohome);
}
