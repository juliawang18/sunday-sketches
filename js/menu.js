let tab = document.getElementById('tab');
let menu = document.getElementById("menu");

function toggleMenu() {
    console.log(menu.classList.contains('hideMenu'));
    if ( menu.classList.contains('hideMenu') ) {
        menu.classList.remove('hideMenu');
        tab.textContent = "Close";
    } else {
        menu.classList.add('hideMenu');
        tab.textContent = "Done?"
    }
}