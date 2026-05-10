import { create } from "zustand";
import { Quiz } from "@/validators/quiz";

interface QuziStore {
  data: Quiz | null;
  isPending: boolean;
  setGeneratedQuiz: (data: Quiz) => void;
  resetGeneratedQuiz: () => void;
  setIsPending: (isPending: boolean) => void;
}

export const useQuziStore = create<QuziStore>((set) => ({
  data: null,
  isPending: false,
  setGeneratedQuiz: (data: Quiz) => set({ data, isPending: false }),
  resetGeneratedQuiz: () => set({ data: null, isPending: false }),
  setIsPending: (isPending: boolean) => set({ isPending }),
}));
