import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        const response = await axios.get(`http://localhost:3000/reviews/${id}`);
        setReviews(response.data.reviews);
        console.log(response.data.reviews);
        setIsLoading(false);

        const allPhotos =
          response.data.reviews.data.restaurantRatingsList.ratings.map(
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Reviews</h3>
      <div>
        {reviews.data.restaurantRatingsList?.ratings.map((review) => {
          return (
            <div key={review.id}>
              <p>{review.review.reviewBody}</p>
              <p>{review.ratingValue}</p>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Photos des utilisateurs</h2>
        {photos.map((photo) => {
          return <img src={photo.photoUrl} key={photo.id} alt="" />;
        })}
      </div>
    </div>
  );
};

export default Reviews;
