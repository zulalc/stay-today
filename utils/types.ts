export type actionFunction = (
  prevState: { message?: string; error?: Record<string, string[]> },
  formData: FormData
) => Promise<{ message: string }>;

export type PropertyProps = {
  id: string;
  name: string;
  country: string;
  tagline: string;
  price: number;
  image: string;
};
