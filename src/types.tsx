export type Data = {
	name: string
	lastName: string
	email: string
	age: string
	photo: File | null
	date: string | null
	hour: string
}

export type FormErrors = {
	name: string
	lastName: string
	email: string
}

export type Holiday = {
	country: string
	date: Date
	day: string
	iso: string
	name: string
	type: string
	year: number
}
