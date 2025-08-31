'use client';

import { useEffect, useRef, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDecisionsStore } from '@/store/decisionsStore';
import { formatAmount, formatTimestamp, maskCustomerId } from '@/utils/formatting';
import AgentStepCard from './components/AgentStepCard';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { getDecisionBadge } from './utils';

export default function DecisionDrawer() {
 const { selectedDecision, isDrawerOpen, closeDrawer } = useDecisionsStore();
 const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
 const drawerRef = useRef<HTMLDivElement>(null);
 const closeButtonRef = useRef<HTMLButtonElement>(null);

 // Focus management
 useEffect(() => {
 if (isDrawerOpen && closeButtonRef.current) {
 closeButtonRef.current.focus();
 }
 }, [isDrawerOpen]);

 // Keyboard navigation
 useKeyboardNavigation({
 isOpen: isDrawerOpen,
 onClose: closeDrawer,
 drawerRef,
 });

 const toggleStep = (stepId: string) => {
 setExpandedSteps(prev => {
 const newSet = new Set(prev);
 if (newSet.has(stepId)) {
 newSet.delete(stepId);
 } else {
 newSet.add(stepId);
 }
 return newSet;
 });
 };

 return (
 <Transition appear show={isDrawerOpen} as={Fragment}>
 <Dialog as="div" className="relative z-50" onClose={closeDrawer}>
 {/* Backdrop */}
 <Transition.Child
 as={Fragment}
 enter="ease-in-out duration-500"
 enterFrom="opacity-0"
 enterTo="opacity-100"
 leave="ease-in-out duration-500"
 leaveFrom="opacity-100"
 leaveTo="opacity-0"
 >
 <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity" />
 </Transition.Child>

 {/* Drawer */}
 <div className="fixed inset-0 overflow-hidden">
 <div className="absolute inset-0 overflow-hidden">
 <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
 <Transition.Child
 as={Fragment}
 enter="transform transition ease-in-out duration-500"
 enterFrom="translate-x-full"
 enterTo="translate-x-0"
 leave="transform transition ease-in-out duration-500"
 leaveFrom="translate-x-0"
 leaveTo="translate-x-full"
 >
 <Dialog.Panel className="pointer-events-auto relative w-screen max-w-2xl">
 <Transition.Child
 as={Fragment}
 enter="ease-in-out duration-500"
 enterFrom="opacity-0"
 enterTo="opacity-100"
 leave="ease-in-out duration-500"
 leaveFrom="opacity-100"
 leaveTo="opacity-0"
 >
 <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
 <button
 ref={closeButtonRef}
 type="button"
 className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
 onClick={closeDrawer}
 aria-label="Close drawer"
 >
 <span className="absolute -inset-2.5" />
 <span className="sr-only">Close panel</span>
 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 </div>
 </Transition.Child>

 <div 
 ref={drawerRef}
 className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
 role="dialog" 
 aria-modal="true"
 aria-labelledby="drawer-title"
 >
 {selectedDecision && (
 <>
 {/* Header */}
 <div className="px-4 sm:px-6">
 <Dialog.Title className="text-base font-semibold leading-6 text-gray-900" id="drawer-title">
 Transaction Decision Details
 </Dialog.Title>
 <p className="mt-1 text-sm text-gray-500">
 ID: {selectedDecision.id}
 </p>
 </div>

 {/* Content */}
 <div className="relative mt-6 flex-1 px-4 sm:px-6">
 <div className="space-y-6">
 {/* Decision Summary */}
 <div className="bg-gray-50 rounded-lg p-4">
 <div className="flex items-center justify-between mb-4">
 <span className={getDecisionBadge(selectedDecision.decision)}>
 {selectedDecision.decision.toUpperCase()}
 </span>
 <span className="text-sm text-gray-500">
 {formatTimestamp(selectedDecision.timestamp)}
 </span>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</dt>
 <dd className="text-lg font-semibold text-gray-900">{formatAmount(selectedDecision.amount)}</dd>
 </div>
 <div>
 <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Payee</dt>
 <dd className="text-lg font-semibold text-gray-900">{selectedDecision.payee}</dd>
 </div>
 <div>
 <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</dt>
 <dd className="text-lg font-mono font-semibold text-gray-900">{maskCustomerId(selectedDecision.customerId)}</dd>
 </div>
 <div>
 <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Time</dt>
 <dd className="text-lg font-semibold text-gray-900">{selectedDecision.latency}ms</dd>
 </div>
 </div>
 </div>

 {/* Decision Reasons */}
 <div>
 <h4 className="text-sm font-medium text-gray-900 mb-3">Decision Reasons</h4>
 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
 <ul className="space-y-2">
 {selectedDecision.reasons.map((reason, index) => (
 <li key={index} className="flex items-start">
 <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
 <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
 </div>
 <span className="text-sm text-blue-800">{reason}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Agent Trace */}
 <div>
 <h4 className="text-sm font-medium text-gray-900 mb-3">Agent Processing Trace</h4>
 <div className="space-y-3">
 {selectedDecision.agentTrace.map((step) => (
 <AgentStepCard
 key={step.id}
 step={step}
 isExpanded={expandedSteps.has(step.id)}
 onToggle={() => toggleStep(step.id)}
 />
 ))}
 </div>
 </div>
 </div>
 </div>
 </>
 )}
 </div>
 </Dialog.Panel>
 </Transition.Child>
 </div>
 </div>
 </div>
 </Dialog>
 </Transition>
 );
}