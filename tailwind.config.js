/** @type {import('tailwindcss').Config} */

export const content = ['./src/**/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js']
export const theme = {
	extend: {
		colors: {
			primary: '#000853',
			secondary: '#CBB6E5',
			accent: '#761BE4',
			warning: '#ED4545',
			background: '#F0EAF8',
			backgroundError: '#FEECEC',
			textGray: '#898DA9',
		},
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
		},
	},
}
export const plugins = [require('flowbite/plugin')]
