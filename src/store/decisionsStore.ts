import { create } from 'zustand';
import { DecisionResponse } from '@/app/api/decide/route';

interface DecisionsState {
  decisions: DecisionResponse[];
  isLoading: boolean;
  error: string | null;
  selectedDecision: DecisionResponse | null;
  isDrawerOpen: boolean;
}

interface DecisionsActions {
  addDecision: (decision: DecisionResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  openDrawer: (decision: DecisionResponse) => void;
  closeDrawer: () => void;
  clearError: () => void;
}

type DecisionsStore = DecisionsState & DecisionsActions;

export const useDecisionsStore = create<DecisionsStore>((set) => ({
  // State
  decisions: [],
  isLoading: false,
  error: null,
  selectedDecision: null,
  isDrawerOpen: false,

  // Actions
  addDecision: (decision: DecisionResponse) =>
    set((state) => ({
      decisions: [decision, ...state.decisions].slice(0, 20), // Keep only last 20
    })),

  setLoading: (isLoading: boolean) =>
    set({ isLoading }),

  setError: (error: string | null) =>
    set({ error }),

  openDrawer: (decision: DecisionResponse) =>
    set({
      selectedDecision: decision,
      isDrawerOpen: true,
    }),

  closeDrawer: () =>
    set({
      selectedDecision: null,
      isDrawerOpen: false,
    }),

  clearError: () =>
    set({ error: null }),
}));