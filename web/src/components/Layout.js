import React from 'react'
import Footer from './Footer';
import Header from './Header'
import Main from './Main';


function Layout() {
  return (
    <div className="page-container">
      <Header />

      <Main className="create" />
      <Footer />
    </div>
  );
}

export default Layout
