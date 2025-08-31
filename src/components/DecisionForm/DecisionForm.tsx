'use client';

import { useState, useCallback } from 'react';
import { useDecisionsStore } from '@/store/decisionsStore';
import { DecisionRequest } from '@/app/api/decide/route';
import { useDebounce } from '@/hooks/useDebounce';
import type { FormData, FormErrors } from './types';

export default function DecisionForm() {
 const [formData, setFormData] = useState<FormData>({
 amount: '',
 payee: '',
 customerId: '',
 });
 const [errors, setErrors] = useState<FormErrors>({});
 
 const { addDecision, setLoading, setError, clearError, isLoading } = useDecisionsStore();

 const validateForm = useCallback((data: FormData): FormErrors => {
 const errors: FormErrors = {};
 
 if (!data.amount.trim()) {
 errors.amount = 'Amount is required';
 } else {
 const amount = parseFloat(data.amount);
 if (isNaN(amount) || amount <= 0) {
 errors.amount = 'Amount must be a positive number';
 }
 }
 
 if (!data.payee.trim()) {
 errors.payee = 'Payee is required';
 } else if (data.payee.trim().length < 2) {
 errors.payee = 'Payee must be at least 2 characters';
 }
 
 if (!data.customerId.trim()) {
 errors.customerId = 'Customer ID is required';
 } else if (data.customerId.trim().length < 3) {
 errors.customerId = 'Customer ID must be at least 3 characters';
 }
 
 return errors;
 }, []);

 const handleInputChange = useCallback((field: keyof FormData, value: string) => {
 setFormData(prev => ({
 ...prev,
 [field]: value,
 }));
 
 // Clear field error when user starts typing
 if (errors[field]) {
 setErrors(prev => ({
 ...prev,
 [field]: undefined,
 }));
 }
 
 // Clear global error
 clearError();
 }, [errors, clearError]);

 const submitRequest = useCallback(async (requestData: DecisionRequest) => {
 setLoading(true);
 clearError();
 
 try {
 const response = await fetch('/api/decide', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(requestData),
 });
 
 if (!response.ok) {
 const errorData = await response.json();
 throw new Error(errorData.error || 'Failed to submit decision request');
 }
 
 const decision = await response.json();
 addDecision(decision);
 
 // Reset form on successful submission
 setFormData({
 amount: '',
 payee: '',
 customerId: '',
 });
 
 } catch (error) {
 console.error('Submission error:', error);
 setError(error instanceof Error ? error.message : 'An unexpected error occurred');
 } finally {
 setLoading(false);
 }
 }, [setLoading, clearError, setError, addDecision]);

 // Debounce the submission by 300ms to prevent double-clicks
 const debouncedSubmit = useDebounce(submitRequest, 300);

 const handleSubmit = useCallback(async (e: React.FormEvent) => {
 e.preventDefault();
 
 const formErrors = validateForm(formData);
 
 if (Object.keys(formErrors).length > 0) {
 setErrors(formErrors);
 return;
 }
 
 setErrors({});
 
 const requestData: DecisionRequest = {
 amount: parseFloat(formData.amount),
 payee: formData.payee.trim(),
 customerId: formData.customerId.trim(),
 };
 
 debouncedSubmit(requestData);
 }, [formData, validateForm, debouncedSubmit]);

 return (
 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
 <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit Decision Request</h2>
 
 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label 
 htmlFor="amount" 
 className="block text-sm font-medium text-gray-700 mb-1"
 >
 Amount *
 </label>
 <input
 type="number"
 id="amount"
 name="amount"
 value={formData.amount}
 onChange={(e) => handleInputChange('amount', e.target.value)}
 disabled={isLoading}
 className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
 errors.amount ? 'border-red-300' : 'border-gray-300'
 }`}
 placeholder="Enter amount (e.g., 1000.00)"
 step="0.01"
 min="0.01"
 aria-describedby={errors.amount ? 'amount-error' : undefined}
 aria-invalid={errors.amount ? 'true' : 'false'}
 />
 {errors.amount && (
 <p id="amount-error" className="mt-1 text-sm text-red-600" role="alert">
 {errors.amount}
 </p>
 )}
 </div>
 
 <div>
 <label 
 htmlFor="payee" 
 className="block text-sm font-medium text-gray-700 mb-1"
 >
 Payee *
 </label>
 <input
 type="text"
 id="payee"
 name="payee"
 value={formData.payee}
 onChange={(e) => handleInputChange('payee', e.target.value)}
 disabled={isLoading}
 className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
 errors.payee ? 'border-red-300' : 'border-gray-300'
 }`}
 placeholder="Enter payee name"
 aria-describedby={errors.payee ? 'payee-error' : undefined}
 aria-invalid={errors.payee ? 'true' : 'false'}
 />
 {errors.payee && (
 <p id="payee-error" className="mt-1 text-sm text-red-600" role="alert">
 {errors.payee}
 </p>
 )}
 </div>
 
 <div>
 <label 
 htmlFor="customerId" 
 className="block text-sm font-medium text-gray-700 mb-1"
 >
 Customer ID *
 </label>
 <input
 type="text"
 id="customerId"
 name="customerId"
 value={formData.customerId}
 onChange={(e) => handleInputChange('customerId', e.target.value)}
 disabled={isLoading}
 className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
 errors.customerId ? 'border-red-300' : 'border-gray-300'
 }`}
 placeholder="Enter customer ID"
 aria-describedby={errors.customerId ? 'customerId-error' : undefined}
 aria-invalid={errors.customerId ? 'true' : 'false'}
 />
 {errors.customerId && (
 <p id="customerId-error" className="mt-1 text-sm text-red-600" role="alert">
 {errors.customerId}
 </p>
 )}
 </div>
 
 <button
 type="submit"
 disabled={isLoading}
 className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
 >
 {isLoading ? (
 <span className="flex items-center justify-center">
 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
 </svg>
 Processing...
 </span>
 ) : (
 'Submit Request'
 )}
 </button>
 </form>
 </div>
 );
}