import { useState } from 'react';

// Определим интерфейс для входных данных
interface InitialFormState {
  [key: string]: string | number;
}

// И для выходных данных
interface UseFormReturn {
  formState: InitialFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

// Теперь определим сам хук
function useForm(initialState: InitialFormState): UseFormReturn {
  const [formState, setFormState] = useState<InitialFormState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
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

export default useForm;


