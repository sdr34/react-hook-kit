import { useState } from 'react';

interface InitialFormState {
	[key: string]: string | number;
}

interface UseFormReturn {
	formState: InitialFormState;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetForm: () => void;
}

export function useForm(initialState: InitialFormState): UseFormReturn {
	const [formState, setFormState] = useState<InitialFormState>(initialState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormState((prevState) => ({ ...prevState, [name]: value }));
	};

	const resetForm = (): void => {
		setFormState(initialState);
	};

	return {
		formState,
		handleChange,
		resetForm,
	};
}
