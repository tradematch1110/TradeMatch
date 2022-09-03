import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { allCategories, categoriesNames } from "../resourcees/categories";
import SelectCategories from "./SelectCategories";
import { Grid } from "@mui/material";
import { authContext } from "./../contexts/AuthContext";
import { createProduct } from "../services/api";
import FileBase64 from "react-file-base64";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import CustomCard from "./Card";
import { getProductById } from "./../services/api";
import Loader from "./Loader";

const CreateProduct = () => {
  const initialValues = {
    produectTitle: "",
    descriptions: "",
    condition: "",
    category: "",
    subCategory: "",
    images: [],
    replaceableCategoryNo1: "",
    replaceableSubCategoryNo1: "",
    replaceableCategoryNo2: "",
    replaceableSubCategoryNo2: "",
    replaceableCategoryNo3: "",
    replaceableSubCategoryNo3: "",
  };
  const navigate = useNavigate();
  const { currentUser } = useContext(authContext);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [imagesSelcted, setImagesSelcted] = useState({});
  const [imageErr, setImageErr] = useState("");
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [subCategoriesNames, setSubCategoriesNames] = useState("");
  const [subCategoriesNames1, setSubCategoriesNames1] = useState("");
  const [subCategoriesNames2, setSubCategoriesNames2] = useState("");
  const [subCategoriesNames3, setSubCategoriesNames3] = useState("");
  const [add2, setAdd2] = useState(false);
  const [add3, setAdd3] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [displayForm, setDisplayForm] = useState(true);
  const [partMatchProducts, setPartMatchProducts] = useState("");
  const [fullMatchProducts, setFullMatchProducts] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log("formValues: ", formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // images ? (formValues.images = images) : (formValues.images = []);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log("formValues: ", formValues);
    console.log("isSubmit: ", isSubmit);
  };

  useEffect(() => {
    console.log("formErrors: ", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("form is valid!!!!");
      setLoading(true);
      formValues.date = new Date();
      formValues.user = currentUser;
      formValues.images = { ...imagesSelcted };
      // formValues.images= items;
      // formValues.token = currentUser.accessToken;
      // fetch to server
      console.log("formValues with date: ", formValues);
      console.log("typeOf: ", typeof formValues);

      async function fetchData(values) {
        const res = await createProduct(values);
        console.log("respond from create product: ", res);
        switch (res.statusId) {
          case 1:
            // setCategoriesNames(res.value.categoriesNames);
            // console.log(res);
            setDisplayForm(false);
            if (res.value.matchResult.fullMatchProducts)
              setFullMatchProducts(res.value.matchResult.fullMatchProducts);
            if (res.value.matchResult.partMatchProducts)
              setPartMatchProducts(res.value.matchResult.partMatchProducts);
            setTimeout(() => {
              // navigate("/");
            }, 1000);
            setLoading(false);
            break;
          case 2:
            setError(res);
            setTimeout(() => {
              setError("");
            }, 5000);
            setLoading(false);
            break;
          default:
        }
      }
      fetchData(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.produectTitle) {
      errors.produectTitle = "שדה חובה";
    } else if (values.produectTitle.length < 2) {
      errors.produectTitle = "מינימום 2 תווים";
    }
    if (!values.descriptions) {
      errors.descriptions = "שדה חובה";
    } else if (values.descriptions.length < 2) {
      errors.descriptions = "מינימום 2 תווים";
    }
    if (!values.condition) {
      errors.condition = "שדה חובה";
    } else if (values.condition.length < 2) {
      errors.condition = "מינימום 2 תווים";
    }

    // if (!values.images) {
    //   errors.images = "קובץ לא תקין!";
    // }
    if (!values.category) {
      errors.category = "שדה חובה";
    }
    if (!values.subCategory) {
      errors.subCategory = "שדה חובה";
    }
    if (!values.replaceableCategoryNo1) {
      errors.replaceableCategoryNo1 = "שדה חובה";
    }
    if (!values.replaceableSubCategoryNo1) {
      errors.replaceableSubCategoryNo1 = "שדה חובה";
    }

    if (add2) {
      if (!values.replaceableCategoryNo2) {
        errors.replaceableCategoryNo2 = "שדה חובה";
      }
      if (!values.replaceableSubCategoryNo2) {
        errors.replaceableSubCategoryNo2 = "שדה חובה";
      }
    }
    if (add3) {
      if (!values.replaceableCategoryNo3) {
        errors.replaceableCategoryNo3 = "שדה חובה";
      }
      if (!values.replaceableSubCategoryNo3) {
        errors.replaceableSubCategoryNo3 = "שדה חובה";
      }
    }
    return errors;
  };

  const handleCategory = (value) => {
    console.log("handleCategory :", value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategoriesNames(subCategory.subCategories);
      }
    });
  };
  const handleReplaceableCategoryNo1 = (value) => {
    console.log("handleCategory :", value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategoriesNames1(subCategory.subCategories);
      }
    });
  };
  const handleReplaceableCategoryNo2 = (value) => {
    console.log("handleCategory :", value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategoriesNames2(subCategory.subCategories);
      }
    });
  };
  //handleReplaceableCategoryNo3
  const handleReplaceableCategoryNo3 = (value) => {
    console.log("handleCategory :", value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategoriesNames3(subCategory.subCategories);
      }
    });
  };

  const handleImages = (base64, index) => {
    console.log("base64.name : ", base64);
    const img = base64.name;
    if (!img) {
      console.log("image is required");
      setImageErr("קובץ לא תקין!");
    }
    if (!img.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)) {
      console.log("select valid image.");
      setImageErr("קובץ לא תקין!");
    } else {
      let url = process.env.REACT_APP_API || "";
      base64.crossOrigin = "Anonymous";
      base64.src = url + "?not-from-cache-please";

      base64.name = Math.floor(Math.random() * 5000000000 + 1) + base64.name;
      console.log("typeof(base64):", typeof base64);
      switch (index) {
        case 1:
          imagesSelcted.image1 = base64;
          setImage1(true);
          break;
        case 2:
          imagesSelcted.image2 = base64;
          setImage2(true);
          break;
        case 3:
          imagesSelcted.image3 = base64;
          setImage3(true);
          break;
      }
      console.log("image is valid");
    }
    // console.log(" items:", items);

    console.log("imagesSelcted :", imagesSelcted);
  };
  const handleRemoveImage = (index) => {
    switch (index) {
      case 1:
        delete imagesSelcted.image1;
        setImage1(false);
        break;
      case 2:
        delete imagesSelcted.image2;
        setImage2(false);
        break;
      case 3:
        delete imagesSelcted.image3;
        setImage3(false);
        break;
    }
    setIsSubmit(false);
    // console.log(" items:", items);
    console.log("imagesSelcted :", imagesSelcted);
  };

  return (
    <>
      {error && <h1>{error.message}</h1>}
      {loading && <Loader />}
      {!loading && (
        <Grid
          direction={"column"}
          item
          container
          justifyContent="center"
          xs={12}
        >
          {displayForm && (
            <div className="product_form">
              <h1>המוצר שלך</h1>

              <form onSubmit={handleSubmit}>
                <div className="divWrapper">
                  <label>שם המוצר</label>
                  <input
                    type="text"
                    placeholder="שם המוצר"
                    name="produectTitle"
                    value={formValues.produectTitle}
                    onChange={handleChange}
                  />
                  <p>{formErrors.produectTitle}</p>
                </div>
                <div className="divWrapper">
                  <label>תאור המוצר</label>
                  <textarea
                    placeholder="תאור המוצר"
                    name="descriptions"
                    value={formValues.descriptions}
                    onChange={handleChange}
                  ></textarea>
                  <p>{formErrors.descriptions}</p>
                </div>
                <div className="divWrapper">
                  <label>מצב המוצר</label>
                  <input
                    type="text"
                    name="condition"
                    placeholder="מצב המוצר"
                    value={formValues.condition}
                    onChange={handleChange}
                  />
                  <p>{formErrors.condition}</p>
                </div>
                <div className="divWrapper">
                  <label> תמונת המוצר</label>
                  <div className="inputWrapper">
                    <FileBase64
                      className="icon"
                      type="file"
                      multiple={false}
                      onDone={(base64) => handleImages(base64, 1)}
                    />
                    {image1 && (
                      <div className="icon">
                        <DeleteForeverIcon
                          color="disabled"
                          onClick={() => handleRemoveImage(1)}
                        ></DeleteForeverIcon>
                      </div>
                    )}
                    {image1 && (
                      <div>
                        <img
                          src={imagesSelcted.image1.base64}
                          alt=""
                          height="200px"
                          width="200px"
                        />
                      </div>
                    )}
                  </div>
                  <p>{imageErr}</p>
                  <div className="inputWrapper">
                    <FileBase64
                      className="icon"
                      type="file"
                      multiple={false}
                      onDone={(base64) => handleImages(base64, 2)}
                    />
                    {image2 && (
                      <DeleteForeverIcon
                        color="disabled"
                        className="icon"
                        onClick={() => handleRemoveImage(2)}
                      ></DeleteForeverIcon>
                    )}
                    {image2 && (
                      <div>
                        <img
                          src={imagesSelcted.image2.base64}
                          alt=""
                          height="200px"
                          width="200px"
                        />
                      </div>
                    )}
                  </div>
                  <p>{imageErr}</p>
                  <div className="inputWrapper">
                    <FileBase64
                      className="icon"
                      type="file"
                      multiple={false}
                      onDone={(base64) => handleImages(base64, 3)}
                    />
                    {image3 && (
                      <DeleteForeverIcon
                        color="disabled"
                        className="icon"
                        onClick={() => handleRemoveImage(3)}
                      ></DeleteForeverIcon>
                    )}
                    {image3 && (
                      <div>
                        <img
                          src={imagesSelcted.image3.base64}
                          alt=""
                          height="200px"
                          width="200px"
                        />
                      </div>
                    )}
                  </div>
                  <p>{imageErr}</p>
                  {/* <ImageUpload setImages={setImages} /> */}
                </div>
                <div className="optionWrapper">
                  <h3> איפיון המוצר</h3>
                  <label> קטגוריה ראשית</label>

                  <select
                    name="category"
                    placeholder="קטגוריה ראשית"
                    value={formValues.category}
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
                  <p>{formErrors.category}</p>

                  {subCategoriesNames && (
                    <div>
                      <label>קטגוריה משנית</label>
                      <select
                        name="subCategory"
                        placeholder=" תת קטגוריה ראשית"
                        value={formValues.subCategory}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          קטגוריה משנית
                        </option>

                        {subCategoriesNames.map((category, pos) => {
                          return (
                            <option value={category} key={pos}>
                              {category}
                            </option>
                          );
                        })}
                      </select>
                      <p>{formErrors.subCategory}</p>
                    </div>
                  )}
                </div>
                <div className="optionWrapper">
                  <h3>1 המוצר הרצוי</h3>

                  <label> קטגוריה ראשית להחלפה</label>
                  <select
                    name="replaceableCategoryNo1"
                    placeholder=" קטגוריה ראשית להחלפה"
                    value={formValues.replaceableCategoryNo1}
                    onChange={handleChange}
                    onClick={(e) =>
                      handleReplaceableCategoryNo1(e.target.value)
                    }
                  >
                    <option value="" disabled>
                      קטגוריה ראשית להחלפה{" "}
                    </option>

                    {categoriesNames.map((category, pos) => {
                      return (
                        <option value={category} key={pos}>
                          {category}
                        </option>
                      );
                    })}
                  </select>
                  <p>{formErrors.replaceableCategoryNo1}</p>
                  {subCategoriesNames1 && (
                    <div>
                      <label> תת קטגוריה משנית להחלפה</label>
                      <select
                        name="replaceableSubCategoryNo1"
                        placeholder=" תת קטגוריה ראשית"
                        value={formValues.replaceableSubCategoryNo1}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          קטגוריה משנית להחלפה
                        </option>

                        {subCategoriesNames1.map((category, pos) => {
                          return (
                            <option value={category} key={pos}>
                              {category}
                            </option>
                          );
                        })}
                      </select>
                      <p>{formErrors.replaceableSubCategoryNo1}</p>
                    </div>
                  )}
                </div>
                {!add2 && (
                  <button onClick={() => setAdd2(true)}>
                    הוסף אפשרות החלפה
                    <AddCircleIcon
                      className="iconButton"
                      fontSize="small"
                    ></AddCircleIcon>
                  </button>
                )}{" "}
                {add2 && (
                  <div className="optionWrapper">
                    <h3>2 המוצר הרצוי</h3>
                    <label> קטגוריה ראשית להחלפה</label>
                    <select
                      name="replaceableCategoryNo2"
                      placeholder=" קטגוריה ראשית להחלפה"
                      value={formValues.replaceableCategoryNo2}
                      onChange={handleChange}
                      onClick={(e) =>
                        handleReplaceableCategoryNo2(e.target.value)
                      }
                    >
                      <option value="" disabled>
                        קטגוריה ראשית להחלפה{" "}
                      </option>

                      {categoriesNames.map((category, pos) => {
                        return (
                          <option value={category} key={pos}>
                            {category}
                          </option>
                        );
                      })}
                    </select>
                    <p>{formErrors.replaceableCategoryNo2}</p>
                    {subCategoriesNames2 && (
                      <div>
                        <label> תת קטגוריה משנית להחלפה</label>
                        <select
                          name="replaceableSubCategoryNo2"
                          placeholder=" תת קטגוריה ראשית"
                          value={formValues.replaceableSubCategoryNo2}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            קטגוריה משנית להחלפה
                          </option>

                          {subCategoriesNames2.map((category, pos) => {
                            return (
                              <option value={category} key={pos + "" + 1}>
                                {category}
                              </option>
                            );
                          })}
                        </select>
                        <p>{formErrors.replaceableSubCategoryNo2}</p>
                      </div>
                    )}
                  </div>
                )}
                <br></br>
                {add2 && (
                  <div>
                    <button
                      onClick={() => {
                        setAdd2(false);
                        formValues.replaceableCategoryNo2 = "";
                        formValues.replaceableSubCategoryNo2 = "";
                      }}
                    >
                      הסר אפשרות החלפה
                      <DeleteForeverIcon
                        className="iconButton"
                        color="disabled"
                        fontSize="small"
                      ></DeleteForeverIcon>
                    </button>
                    <button onClick={() => setAdd3(true)}>
                      הוסף אפשרות החלפה
                      <AddCircleIcon
                        className="iconButton"
                        fontSize="small"
                      ></AddCircleIcon>
                    </button>
                  </div>
                )}{" "}
                <br></br>
                {add3 && (
                  <div className="optionWrapper">
                    <h3>3 המוצר הרצוי</h3>
                    <label> קטגוריה ראשית להחלפה</label>
                    <select
                      name="replaceableCategoryNo3"
                      placeholder=" קטגוריה ראשית להחלפה"
                      value={formValues.replaceableCategoryNo3}
                      onChange={handleChange}
                      onClick={(e) =>
                        handleReplaceableCategoryNo3(e.target.value)
                      }
                    >
                      <option value="" disabled>
                        קטגוריה ראשית להחלפה{" "}
                      </option>

                      {categoriesNames.map((category, pos) => {
                        return (
                          <option value={category} key={pos}>
                            {category}
                          </option>
                        );
                      })}
                    </select>
                    <p>{formErrors.replaceableCategoryNo3}</p>
                    {subCategoriesNames3 && (
                      <div>
                        <label> תת קטגוריה משנית להחלפה</label>
                        <select
                          name="replaceableSubCategoryNo3"
                          placeholder=" תת קטגוריה ראשית"
                          value={formValues.replaceableSubCategoryNo3}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            קטגוריה משנית להחלפה
                          </option>

                          {subCategoriesNames3.map((category, pos) => {
                            return (
                              <option value={category} key={pos + "" + 1}>
                                {category}
                              </option>
                            );
                          })}
                        </select>
                        <p>{formErrors.replaceableSubCategoryNo3}</p>
                      </div>
                    )}
                  </div>
                )}
                <br></br>
                {add3 && (
                  <div>
                    <button
                      onClick={() => {
                        setAdd3(false);
                        formValues.replaceableCategoryNo3 = "";
                        formValues.replaceableSubCategoryNo3 = "";
                      }}
                    >
                      הסר אפשרות החלפה
                    </button>
                    <button onClick={() => setAdd3(true)}>
                      הוסף אפשרות החלפה
                    </button>
                  </div>
                )}{" "}
                <button>הוסף</button>
                <br></br>
                <br></br>
              </form>
            </div>
          )}
          {!displayForm && (
            <>
              <h2>המוצר שלך נקלט בהצלחה במערכת!!!</h2>
              {fullMatchProducts === "" && partMatchProducts === "" && (
                <h2>לא נמצאה התאמה עבורך ... נודיע לך בהמשך!</h2>
              )}

              {!displayForm && (fullMatchProducts || partMatchProducts) && (
                <div>
                  {fullMatchProducts.length > 0 && <h2>התאמה מלאה עבורך</h2>}

                  <div>
                    {fullMatchProducts &&
                      fullMatchProducts.map((product, index) => {
                        return (
                          <CustomCard
                            {...product}
                            key={index}
                            id={product.date.toString()}
                          />
                        );
                      })}
                  </div>
                  {/* partMatchProducts */}
                  <div>
                    {partMatchProducts.length > 0 && <h2>התאמה חלקית עבורך</h2>}

                    {partMatchProducts &&
                      partMatchProducts.map((product, index) => {
                        return (
                          <CustomCard
                            {...product}
                            key={index}
                            id={product.date.toString()}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default CreateProduct;

// <SelectCategories
//   mainLabel="קטגורית משנית להחלפה"
//   categoriesNames={categoriesNames}
//   subLabel="תת קתגוריה משנית להחלפה"
//   setReplaceableCategory={setReplaceableCategory}
//   setRreplaceableSubCategory={setRreplaceableSubCategory}
// />
