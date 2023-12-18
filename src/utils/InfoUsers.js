// Objeto con funciones relacionadas con la información del usuario
export const InfoUsers = {
    
    // Verifica si un rol específico existe en las autoridades del usuario
    roleExiste(role) {
        // Verifica si hay información de usuario y un token válido almacenados
        if (sessionStorage.getItem('user')) {
            const _token = JSON.parse(sessionStorage.getItem('user'));
            
            // Verifica si el token y la propiedad 'user' existen
            if (_token && _token.user) {
                // Decodifica el payload del token y verifica si el rol existe en las autoridades
                return JSON.parse(atob(_token.user.access_token.split(".")[1])).authorities.includes(role);
            }
        }
        return false; // Si no hay información de usuario o el token no es válido
    },
};
