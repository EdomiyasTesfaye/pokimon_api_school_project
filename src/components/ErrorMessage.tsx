import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-8">
      <div className="flex items-center">
        <AlertCircle className="text-red-500 dark:text-red-400 w-5 h-5 mr-2" />
        <p className="text-red-700 dark:text-red-300">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;