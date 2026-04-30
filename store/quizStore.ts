import { create } from "zustand";

export interface QuizItem {
  readonly field_type: string;
  readonly options?: string[] | null;
  readonly question: string;
  readonly answer: string;
  readonly id: string;
}
export interface QuziData {
  readonly title: string;
  readonly quiz: QuizItem[];
}

interface QuziStore {
  data: QuziData | null;
  isPending: boolean;
  setGeneratedQuiz: (data: QuziData) => void;
  resetGeneratedQuiz: () => void;
  setIsPending: (isPending: boolean) => void;
}

export const useQuziStore = create<QuziStore>((set) => ({
  data: null,
  isPending: false,
  setGeneratedQuiz: (data: QuziData) => set({ data: data, isPending: false }),
  resetGeneratedQuiz: () => set({ data: null, isPending: false }),
  setIsPending: (isPending: boolean) => set({ isPending }),
}));
