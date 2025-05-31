import { create } from 'zustand';
import { persist } from 'zustand/middleware';



const useAuthStore = create(


    persist(

        (set, get) => ({

            user: null,
            token: null,
            isAuthenticated: false,

            // Set user data and token after successfully login

            setAuth: (userData, token) => set({
                user: userData,
                token,
                isAuthenticated: true
            }),

            // clear user data and token after logout

            clearAuth: () => set({
                user: null,
                token: null,
                isAuthenticated: false
            }),

            // Get token (for use outside of React components)
            getToken: () => get().token,

        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
)

export default useAuthStore;