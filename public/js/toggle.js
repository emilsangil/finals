function myFunction() {
    const x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

let btn = document.getElementsByClassName('btnShow');
let toggle = document.querySelectorAll('.toggle');


btn.onclick = () => { 
  for(let x of toggle) {
    x.classList.toggle('hide');
  }
};

function show() {
    document.getElementsByClassName('')
}