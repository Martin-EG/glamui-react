/**
 * TextInput types
 * Add your types here like:
 * @property {TextInputVariant} variant - The variant of the TextInput
 * @property {string} label - The label of the TextInput
 * @property {string} error - The error of the TextInput
 */

export type TextInputVariant = 'text' | 'email' | 'password';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: TextInputVariant;
}
