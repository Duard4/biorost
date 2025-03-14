// services/apiService.js

/**
 * Сервіс для взаємодії з API
 */
export const apiService = {
    /**
     * Відправка контактної форми на сервер
     * @param {Object} formData - дані форми для відправки
     * @returns {Promise<Object>} - відповідь від сервера
     */
    async sendContactForm(formData) {
        try {
            // Налаштування запиту
            const url = process.env.VUE_APP_API_BASE_URL + '/api/contact';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(formData),
                credentials: 'include' // Включаємо cookies для аутентифікації
            });
            
            // Перевірка статусу відповіді
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Помилка сервера: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API service error:', error);
            throw error;
        }
    }
};
