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
    id: string;
  };
  bookings: BookingProps[];
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

export type BookingProps = {
  checkIn: Date;
  checkOut: Date;
};

export type DateRangeSelect = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type BookingDetailsProps = {
  id: string;
  property: {
    id: string;
    name: string;
    image: string;
    country: string;
  };
  checkIn: Date;
  checkOut: Date;
  totalFee: number;
  totalNights: number;
  paymentStatus: boolean;
};

export type RentalsProps = {
  id: string;
  name: string;
  country: string;
  price: number;
  totalNightSum: number | null;
  totalFeeSum: number | null;
};
