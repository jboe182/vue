/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'band-primary': '#dc2626',
                'band-secondary': '#000000',
                'band-accent': '#f59e0b',
            }
        },
    },
}