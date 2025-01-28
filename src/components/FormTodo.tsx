import React, { useState, useEffect } from 'react';
import { Checkbox, Input, Field, Label, Button } from '@headlessui/react';

interface FormState {
  title: string;
  completed: boolean;
}

interface FormTodoProps {
  initialData?: Partial<FormState>;
}

const FormTodo: React.FC<FormTodoProps> = ({ close, confirm, initialData }) => {
  const config: { name: keyof FormState; defaultValue: string | boolean }[] = [
    {
      name: 'title',
      defaultValue: '',
    },
    {
      name: 'completed',
      defaultValue: false,
    },
  ];

  const [formState, setFormState] = useState<FormState>(
    config.reduce((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {} as FormState),
  );

  const handleChange = (name: keyof FormState, value: string | boolean) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (initialData) {
      setFormState((prevState) => ({ ...prevState, ...initialData }));
    }
  }, [initialData]);

  return (
    <div>
      <Field>
        <Label>Title</Label>
        <Input
          value={formState['title']}
          onChange={({ target }) => handleChange('title', target.value)}
        />
      </Field>
      <Field>
        <Checkbox
          checked={formState['completed']}
          onChange={(e) => handleChange('completed', e)}
          className='group block size-4 rounded border bg-white data-[checked]:bg-blue-500'
        >
          <svg
            className='stroke-white opacity-0 group-data-[checked]:opacity-100'
            viewBox='0 0 14 14'
            fill='none'
          >
            <path
              d='M3 8L6 11L11 3.5'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Checkbox>
        <Label>Completed</Label>
      </Field>
      <Button onClick={() => close(null)}> Cancel </Button>
      <Button onClick={() => confirm(formState)}> Sumbit </Button>
    </div>
  );
};

export default FormTodo;
