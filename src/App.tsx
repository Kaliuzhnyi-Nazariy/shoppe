// import { Route, Routes } from "react-router";

// import "keen-slider/keen-slider.min.css";
// import "./index.css";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import ProductList from "./components/Products/ProductList";
// import Searchbar from "./components/Searchbar";
// import Slider from "./components/Slider";
import Product from "./components/Product/Product";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<h1>Test</h1>} />
        </Route>
      </Routes> */}
      <Header />
      {/*<Searchbar /> */}
      {/* <Slider /> */}
      {/* <ProductList /> */}
      <Product />
      <Footer />
    </>
  );
}

export default App;
