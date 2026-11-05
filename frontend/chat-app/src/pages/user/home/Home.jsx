import React from "react";
import NewArrivals from "./NewArrivals";
import Sale from "./Sale";
import FashionPromo from "./FashionPromo";
import HeroSection from "./HeroSection";
import SubFooter from "./SubFooter";
import CustomersReviews from "./CustomersReviews"

const Home = () => {
  return (
    <>
      <div>
        <HeroSection />
        <NewArrivals />
        <Sale />
       
        <FashionPromo />
         <CustomersReviews/>
       
      </div>
    </>
  );
};

export default Home;
