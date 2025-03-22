namespace AUTH {
  export type GetResponse = {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    user_picture: string | null;
    from_user: string;
    cover_photo: string | null;
    birth_date: string;
  }[];
  export type GetRequest = void;

  export type PatchMeResponse = {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    user_picture?: string | null;
    from_user?: string;
    cover_photo?: string | null;
    birth_date?: string;
  };
  export type PatchMeRequest = {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    user_picture?: string | null;
    from_user?: string;
    cover_photo?: string | null;
    birth_date?: string;
  };

  export type PostLoginResponse = {
    access: string;
    refresh: string;
  };
  export type PostLoginRequest = {
    email: string;
    password: string;
  };

  export type PostRegistrationResponse = {
    access: string;
    refresh: string;
  };
  export type PostRegistrationRequest = {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    birth_date: string;
  };

  export type PostLogoutResponse = void;
  export type PostLogoutRequest = void;

  export type PatchRefreshResponse = {
    refresh: string;
    access: string;
  };
  export type PatchRefreshRequest = {
    refresh: string;
  };

  export type PostForgotPasswordResponse = {
    status: string;
  };
  export type PostForgotPasswordRequest = {
    email: string;
  };

  export type PostResetPasswordResponse = {
    message: string;
  };
  export type PostResetPasswordRequest = {
    email: string;
    reset_code: string;
    new_password: string;
  };

  export type Attraction = {
    id: number;
    attraction_name: string;
    region_category: string;
    main_image: string;
    description: string;
    popular_places: string[];
    avg_rating: number;
    rating_count: number;
  };

  export type PopularRegion = {
    id: number;
    popular_name: string;
    popular_image: string;
    region: string;
    avg_rating: number;
    rating_count: number;
    address?: string;
  };

  export type Gallery = {
    id: number;
    gallery_name: string;
    gallery_image: string;
    address: string;
    avg_rating: number;
    rating_count: number;
  };

  export type Kitchen = {
    id: number;
    kitchen_name: string;
    price: string;
    popular_places: string[];
    kitchen_region: string;
    type_of_cafe: string;
    average_rating: number;
    rating_count: number;
    main_image: string;
  };

  export type Hotel = {
    id: number;
    name: string;
    main_image: string;
    avg_rating: number;
    rating_count: number;
    region: string;
    popular_places: string[];
    latitude?: number;
    longitude?: number;
  };

  export type FavoriteItem = {
    id: number;
    user?: number;
    attractions?: Attraction;
    popular_region?: PopularRegion;
    gallery?: Gallery;
    hotels?: Hotel;
    kitchen?: Kitchen;
    like?: boolean;
    created_date?: string;
  };
}

export { AUTH };