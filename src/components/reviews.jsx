import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import avatarImg from "../assets/avatar-img.jpg";
import "../styles/Reviews.css";

const Reviews = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://site--fork-backend--rh6mx4gc4kyd.code.run/reviews/${id}`
        );
        setReviews(response.data.reviews);
        console.log(response.data.reviews);
        setIsLoading(false);

        const allPhotos =
          response.data.reviews.data.restaurantRatingsList.ratings.flatMap(
            (review) => review.photos
          );
        setPhotos(allPhotos);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (isLoading) {
    return (
      <div className="loader">
        <TailSpin
          visible={true}
          height="200"
          width="200"
          color="#00645a"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
    );
  }

  return (
    <div className="main-reviews">
      <h3 className="container">Avis</h3>
      <div>
        {reviews.data.restaurantRatingsList?.ratings.map((review) => {
          return (
            <div className="review container" key={review.id}>
              <div className="reviewer">
                <div className="avatar">
                  <img
                    src={
                      review.reviewer.avatar ===
                      "https://graph.facebook.comnull/"
                        ? avatarImg
                        : review.reviewer.avatar
                    }
                    alt="avatar"
                  />
                </div>
                <span className="firstName">{review.reviewer.firstName}</span>
                <span> {review.reviewer.lastName}</span>
              </div>
              <p className="review-body">{review.review.reviewBody}</p>
              <p className="review-rating">{review.ratingValue} /10</p>
            </div>
          );
        })}
      </div>
      <h2 className="container">Photos des utilisateurs</h2>
      <div className="photo-grid container">
        {photos &&
          photos.map((photo) => {
            return <img src={photo.photoUrl} key={photo.id} alt="" />;
          })}
      </div>
    </div>
  );
};

export default Reviews;
