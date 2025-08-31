'use client';

import { useDecisionsStore } from '@/store/decisionsStore';

interface SidebarProps {
 isOpen: boolean;
 onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
 const { decisions, error } = useDecisionsStore();

 const stats = {
 total: decisions.length,
 approved: decisions.filter(d => d.decision === 'approved').length,
 rejected: decisions.filter(d => d.decision === 'rejected').length,
 pending: decisions.filter(d => d.decision === 'pending').length,
 };

 const avgLatency = decisions.length > 0 
 ? Math.round(decisions.reduce((sum, d) => sum + d.latency, 0) / decisions.length)
 : 0;

 return (
 <>
 {/* Mobile backdrop */}
 {isOpen && (
 <div 
 className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity sm:hidden"
 onClick={onClose}
 />
 )}
 
 {/* Sidebar */}
 <aside
 id="sidebar"
 className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 ${
 isOpen ? 'translate-x-0' : '-translate-x-full'
 } sm:translate-x-0`}
 aria-label="Sidebar"
 >
 <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
 <div className="space-y-6">
 {/* Navigation */}
 <div>
 <h3 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
 Navigation
 </h3>
 <ul className="space-y-2">
 <li>
 <a
 href="#"
 className="flex items-center p-2 text-gray-900 rounded-lg bg-blue-50 border border-blue-200 "
 >
 <svg
 className="w-5 h-5 text-blue-600"
 aria-hidden="true"
 xmlns="http://www.w3.org/2000/svg"
 fill="currentColor"
 viewBox="0 0 22 21"
 >
 <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
 <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
 </svg>
 <span className="ml-3 font-medium text-blue-700 ">Dashboard</span>
 </a>
 </li>
 </ul>
 </div>

 {/* Statistics */}
 <div>
 <h3 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
 Statistics
 </h3>
 <div className="space-y-3">
 <div className="bg-gray-50 p-3 rounded-lg">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600 ">Total Decisions</p>
 <p className="text-2xl font-bold text-gray-900 ">{stats.total}</p>
 </div>
 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
 <svg className="w-4 h-4 text-blue-600 " fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
 </svg>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 gap-2">
 <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
 <div className="flex items-center">
 <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
 <span className="text-sm font-medium text-green-800 ">Approved</span>
 </div>
 <span className="text-sm font-bold text-green-800 ">{stats.approved}</span>
 </div>
 
 <div className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg">
 <div className="flex items-center">
 <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
 <span className="text-sm font-medium text-red-800 ">Rejected</span>
 </div>
 <span className="text-sm font-bold text-red-800 ">{stats.rejected}</span>
 </div>
 
 <div className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded-lg">
 <div className="flex items-center">
 <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
 <span className="text-sm font-medium text-yellow-800 ">Pending</span>
 </div>
 <span className="text-sm font-bold text-yellow-800 ">{stats.pending}</span>
 </div>
 </div>

 {stats.total > 0 && (
 <div className="bg-gray-50 p-3 rounded-lg">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-gray-600 ">Avg Latency</p>
 <p className="text-xl font-bold text-gray-900 ">{avgLatency}ms</p>
 </div>
 <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
 <svg className="w-4 h-4 text-purple-600 " fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
 </svg>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>

 {/* System Status */}

 </div>
 </div>
 </aside>
 </>
 );
}