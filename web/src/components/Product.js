import React, { useEffect, useState } from "react";
import CustomCard from "./Card";
import { useLocation } from "react-router-dom";
import {getProductById} from "../services/api"

export default function Product() {
  const search = useLocation().search;
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const id = new URLSearchParams(search).get("name");
    console.log("product", id);
    async function fetchData() {
      const res = await getProductById(id);
      console.log("res in product", res);

      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
          setProduct(res.value);
          console.log(res.value);

          break;
        case 2:
          setError(res);
          setTimeout(() => {
            setError("");
          }, 5000);
          break;
        default:
      }
    }
    fetchData();

  }, [error]);

  return (
    <>
      <h3>עמוד מוצר</h3>
      {product && <CustomCard {...product} />}
    </>
  );
}
