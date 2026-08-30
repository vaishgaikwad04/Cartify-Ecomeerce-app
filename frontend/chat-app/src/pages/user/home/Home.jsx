import React from "react";
import NewArrivals from "./NewArrivals";
import Sale from "./Sale";
import FashionPromo from "./FashionPromo";
import HeroSection from "./HeroSection";
import SubFooter from "./SubFooter";

const Home = () => {
  return (
    <>
      <div>
        <HeroSection />
        <NewArrivals />
        <Sale />
        <FashionPromo />
        <SubFooter />
      </div>
    </>
  );
};

export default Home;
