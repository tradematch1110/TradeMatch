import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { Grid } from "@mui/material";
import CustomCard from "./Card";
import {
  getAllProducts,
  getProductsByCategoryAndSubCategory,
} from "./../services/api";
import { allCategories, categoriesNames } from "../resourcees/categories";
import Loader from "./Loader";

export default function Home() {
  // console.log(allProducts);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [textValue, setTextValue] = useState("");

  const [products, setProducts] = useState("");
  const [filterdProducts, setFilterdProducts] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategorySelected, setSubCategorySelected] = useState("");
  //textValue
  const searchRef = useRef();
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
  const handleFreeSearch = async (value) => {
    console.log(value);
    let subCategories = allCategories.find((category) =>
      category.subCategories.find((name) => name.includes(value))
    );
    let result;
    if (subCategories) {
      result = subCategories.subCategories.find((name) => name.match(value));
    }
    if (subCategories){
      setTextValue(
        `קטגוריה ראשית: ${subCategories.name}, קטגוריה משנית:  ${result}`
      );}
      console.log(textValue)
  };
  const handleSearch = async () => {
    if (!category) return;
    const data = { category: category, subCategory: subCategory };
    setFilterdProducts(null);
    setLoading(true);
    const res = await getProductsByCategoryAndSubCategory(data);
    switch (res.statusId) {
      case 1:
        // setCategoriesNames(res.value.categoriesNames);
        setProducts(null);
        setFilterdProducts(res.value);
        console.log("filterdProducts:", filterdProducts);
        setLoading(false);
        break;
      case 2:
        setError(res);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 5000);
        break;
      default:
    }
  };
  // useEffect(() => {
  //   console.log("filterdProducts:", filterdProducts);
  // }, [filterdProducts]);
  const handleClear = async () => {
    setLoading(true);
    setFilterdProducts(null);
    setCategory("");
    setSubCategory("");

    const res = await getAllProducts();
    switch (res.statusId) {
      case 1:
        // setCategoriesNames(res.value.categoriesNames);
        setProducts(res.value);
        console.log(res.value);
        setLoading(false);
        break;
      case 2:
        setError(res);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 5000);
        break;
      default:
    }
  };
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await getAllProducts();
      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);

          setProducts(res.value);
          console.log(res.value);
          setLoading(false);
          break;
        case 2:
          setError(res);
          setLoading(false);
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
      {error && <h1>{error}</h1>}
      {loading && <Loader />}
      {!loading && (
        <Grid
          item
          container
          justifyContent="center"
          className="create"
          xs={12}
          style={{ marginBottom: 100 }}
        >
          <Grid
            direction={"row"}
            item
            container
            justifyContent="center"
            xs={12}
            className="searchBar"
            style={{paddingTop:30}}
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
              style={{ background: "white", margin: 5 }}
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
            <Grid
              direction={"column"}
              item
              container
              xs={12}
              md={2}
              className="searchBar"
              style={{ background: "white", margin: 5 }}
            >
              <button
                name="searchClear"
                placeholder="נקה חיפוש"
                onClick={handleClear}
              >
                נקה
              </button>
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
                type="text"
                name="search"
                placeholder={"חיפוש חופשי"}
                ref={searchRef}
                onKeyUp={(e) => handleFreeSearch(e.target.value)}
              ></input>
            </Grid>
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
                alignItems="center"
                xs={12}
                className="searchBar"
                style={{
                  marginBottom: { xs: 40, md: 30 },
                  maxWidth: "80%",
                  height: 35,
                  borderRadius: 5,
                }}
              >
                {textValue && <h2 style={{ color: "white" }}>{textValue}</h2>}
              </Grid>
            </Grid>
          </Grid>
          {/* {error && <p>{error}<p/>}  */}
          {products &&
            products.map((product, index) => (
              <CustomCard
                {...product}
                key={index}
                id={product.date.toString()}
              />
            ))}
          {filterdProducts &&
            filterdProducts.map((filterdProduct, index) => (
              <CustomCard
                {...filterdProduct}
                key={index}
                id={filterdProduct.date.toString()}
              />
            ))}
          {filterdProducts && filterdProducts.length === 0 && (
            <h1>לא נמצאו תוצאות עבור מוצר זה</h1>
          )}
        </Grid>
      )}
    </>
  );
}
