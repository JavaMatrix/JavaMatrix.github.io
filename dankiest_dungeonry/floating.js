window.onscroll = changePos;

function changePos() {
    var header = document.getElementById("header");
    if (window.pageYOffset > 70) {
        header.style.position = "fixed";
        header.style.top = "0";
    } else {
        header.style.position = "";
        header.style.top = "";
    }
}
