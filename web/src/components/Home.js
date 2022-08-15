import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CustomCard from "./Card";
import { getAllProducts, getProductsByCategoryAndSubCategory } from "./../services/api";
import { allCategories, categoriesNames,  } from "../resourcees/categories";

export default function Home() {
  const [error, setError] = useState("");
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategorySelected, setSubCategorySelected] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") setCategory(value);

    if (name === "subCategory") setSubCategorySelected(value);
    console.log("e.target: ", e.target);
    // console.log("category: ", category);
    // console.log("subCategory: ", subCategory);
  };
  const handleCategory = (value) => {
    setCategory(value);
    // console.log("handleCategory :", value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategory(subCategory.subCategories);
        setSubCategorySelected("");
      }
    });
  };

  const handleSearch = async () => {
    if (!category) return;
    const data = { category: category, subCategory: subCategory };

    const res = await getProductsByCategoryAndSubCategory(data);
    switch (res.statusId) {
      case 1:
        // setCategoriesNames(res.value.categoriesNames);
        setProducts(res.value);
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
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getAllProducts();
      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
         
          setProducts(res.value);
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
    <Grid item container justifyContent="center" className="create" xs={12}>
      <Grid
        direction={"row"}
        item
        container
        justifyContent="center"
        xs={12}
        className="searchBar"
      >
        <Grid
          direction={"column"}
          item
          container
          xs={12}
          md={2}
          className="searchBar"
        >
          <select
            name="category"
            placeholder="קטגוריה ראשית"
            value={category}
            onChange={handleChange}
            onClick={(e) => handleCategory(e.target.value)}
          >
            <option value="" disabled>
              קטגוריה ראשית
            </option>

            {categoriesNames.map((category, pos) => {
              return (
                <option value={category} key={pos}>
                  {category}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid
          direction={"column"}
          item
          container
          xs={12}
          md={2}
          className="searchBar"
        >
          <select
            name="subCategory"
            placeholder=" תת קטגוריה ראשית"
            value={subCategorySelected}
            onChange={handleChange}
          >
            <option value="" disabled>
              קטגוריה משנית
            </option>
            {subCategory &&
              subCategory.map((category, pos) => {
                return (
                  <option value={category} key={pos}>
                    {category}
                  </option>
                );
              })}
          </select>
        </Grid>
        <Grid
          direction={"column"}
          item
          container
          xs={12}
          md={2}
          className="searchBar"
        >
          <input
            name="search"
            placeholder="חיפוש"
            value={category}
            onChange={handleChange}
            onClick={(e) => handleCategory(e.target.value)}
          ></input>
        </Grid>
        <Grid
          direction={"column"}
          item
          container
          xs={12}
          md={2}
          className="searchBar"
        >
          <button
            name="search"
            placeholder="חיפוש"
            value={category}
            onClick={handleSearch}
          >
            חפש
          </button>
        </Grid>
      </Grid>
      {/* {error && <p>{error}<p/>}  */}
      {products &&
        products.map((product, index) => (
          <CustomCard {...product} key={index} id={product.date.toString()} />
        ))}
      {products && products.length==0 && (
        <h1>לא נמצאו תוצאות עבור מוצר זה</h1>
      )}
    </Grid>
  );
}
