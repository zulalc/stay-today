export type actionFunction = (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
) => Promise<{ message: string }>;
