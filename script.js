// 1. REFERENCIAS
const formReg = document.getElementById('Formulario-registro');
const secLogin = document.getElementById('seccion-login');
const btnEntrar = document.getElementById('btnEntrar');
const irLogin = document.getElementById('irLogin');
const irRegistro = document.getElementById('irRegistro');

const pass1 = document.getElementById('contraseña');
const pass2 = document.getElementById('repetir-contraseña');
const seguridad = document.getElementById('nivelSeguridad');

// 2. FUNCIÓN DE LOS OJOS (Universal)
window.togglePass = function(id, el) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        el.textContent = "🙈";
    } else {
        input.type = "password";
        el.textContent = "👁️";
    }
};

// 3. CAMBIAR ENTRE FORMULARIOS (DOM)
irLogin.onclick = (e) => {
    e.preventDefault();
    formReg.style.display = 'none';
    secLogin.style.display = 'block';
};

irRegistro.onclick = (e) => {
    e.preventDefault();
    secLogin.style.display = 'none';
    formReg.style.display = 'block';
};

// 4. LÓGICA DE REGISTRO
formReg.addEventListener('submit', (e) => {
    e.preventDefault();

    if (pass1.value !== pass2.value) {
        alert("Las contraseñas no coinciden");
        return;
    }

    if (formReg.checkValidity()) {
        const nombreVal = document.getElementById('Nombreusuario').value;
        const datos = {
            nombre: nombreVal,
            correo: document.getElementById('correo').value,
            clave: pass1.value
        };

        // Guardamos usando el nombre como LLAVE (Key), como en tu imagen
        localStorage.setItem(nombreVal, JSON.stringify(datos));
        
        document.getElementById('toast').classList.add('mostrar');
        setTimeout(() => document.getElementById('toast').classList.remove('mostrar'), 3000);

        formReg.reset();
        seguridad.style.width = '0%';
        alert("Usuario guardado. Ahora puedes iniciar sesión.");
    }
});

// 5. LÓGICA DE INICIO DE SESIÓN (LOGIN)
btnEntrar.addEventListener('click', () => {
    const userIngresado = document.getElementById('login-usuario').value;
    const passIngresada = document.getElementById('login-pass').value;

    // Buscamos en LocalStorage la "Key" que coincida con el nombre escrito
    const datosGuardados = localStorage.getItem(userIngresado);

    if (datosGuardados) {
        const usuarioDB = JSON.parse(datosGuardados);

        // Comparamos usando las etiquetas de tu consola: .nombre y .clave
        if (usuarioDB.nombre === userIngresado && usuarioDB.clave === passIngresada) {
            localStorage.setItem('usuarioActivo', usuarioDB.nombre);
            window.location.href = "inicio.html"; 
        } else {
            alert("Contraseña incorrecta para " + userIngresado);
        }
    } else {
        alert("El usuario '" + userIngresado + "' no existe en el sistema.");
    }
});

// 6. MEDIDOR DE SEGURIDAD
pass1.addEventListener('input', () => {
    let n = 0;
    const v = pass1.value;
    if (v.length > 5) n += 30;
    if (v.match(/[A-Z]/)) n += 30;
    if (v.match(/[0-9]/)) n += 40;
    seguridad.style.width = n + '%';
    seguridad.style.backgroundColor = n < 40 ? "red" : n < 70 ? "orange" : "green";
});
