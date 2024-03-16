/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'Inter': ['Inter', 'serif']
            },
            colors: {
                'blue': '#3943B7',
                'lightblue': '#006BA6',
                'white': '#FCF7F8',
                'black': '#1C1C1C',
                'aqua': '#006BA6',
                'grey': '#CED3DC',
                'red': '#DB5461'
            }
        }
    },
    plugins: [],
}

