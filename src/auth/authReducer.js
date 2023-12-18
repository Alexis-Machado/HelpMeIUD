import { types } from "../types/types";

// Reductor para manejar acciones relacionadas con la autenticación
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            // Retorna el nuevo estado con la información del usuario y el estado de inicio de sesión
            return {
                ...action.payload,
                logged: true
            };
        case types.logout:
            // Retorna el nuevo estado con el estado de inicio de sesión como falso
            return {
                logged: false
            };
        default:
            // Retorna el estado actual si la acción no es reconocida
            return state;
    }
};
