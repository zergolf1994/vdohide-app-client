import { routes } from '@/configs/route';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    trustHost: true,
    pages: {
        signIn: '/login',
        error: "/login?error"
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = routes.DASHBOARD.includes(nextUrl.pathname)
            const isOnAuth = routes.AUTH.includes(nextUrl.pathname)

            if (isOnDashboard && !isLoggedIn) {
                return false;
            } else if (isOnAuth && isLoggedIn) {
                return Response.redirect(new URL('/home', nextUrl));
            }
            return true;
        },
    },
    cookies: {
        sessionToken: {
            name: `access-token`,
        },
        callbackUrl: {
            name: `callback-url`,
        },
        csrfToken: {
            name: `csrf-token`,
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;