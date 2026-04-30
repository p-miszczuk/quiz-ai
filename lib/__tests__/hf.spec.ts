import { generateTextWithHuggingFace } from "../hf";

const originalEnv = process.env;

describe("hugging face fetch", () => {
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      HUGGINGFACE_URL: "https://api.huggingface.co/models/google/flan-t5-base",
      HUGGINGFACE_API_KEY: "1234567890",
      HUGGINGFACE_MODEL: "test-model",
    };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  it("should return the correct data", async () => {
    const messages = [{ role: "user" as const, content: "Some text" }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      text: async () =>
        JSON.stringify({ choices: [{ message: { content: "Some text" } }] }),
    });

    const result = await generateTextWithHuggingFace(messages);
    expect(result).toEqual({ content: "Some text", error: null });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      process.env.HUGGINGFACE_URL!,
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: "Bearer 1234567890",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "test-model",
          messages,
          temperature: 0.1,
        }),
      }),
    );
  });

  it("should return an error if the fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      text: async () => "<!DOCTYPE html>",
    });

    const result = await generateTextWithHuggingFace([
      { role: "user", content: "x" },
    ]);

    expect(result.content).toBeNull();
    expect(result.error).toBeInstanceOf(SyntaxError);
  });

  it("should returns error when fetch rejects", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));
    const result = await generateTextWithHuggingFace([
      { role: "user", content: "x" },
    ]);
    expect(result.content).toBeNull();
    expect(result.error).toEqual(new Error("network down"));
  });
});
