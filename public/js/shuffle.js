// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }

// var arr = [
//     "<span class=\"booklink\"><a href=\"/one\">one</a></span>",
//     "<span class=\"booklink\"><a href=\"/one\">two</a></span>",
//     "<span class=\"booklink\"><a href=\"/one\">three</a></span>",
//     "<span class=\"booklink\"><a href=\"/one\">four</a></span>",
//     "<span class=\"booklink\"><a href=\"/one\">five</a></span>"
// ]

// /* note: the JavaScript that updates the div had to be near the end
//  * of the body to work (probably just after the div)
//  */
// shuffle(arr);
// document.getElementById("one").innerHTML = arr.slice(0, 3).toString();