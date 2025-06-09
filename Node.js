let x = ""
let y = ""
let screen = ""
function buttonpress(val){
    screen += val
    document.getElementById("screentext").innerHTML = screen
}
function enter(){
    let num = +eval(screen)
    num = Math.round(num*1000)/1000
    screen = String(num)
    document.getElementById("screentext").innerHTML = screen
}
function clearscreen(){
    screen = ""
    document.getElementById("screentext").innerHTML = screen
}