let tab = document.getElementById('tab');
let menu = document.getElementById("menu");

// Open and close menu
function toggleMenu() {
    if (menu.classList.contains('hideMenu')) {
        menu.classList.remove('hideMenu');
        tab.textContent = "Close";
    } else {
        menu.classList.add('hideMenu');
        tab.textContent = "Done?"
    }
}