// Pobranie parametrów z URL
var params = new URLSearchParams(window.location.search);

// Przycisk logowania
document.querySelector(".login").addEventListener('click', () => {
    toHome();
});

// Powitanie
var welcome = "Dzień dobry!";
var date = new Date();
if (date.getHours() >= 18){
    welcome = "Dobry wieczór!";
}
document.querySelector(".welcome").innerHTML = welcome;

// Poprawiony redirect na home.html (relatywnie do folderu)
function toHome(){
    location.href = 'home.html?' + params;
}

// Obsługa pola hasła
var input = document.querySelector(".password_input");
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') document.activeElement.blur();
});

var dot = "•";
var original = "";
var eye = document.querySelector(".eye");

// Maskowanie hasła
input.addEventListener("input", () => {
    var value = input.value.toString();
    var char = value.substring(value.length - 1);
    if (value.length < original.length){
        original = original.substring(0, original.length - 1);
    }else{
        original = original + char;
    }

    if (!eye.classList.contains("eye_close")){
        var dots = "";
        for (var i = 0; i < value.length - 1; i++) dots += dot;
        input.value = dots + char;
        delay(3000).then(() => {
            value = input.value;
            if (value.length != 0) input.value = value.substring(0, value.length - 1) + dot;
        });
    }
});

// Delay helper
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Eye toggle
eye.addEventListener('click', () => {
    if (eye.classList.contains("eye_close")){
        eye.classList.remove("eye_close");
        var dots = "";
        for (var i = 0; i < input.value.length - 1; i++) dots += dot;
        input.value = dots;
    }else{
        eye.classList.add("eye_close");
        input.value = original;
    }
});
