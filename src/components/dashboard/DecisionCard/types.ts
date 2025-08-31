export interface FormData {
  amount: string;
  payee: string;
  customerId: string;
}

export interface FormErrors {
  amount?: string;
  payee?: string;
  customerId?: string;
}

export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'number';
  placeholder?: string;
  required?: boolean;
  step?: string;
  min?: string;
  icon?: React.ReactNode;
}