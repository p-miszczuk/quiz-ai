type HuggingFaceMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};
type HuggingFaceResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};
export type AIGenerationResult =
  | { content: string; error: null }
  | { content: null; error: unknown };

export async function generateTextWithHuggingFace(
  messages: HuggingFaceMessage[],
): Promise<AIGenerationResult> {
  try {
    const res = await fetch(process.env.HUGGINGFACE_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.HUGGINGFACE_MODEL!,
        messages,
        temperature: 0.1,
      }),
    });
    const text = await res.text();
    const data: HuggingFaceResponse = JSON.parse(text);
    return { content: data.choices[0].message.content, error: null };
  } catch (error) {
    return { content: null, error };
  }
}
