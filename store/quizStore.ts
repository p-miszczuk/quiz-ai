import { create } from "zustand";
import { Quiz } from "@/validators/quiz";

type UpdateQuizPayload =
  | { type: "option"; id: string; optionIndex: number; value: string }
  | { type: "question"; id: string; value: string }
  | { type: "answer"; id: string; value: string };

interface QuziStore {
  data: Quiz | null;
  isPending: boolean;
  setGeneratedQuiz: (data: Quiz) => void;
  resetGeneratedQuiz: () => void;
  setIsPending: (isPending: boolean) => void;
  updateQuiz: (data: any) => void;
}

const applyItemUpdate = (
  item: Quiz["content"][number],
  payload: UpdateQuizPayload,
): Quiz["content"][number] => {
  if (item.id !== payload.id) {
    return item;
  }

  switch (payload.type) {
    case "option":
      return {
        ...item,
        options: item.options.map((option, index) =>
          index === payload.optionIndex ? payload.value : option,
        ),
      };
    case "question":
      return {
        ...item,
        question: payload.value,
      };
    case "answer":
      return {
        ...item,
        answer: payload.value,
      };
    default:
      return payload;
  }
};

const updateQuizElement = (state: Quiz, payload: UpdateQuizPayload) => {
  const quizItem = state?.content?.find((item) => item.id === payload.id);
  if (!quizItem) return;

  return {
    ...state,
    content: state.content.map((item) => applyItemUpdate(item, payload)),
  };
};

export const useQuziStore = create<QuziStore>((set, get) => ({
  data: null,
  isPending: false,
  setGeneratedQuiz: (payload: Quiz) => set({ data: payload, isPending: false }),
  resetGeneratedQuiz: () => set({ data: null, isPending: false }),
  setIsPending: (isPending: boolean) => set({ isPending }),
  updateQuiz: (payload: UpdateQuizPayload) => {
    const state = get().data;
    if (!state) return;

    const updateData = updateQuizElement(state, payload);
    if (!updateData) return;
    set({ data: updateData });
  },
}));
