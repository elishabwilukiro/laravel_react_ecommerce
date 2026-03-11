import React from 'react';
import Hero from './Hero';
import LatestProduct from './LatestProduct';
import FeaturedProduct from './FeaturedProduct';
import Layout from './Layout';

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <LatestProduct />
        <FeaturedProduct />
      </Layout>
    </>
  );
};

export default Home;
