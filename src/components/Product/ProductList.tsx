import ProductItem from "./ProductItem";

const ProductList = () => {
  const listOfProduct: { title: string; price: number }[] = [
    { title: "title 1", price: 20.0 },
    { title: "title 2", price: 399.5 },
    { title: "title 3", price: 30.0 },
    { title: "title 4", price: 20.0 },
    { title: "title 5", price: 399.5 },
    { title: "title 6", price: 30.0 },
  ];
  return (
    <>
      {listOfProduct.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
          {listOfProduct.map((p) => {
            return <ProductItem key={p.title} product={p} />;
          })}
        </ul>
      ) : (
        <p>No products</p>
      )}
    </>
  );
};

export default ProductList;
