class AppController {
    constructor() {
        this.container = document.getElementById('app');
        this.init();
        this.bindMenuHandlers();
    }

    init() {
        this.pantallaInicio();
        this.containerMenu = document.getElementById('app_menu');
        this.containerContent = document.getElementById('app_content');
    }

    pantallaInicio() {
        // Crear elementos
        const nav = document.createElement('nav');
        nav.id = 'app_menu';

        // Función para crear un elemento de menú con imagen
        function createMenuItem(iconPath, option) {
            const div = document.createElement('div');
            div.className = 'menu-item';
            const img = document.createElement('img');
            img.src = iconPath;
            img.alt = option;
            div.appendChild(img);
            div.setAttribute('data-option', option);
            return div;
        }

        // Crear elementos de menú con imágenes
        const div1 = createMenuItem('./_content/_img/icons/galeria.png', 'Galerias');
        const div2 = createMenuItem('./_content/_img/icons/galeria.png', 'Usuarios');
        const div3 = createMenuItem('./_content/_img/icons/galeria.png', 'Manager');

        const contentDiv = document.createElement('div');
        contentDiv.id = 'app_content';

        // Agregar elementos al nav
        nav.appendChild(div1);
        nav.appendChild(div2);
        nav.appendChild(div3);

        // Agregar nav y contentDiv al contenedor principal
        this.container.appendChild(nav);
        this.container.appendChild(contentDiv);
    }

    bindMenuHandlers() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const option = item.getAttribute('data-option'); 
                this.handleMenuOptionClick(option);
            });
        });
    }

    handleMenuOptionClick(option) {
        let module;
        switch (option) {
            case 'Galerias':
                module = new CreateGallery();
                break;
            case 'Usuarios':
                module = new UsersModule();
                break;
            case 'Manager':
                module = new ReportManagerModule();
                break;
            default:
                break;
        }

        if (module) {
            module.init()
        }
    }
}

const app = new AppController();
app.handleMenuOptionClick('Galerias')

