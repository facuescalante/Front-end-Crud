const { createApp } = Vue;

createApp({
    data() {
        return {
            usuarios: [],
            url: 'https://facumax.pythonanywhere.com/usuarios',
            error: false,
            cargando: true,
            id: 0,
            usuario: "",
            clave: "",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        
        grabar() {
            // Verificar si ya existe un usuario con el mismo nombre
            if (this.usuarios.some(u => u.usuario === this.usuario)) {
                alert('Ya existe un usuario con ese nombre. Por favor, elija otro.');
                return;  // Cancelar el registro
            }

            let usuario = {
                usuario: this.usuario,
                clave: this.clave,
                rol: 0  // Rol por defecto para usuarios normales
            };

            var options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };

            fetch(this.url, options)
                .then(() => {
                    alert("Registro grabado");
                    window.location.href = "login.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar");
                });
        },
        
        login() {
            let usuario = this.usuario;
            sessionStorage.setItem("adm", 0);  // Establece por defecto como no administrador
            let i = 0;
            while (i < this.usuarios.length && this.usuarios[i].usuario !== this.usuario) {
                i++;
            }
            if (i < this.usuarios.length) {
                if (this.usuarios[i].clave === this.clave) {
                    sessionStorage.setItem("adm", this.usuarios[i].rol);  // Establece el rol del usuario
                    window.location.href = "productos.html";
                } else {
                    alert('Clave incorrecta');
                }
            } else {
                alert('Usuario incorrecto');
            }
        }
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
