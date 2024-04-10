class NotificationContainer {
    constructor() {
        this.container = document.getElementById('app');
        this.notificationPanel = document.getElementById('notification-panel') || this.createNotificationPanel();
        if (!this.notificationPanel.parentElement) {
            this.setupNotificationPanel();
        }
    }

    createNotificationPanel() {
        const notificationPanel = document.createElement('div');
        notificationPanel.id = 'notification-panel';
        notificationPanel.className = 'notification-panel';
        return notificationPanel;
    }

    setupNotificationPanel() {
        this.container.appendChild(this.notificationPanel);
    }

        showNotification({ title = '', text = '', imageUrl = '', htmlContent = '', duration = 5000, borderColor = '#6b46c1' }) {
        const notification = this.createNotificationElement({ title, text, imageUrl, htmlContent });

        // Agregar clase para animación de entrada
        notification.classList.add('show');

        // Personalizar el color del borde izquierdo
        notification.style.borderLeftColor = borderColor;

        this.notificationPanel.appendChild(notification);
        
        if (duration > 0) {
            setTimeout(() => {
                // Remover la clase para activar la animación de salida
                notification.classList.remove('show');
                notification.addEventListener('transitionend', () => {
                    // Eliminar la notificación del DOM después de que la animación haya terminado
                    this.notificationPanel.removeChild(notification);
                });
            }, duration);
        }
    }


    createNotificationElement({ title = '', text = '', imageUrl = '', htmlContent = '' }) {
        const notification = document.createElement('div');
        notification.classList.add('notification');

        if (title) {
            const titleElement = document.createElement('div');
            titleElement.textContent = title;
            titleElement.classList.add('notification-title');
            notification.appendChild(titleElement);
        }

        if (text) {
            const textElement = document.createElement('div');
            textElement.textContent = text;
            textElement.classList.add('notification-text');
            notification.appendChild(textElement);
        }

        if (imageUrl) {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.classList.add('notification-image');
            notification.appendChild(imageElement);
        }

        if (htmlContent) {
            const contentElement = document.createElement('div');
            contentElement.innerHTML = htmlContent;
            notification.appendChild(contentElement);
        }

        return notification;
    }
}
