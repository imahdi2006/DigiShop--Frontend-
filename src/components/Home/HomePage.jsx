import React from "react";
import HeroSection from "./HeroSection";

// img
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeatureProduct from "./FeatureProduct";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="/product/67cdbe09b205ac5a9a62c231"
        image={iphone}
      />

      {/* Featured Products */}
      <FeatureProduct />
      {/* hero section */}
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colour-matched Magic addessories to your bag after configuring your Mac mini."
        link="/product/67cdbe09b205ac5a9a62c23d"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
