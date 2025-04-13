// import React from 'react'
// import Navbar_shop from '../../Components/Navbar_shop'
// import Products from './Products'
// import Footer from '../../Components/Footer';
// const Marketplace = () => {
//   return (
//     <div>
//       <Navbar_shop/>
//       <Products/>
//       <Footer/>
//     </div>
//   )
// }

// export default Marketplace


import React from 'react';
import Navbar_shop from '../../Components/Navbar_shop';
import Products from './Products';
import Footer from '../../Components/Footer';

const Marketplace = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar_shop />
      <main className="flex-grow">
        <Products />
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;