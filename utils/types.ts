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

export type PropertyDetailsProps = {
  id: string;
  name: string;
  country: string;
  tagline: string;
  price: number;
  image: string;
  bathrooms: number;
  bedrooms: number;
  beds: number;
  guests: number;
};
