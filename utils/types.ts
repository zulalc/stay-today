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
  description: string;
  amenities: string;
  profile: {
    profileImage: string;
    firstName: string;
  };
};

export type UserInfoProps = {
  profile: {
    profileImage: string;
    firstName: string;
  };
};

export type ReviewProps = {
  id: string;
  profile: {
    profileImage: string;
    firstName: string;
  };
  rating: number;
  comment: string;
  updatedAt: string;
};

export type UserReviewProps = {
  id: string;
  property: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  updatedAt: string;
};
