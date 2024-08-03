/*Or method
document.querySelector(".set").addEventListener("click", handleclick);//finds the frist button in html and adds event listener to it

function handleclick(){
    alert("I got clicked!");
}*/
var n=document.querySelectorAll(".drum").length;
for(var i=0;i<n;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function(){
        var buttonInnerHTML=this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);

    });
    document.addEventListener("keydown",function(event){
        makeSound(event.key);
        buttonAnimation(event.key);
    });
    function makeSound(key){
        switch(key){
            case "w":
                var audio=new Audio("sounds/tom-1.mp3");
                audio.play();
                break;
            case "a":
                var audio=new Audio("sounds/tom-2.mp3");
                audio.play();
                break;
            case "s":
                var audio=new Audio("sounds/tom-3.mp3");
                audio.play();
                break;
            case "d":
                var audio=new Audio("sounds/tom-4.mp3");
                audio.play();
                break;
            case "j":
                var audio=new Audio("sounds/snare.mp3");
                audio.play();
                break;
            case "k":
                var audio=new Audio("sounds/crash.mp3");
                audio.play();
                break;
            case "l":
                var audio=new Audio("sounds/kick-bass.mp3");
                audio.play();
                break;
            default:
                console.log(buttonInnerHTML);
        }
    }
    function buttonAnimation(currentKey){
        var currentButton=document.querySelector("."+currentKey);
        currentButton.classList.add("pressed");
        setTimeout(function(){
            currentButton.classList.remove("pressed");
        },100);
    }
}
// var audio=new Audio("sounds/tom-1.mp3");
// audio.play();
