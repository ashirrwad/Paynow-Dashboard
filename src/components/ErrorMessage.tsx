'use client';

interface ErrorMessageProps {
 message: string;
 onDismiss?: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
 return (
 <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4" role="alert">
 <div className="flex">
 <div className="flex-shrink-0">
 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
 </svg>
 </div>
 <div className="ml-3 flex-1">
 <h3 className="text-sm font-medium text-red-800">Error</h3>
 <p className="mt-1 text-sm text-red-700">{message}</p>
 </div>
 {onDismiss && (
 <div className="ml-auto pl-3">
 <div className="-mx-1.5 -my-1.5">
 <button
 type="button"
 className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
 onClick={onDismiss}
 aria-label="Dismiss error"
 >
 <span className="sr-only">Dismiss</span>
 <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
 <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
 </svg>
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 );
}