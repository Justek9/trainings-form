export type Data = {
	name: string
	lastName: string
	email: string
	age: string 
	photo: File | null
	date: string
	hour: string
}

export type FormErrors = {
	name: string
	lastName: string
	email: string
	age: string
	photo: string
	date: string
	hour: string
}
