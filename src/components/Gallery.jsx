import React, { useEffect, useState } from "react";
import TourCard from "./Tourcard";

const Gallery = ({ tours, setTours, onRemove, selectedTour }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(null);

      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const apiUrl = "https://course-api.com/react-tours-project";
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }

      const data = await response.json();

      const formattedTours = data.map((tour) => ({
        id: tour.id,
        name: tour.name,
        info: tour.info,
        image: tour.image,
        price: tour.price,
      }));

      setTours(formattedTours);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Filter tours based on the selected tour name
  const filteredTours =
    selectedTour === "All"
      ? tours
      : tours.filter((tour) => tour.name === selectedTour);

  if (loading) {
    return (
      <div className="status-message">
        <h2>Loading tours...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error">
        <h2>Error loading tours</h2>
        <p>{error}</p>
        <button onClick={fetchTours}>Retry</button>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="status-message">
        <h2>No tours available</h2>
        <button onClick={fetchTours}>Refresh Tours</button>
      </div>
    );
  }

  return (
    <section className="gallery">
      {filteredTours.map((tour) => (
        <TourCard key={tour.id} {...tour} onRemove={onRemove} />
      ))}
    </section>
  );
};

export default Gallery;