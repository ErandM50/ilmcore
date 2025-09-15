"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BaseFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  success?: boolean;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'required'> {
  type?: 'text' | 'email' | 'tel' | 'password' | 'url';
}

interface TextareaFieldProps extends BaseFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required'> {
  type: 'textarea';
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'required'> {
  type: 'select';
  options: string[] | { value: string; label: string }[];
  placeholder?: string;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, FormFieldProps>(
  ({ label, error, required, hint, success, className, type = 'text', ...props }, ref) => {
    const hasError = !!error;
    const showSuccess = success && !hasError;

    const baseClasses = "form-field transition-all duration-fast";
    const stateClasses = hasError ? "error" : "";

    const fieldClasses = cn(baseClasses, stateClasses);

    const renderField = () => {
      if (type === 'textarea') {
        const { rows = 4, ...textareaProps } = props as TextareaFieldProps;
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={fieldClasses}
            rows={rows}
            aria-invalid={hasError}
            aria-describedby={
              `${props.id || label.toLowerCase().replace(/\s+/g, '-')}-${hasError ? 'error' : hint ? 'hint' : 'description'}`
            }
            {...textareaProps}
          />
        );
      }

      if (type === 'select') {
        const { options, placeholder, ...selectProps } = props as SelectFieldProps;
        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            className={fieldClasses}
            aria-invalid={hasError}
            aria-describedby={
              `${props.id || label.toLowerCase().replace(/\s+/g, '-')}-${hasError ? 'error' : hint ? 'hint' : 'description'}`
            }
            {...selectProps}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => {
              if (typeof option === 'string') {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              }
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        );
      }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          className={fieldClasses}
          aria-invalid={hasError}
          aria-describedby={
            `${props.id || label.toLowerCase().replace(/\s+/g, '-')}-${hasError ? 'error' : hint ? 'hint' : 'description'}`
          }
          {...(props as InputFieldProps)}
        />
      );
    };

    return (
      <div className={cn('space-y-2', className)}>
        {/* Label */}
        <label
          htmlFor={props.id || label.toLowerCase().replace(/\s+/g, '-')}
          className="block text-sm font-medium text-primary"
        >
          {label}
          {required && <span className="text-accent ml-1" aria-label="required">*</span>}
        </label>

        {/* Input Container */}
        <div className="relative">
          {renderField()}

          {/* Success/Error Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {showSuccess && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Hint Text */}
        {hint && !hasError && (
          <p
            id={`${props.id || label.toLowerCase().replace(/\s+/g, '-')}-hint`}
            className="text-sm text-tertiary"
          >
            {hint}
          </p>
        )}

        {/* Error Message */}
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p
              id={`${props.id || label.toLowerCase().replace(/\s+/g, '-')}-error`}
              className="text-sm text-red-400"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          </motion.div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;