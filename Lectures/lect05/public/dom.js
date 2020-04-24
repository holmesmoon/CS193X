/* DOM = document object model = JS objects representing nodes of the HTML tree */
document
// => HTMLDocument http://localhost:1930/

document.body
// => <body>

document.querySelector("img")
// => <img src="images/stanford.png">

temp0
// => <img src="images/stanford.png">

temp0.src
// => "http://localhost:1930/images/stanford.png"
temp0.src = "something else";
// => "something else"
document.querySelector(".box")
// => <div class="box">

box = document.querySelector(".box")
// => <div class="box">

box.style.backgroundColor = "blue"
// => "blue"
box.style.backgroundColor = ""
// => ""
box.style.width
// => ""
box.style.width = "100px";
// => "100px"
box.style.width = "";
// => ""
box.id
// => ""
box.classList
// => DOMTokenList [ "box" ]

box.classList.add("shaded")
// => undefined
box.classList.contains("shaded")
// => true
box.classList.remove("shaded")
// => undefined
box.classList.remove("box")
// => undefined
box
// => <div class="" style="">
