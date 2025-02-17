// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al formulario
    const form = document.getElementById('contactForm');
    
    // Función para validar email usando expresión regular
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar error en un campo específico
    function showError(inputElement, message) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        const errorDiv = document.getElementById(`${inputElement.id}Error`);
        if (errorDiv) {
            errorDiv.textContent = message;
        }
    }

    // Función para mostrar éxito en un campo
    function showSuccess(inputElement) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        const errorDiv = document.getElementById(`${inputElement.id}Error`);
        if (errorDiv) {
            errorDiv.textContent = '';
        }
    }

    // Función para validar un campo requerido
    function validateRequired(inputElement, fieldName) {
        if (!inputElement.value.trim()) {
            showError(inputElement, `El campo ${fieldName} es obligatorio`);
            return false;
        }
        showSuccess(inputElement);
        return true;
    }

    // Manejador del evento submit del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        // Validar nombre
        const nombreInput = document.getElementById('nombre');
        if (!validateRequired(nombreInput, 'nombre')) {
            isValid = false;
        }

        // Validar email
        const emailInput = document.getElementById('email');
        if (!validateRequired(emailInput, 'email')) {
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, introduce un email válido');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }

        // Validar asunto
        const asuntoInput = document.getElementById('asunto');
        if (!validateRequired(asuntoInput, 'asunto')) {
            isValid = false;
        }

        // Validar mensaje
        const mensajeInput = document.getElementById('mensaje');
        if (!validateRequired(mensajeInput, 'mensaje')) {
            isValid = false;
        } else if (mensajeInput.value.trim().length < 10) {
            showError(mensajeInput, 'El mensaje debe contener al menos 10 caracteres');
            isValid = false;
        } else {
            showSuccess(mensajeInput);
        }

        // Si todo es válido, mostrar mensaje de éxito
        if (isValid) {
            alert('¡Formulario enviado correctamente!');
            form.reset();
            // Eliminar las clases de validación
            form.querySelectorAll('.is-valid').forEach(element => {
                element.classList.remove('is-valid');
            });
        }
    });

    // Validación en tiempo real para cada campo
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.id === 'email') {
                if (!validateRequired(this, 'email')) return;
                if (!isValidEmail(this.value)) {
                    showError(this, 'Por favor, introduce un email válido');
                } else {
                    showSuccess(this);
                }
            } else if (this.id === 'mensaje') {
                if (!validateRequired(this, 'mensaje')) return;
                if (this.value.trim().length < 10) {
                    showError(this, 'El mensaje debe contener al menos 10 caracteres');
                } else {
                    showSuccess(this);
                }
            } else {
                validateRequired(this, this.id);
            }
        });
    });
});
