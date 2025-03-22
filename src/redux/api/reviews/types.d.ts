namespace REVIEWS {
  // Клиент
  export interface Client {
    id: number;
    first_name: string;
    last_name: string;
    user_picture: string | null;
    from_user: string;
  }

  // Изображение
  export interface ReviewImage {
    id: number;
    image: string;
  }

  export interface AttractionReviewImage {
    id: number;
    image: string;
  }

  export interface KitchenReviewImage {
    id: number;
    image: string;
  }

  export interface ReplyAttractionReview {
    id: number;
    user: Client;
    comment: string;
    created_date: string;
  }

  export interface ReplyKitchenReview {
    id: number;
    user: Client;
    comment: string;
    created_date: string;
  }

  //! Rewiews
  export type RewiewHotelResponse = {
    id: number;
    client: Client;
    hotel: number;
    comment: string;
    hotel_review_image: ReviewImage[];
    count_like: number;
    reply_hotel_reviews: ReplyHotelReview[];
  };

  export type ReviewAttractionResponse = {
    id: number;
    client: Client;
    attractions: string;
    comment: string;
    attraction_review_image: AttractionReviewImage[];
    count_like: number;
    reply_attraction_reviews: ReplyAttractionReview[];
  };

  export type ReviewKitchenResponse = {
    id: number;
    client: Client;
    kitchen_region: string;
    kitchen: number,
    comment: string;
    created_at: string;
    kitchen_review_image: KitchenReviewImage[];
    count_like: number;
    reply_kitchen_reviews: ReplyKitchenReview[];
  };

  export type RewiewHotelRequest = {
    client: number;
    comment: string;
    hotel: number | null;
    rating: number;
    images: string[];
  };

  export type ReviewKitchenRequest = {
    client: number;
    kitchen_region: number;
    comment: string;
    rating: number;
    nutrition_rating: number;
    service_rating: number;
    price_rating: number;
    atmosphere_rating: number;
    images: string[];
  };

  export type ReviewAttractionRequest = {
    client: number;
    attractions: number;
    comment: string;
    rating: number;
    images: string[];
  };

  export type ReviewPlacesRequest = {
    client: number;
    popular: number;
    comment: string;
    rating: number;
    images: string[];
  };

  export type ReviewPlacesResponse = {
    id: number;
    client: Client;
    popular: string;
    review_image: ReviewImage[];
    comment: string;
    rating: number;
    created_date: string;
  };

  //! Reply
  export type ReplyAttractionResponse = {
    review: number
    comment: string
    user: number
    created_date: string
  }

  export type ReplyAttractionRequest = {
    review: number
    comment: string
    user: number
  }

  export type ReplyHotelResponse = {
    review: number
    comment: string
    user: number
    created_date: string
  }

  export type ReplyHotelRequest = {
    review: number
    comment: string
    user: number
  }

  export type ReplyKitchenResponse = {
    review: number
    comment: string
    user: number
    created_date: string
  }

  export type ReplyKitchenRequest = {
    review: number
    comment: string
    user: number
  }

  export type ReplyPlaceResponse = {
    review: number
    comment: string
    user: number
    created_date: string
  }

  export type ReplyPlaceRequest = {
    review: number
    comment: string
    user: number
  }

  export interface ReplyHotelReview {
    id: number
    user: Client
    comment: string
    created_date: string
  }

  export interface Review {
    [x: string]: any; // Для динамических свойств
    id: number;
    entityId: number | string; 
    client: Client;
    comment: string;
    rating: number
    reviewImages: ReviewImage[];
    createdAt: string; 
    replyReviews: ReplyHotelReview[]
  }

  export interface StaticReview {
    id: number;
    name: string; 
    avgRating: number; 
    ratingCount: number;
    excellent: number;
    good: number;
    notBad: number;
    bad: number;
    terribly: number;
  }
}

// Экспортируем namespace для использования в других файлах
export { REVIEWS };