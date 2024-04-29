import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

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
        {
          photos &&
            photos.map((photo) => {
              return <img src={photo.photoUrl} key={photo.id} alt="" />;
            }) // Add a comma here
        }
      </div>
    </div>
  );
};

export default Reviews;
