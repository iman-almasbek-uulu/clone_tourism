"use client";
import { Search } from "lucide-react";
import styles from "../Reviews.module.scss";
import { FC, useEffect, useState } from "react";
import Stars from "../../stars/Stars";
import { UserOutlined } from "@ant-design/icons";
import { FilterModal } from "./filterModal/FilterModal";
import { useGetReviewsQuery } from "@/redux/api/reviews";
import { Avatar, Space } from "antd";
import Image from "next/image";
import ReviewModal from "../statisticColumn/reviewModal/ReviewModal";
import { ImageModal } from "../../imageModal/ImageModal";
import { REVIEWS } from "@/redux/api/reviews/types";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { useGetMeQuery } from "@/redux/api/auth";
import { useRouter } from "next/navigation";

interface ReviewsColumnProps {
  entityType: string;
  isCurrent: number | null;
  reviewStatic?: REVIEWS.StaticReview;
  isTab: number;
}

const ReviewsColumn: FC<ReviewsColumnProps> = ({
  entityType,
  isCurrent,
  reviewStatic,
  isTab,
}) => {
  const {t} = useTranslate()
  const [isShow, setIsShow] = useState(false);
  const [dataReviews, setDataReviews] = useState<REVIEWS.Review[]>([]);
  const [ratingFilter, setRatingFilter] = useState<string | undefined>();
  const [monthFilter, setMonthFilter] = useState<string | undefined>();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { data: reviewsData } = useGetReviewsQuery({
    entityType,
    rating: ratingFilter,
    month: monthFilter,
    search: searchFilter,
  });
  const { status } = useGetMeQuery();
  const router = useRouter();
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | undefined>();
  const [isMobile, setIsMobile] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(4); 

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedReviewIndex !== null) {
      const maxIndex = dataReviews[selectedReviewIndex]?.reviewImages.length - 1 || 0;
      if (selectedImage < maxIndex) {
        setSelectedImage(selectedImage + 1);
      }
    }
  };

  useEffect(() => {
    if (reviewsData) {
      const filteredReviews = reviewsData.filter((review) => {
        return String(review.entityId) === String(isCurrent);
      });

      const sortedReviews = filteredReviews.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      setDataReviews(sortedReviews);
    } else {
      setDataReviews([]);
    }
  }, [reviewsData, isCurrent, entityType]);

  const applyFilters = (rating?: string, month?: string) => {
    setRatingFilter(rating);
    setMonthFilter(month);
  };

  const handleReplyClick = (reviewId: number) => {
    if (status === "rejected") {
      router.push("/auth/sign-in");
    } else if (status === "fulfilled") {
      setSelectedReviewId(reviewId);
      setShowReplyModal(true);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x400/e0e0e0/969696?text=Image+Not+Found";
    target.alt = "Image not available";
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 2);
  };

  return (
    <div className={styles.reviewsColumn}>
      <div className={`${styles.flex} ${styles.gap3} ${styles.mb6}`}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={isMobile ? 16 : 20} color="#5A5A5A" />
          <input
            onChange={(e) => setSearchFilter(e.target.value)}
            type="text"
            placeholder={t("Поиск", "بحث", "Search")}
            className={styles.searchInput}
          />
        </div>
        <button
          onClick={() => setIsShow(!isShow)}
          className={styles.buttonSecondary}
        >
          {t("Фильтры", "تصفية", "Filters")}
        </button>
      </div>
      {isShow && (
        <FilterModal
          reviewStatic={reviewStatic}
          setIsShow={setIsShow}
          onApply={applyFilters}
        />
      )}

      <div className={styles.spaceY6}>
        {dataReviews.slice(0, visibleReviews).map((review, reviewIndex) => (
          <div key={review.id} className={styles.reviewCard} style={{ padding: "0" }}>
            <div className={`${styles.itemsCenter} ${styles.gap3}`}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatarBlock}>
                  <Space direction="vertical" size={isMobile ? 15 : 20}>
                    <Space wrap size={isMobile ? 15 : 20}>
                      <Avatar
                        size={isMobile ? 40 : 47}
                        icon={
                          review.client.user_picture ? (
                            <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                              <Image
                                src={review.client.user_picture}
                                alt="avatar"
                                width={isMobile ? 40 : 47}
                                height={isMobile ? 40 : 47}
                                style={{
                                  objectFit: "cover",
                                  height: "100%"
                                }}
                                unoptimized={true}
                              />
                            </div>
                          ) : (
                            <UserOutlined />
                          )
                        }
                      />
                    </Space>
                  </Space>
                  <div>
                    <div className={styles.authorName}>
                      {review.client.first_name} {review.client.last_name}
                    </div>
                    <div className={styles.authorPlace}>
                      {review.client.from_user}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.gap4}`}>
                <Stars width={isMobile ? 14 : 16} height={isMobile ? 14 : 16} rating={review.rating} />
                <span className={styles.reviewDate}>{review.createdAt}</span>
              </div>
            </div>
            <p className={styles.reviewText}>{review.comment}</p>
            {review.reviewImages.length > 0 && (
              <div className={styles.imageGrid}>
                {review.reviewImages.map((image, index) => (
                  <div key={image.id} className={styles.reviewImageContainer}>
                    <Image
                      onClick={() => {
                        setSelectedReviewIndex(reviewIndex);
                        setSelectedImage(review.reviewImages.findIndex((el) => el.id === image.id));
                      }}
                      src={image.image}
                      alt={`Review image ${index + 1}`}
                      className={styles.reviewImage}
                      width={isMobile ? 150 : 150}
                      height={120}
                      style={{ objectFit: "cover" }}
                      onError={handleImageError}
                      unoptimized={true}
                    />
                  </div>
                ))}
              </div>
            )}

            {selectedImage !== null && selectedReviewIndex !== null && (
              <ImageModal
                images={dataReviews[selectedReviewIndex]?.reviewImages || []}
                selectedImage={selectedImage}
                onClose={() => {
                  setSelectedImage(null);
                  setSelectedReviewIndex(null);
                }}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSelectImage={setSelectedImage}
              />
            )}

            <button
              className={styles.replyButton}
              onClick={() => handleReplyClick(review.id)}
            >
              {t("Ответить", "الرد", "Reply")}
            </button>

            {review.replyReviews && review.replyReviews.length > 0 && (
              <div
                className={styles.spaceY6}
                style={{
                  padding: isMobile ? "0px 0 0 0" : "0px 0 0 0",
                }}
              >
                {review.replyReviews.map((el) => (
                  <div
                    key={el.id}
                    className={styles.reviewCard }
                    style={{
                      padding: isMobile ? "0 0 10px 20px" : "0 0 10px 50px",
                      margin: isMobile ? "0 0 5px 0" : "0 0 10px 0",
                    }}
                  >
                    <div className={`${styles.itemsCenter} ${styles.gap3}`}>
                      <div className={styles.avatarContainer} style={{ margin: "0" }}>
                        <div className={styles.avatarBlock}>
                          <Space direction="vertical" size={isMobile ? 15 : 20}>
                            <Space wrap size={isMobile ? 15 : 20}>
                              <Avatar
                                size={isMobile ? 40 : 47}
                                icon={
                                  el.user.user_picture ? (
                                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                                      <Image
                                        src={el.user.user_picture}
                                        alt="avatar"
                                        width={isMobile ? 40 : 47}
                                        height={isMobile ? 40 : 47}
                                        style={{
                                          objectFit: "cover",
                                          height: "100%"
                                        }}
                                        unoptimized={true}
                                      />
                                    </div>
                                  ) : (
                                    <UserOutlined />
                                  )
                                }
                              />
                            </Space>
                          </Space>
                          <div>
                            <div className={styles.authorName}>
                              {el.user.first_name} {el.user.last_name}
                            </div>
                            <div className={styles.authorPlace}>
                              {el.user.from_user}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`${styles.gap4}`}>
                        <span className={styles.reviewDate}>{el.created_date}</span>
                      </div>
                    </div>
                    <p
                      className={styles.reviewText}
                      style={{
                        margin: isMobile ? "8px 0 0 0" : "0",
                        fontSize: isMobile ? "14px" : "inherit",
                        lineHeight: isMobile ? "20px" : "inherit",
                      }}
                    >
                      {el.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {visibleReviews < dataReviews.length && (
        <button onClick={loadMoreReviews} className={styles.showMoreButton}>
          Show More 
        </button>
      )}

      {showReplyModal && (
        <ReviewModal
          isCurrent={isCurrent}
          onClose={() => setShowReplyModal(false)}
          onSubmit={() => setShowReplyModal(false)}
          uploadedFiles={[]}
          isTab={isTab}
          isReply={true}
          reviewId={selectedReviewId}
        />
      )}

      <div className={styles.pagination}>
        <div className={`${styles.flex} ${styles.gap3}`}>
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`${styles.paginationDot} ${
                dot === 1 ? styles.active : styles.inactive
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsColumn;