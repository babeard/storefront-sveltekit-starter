const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [require('@tailwindcss/forms')],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: colors.sky,
				secondary: colors.emerald
			},
			animation: {
				dropIn: 'dropIn 0.2s ease-out'
			},
			keyframes: {
				dropIn: {
					'0%': { transform: 'translateY(-100px)' },
					'100%': { transform: 'translateY(0)' }
				}
			}
		}
	}
};
