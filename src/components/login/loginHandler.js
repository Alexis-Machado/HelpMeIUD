// Seleccionar elementos del DOM
const loginsec = document.querySelector('.login-section');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');

// Agregar evento al hacer clic en el enlace de registro
registerlink.addEventListener('click', () => {
    loginsec.classList.add('active');
});

// Agregar evento al hacer clic en el enlace de inicio de sesión
loginlink.addEventListener('click', () => {
    loginsec.classList.remove('active');
});
