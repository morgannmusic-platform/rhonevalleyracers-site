document.addEventListener("DOMContentLoaded", function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            
            const burger = document.getElementById('burger-menu');
            const navLinks = document.getElementById('nav-links');

            burger.addEventListener('click', () => {
                // On bascule la classe active sur les deux éléments
                navLinks.classList.toggle('active');
                burger.classList.toggle('active');
            });
        })
        .catch(error => console.error('Erreur:', error));
});