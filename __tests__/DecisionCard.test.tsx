import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DecisionCard from '@/components/dashboard/DecisionCard/DecisionCard';
import { mockFormData } from '../fixtures/basic';

// Mock the hooks
jest.mock('@/hooks/useDecisionForm', () => ({
  useDecisionForm: () => ({
    formData: mockFormData,
    errors: {},
    isLoading: false,
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    getFieldProps: jest.fn((field) => ({
      value: mockFormData[field] || '',
      error: null,
      onChange: jest.fn()
    }))
  })
}));

jest.mock('@/hooks/useDecisionSubmission', () => ({
  useDecisionSubmission: () => ({
    submitDecision: jest.fn(),
    isSubmitting: false
  })
}));

describe('DecisionCard', () => {
  it('renders the form title', () => {
    render(<DecisionCard />);
    
    expect(screen.getByText('Submit Transaction Request')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<DecisionCard />);
    
    expect(screen.getByLabelText(/Transaction Amount/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payee Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer ID/)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<DecisionCard />);
    
    expect(screen.getByRole('button', { name: /submit request/i })).toBeInTheDocument();
  });
});