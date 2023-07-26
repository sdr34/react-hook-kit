// useForm.d.ts

import { ChangeEvent } from 'react';

export interface InitialFormState {
	[key: string]: string | number;
}

export interface UseFormReturn {
	formState: InitialFormState;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	resetForm: () => void;
}

export default function useForm(initialState: InitialFormState): UseFormReturn;
