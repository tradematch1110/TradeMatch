import React, { useState, useEffect } from "react";
import { allCategories } from "../resourcees/categories";

const SelectCategories = ({
  mainLabel,
  categoriesNames,
  subLabel,
  setReplaceableCategory,
  setRreplaceableSubCategory,
  ...otherPprops
}) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategoriesNames, setSubCategoriesNames] = useState("");

  const handleCategory = (value) => {
    console.log("handleCategory :", value);

    setCategory(value);
    setReplaceableCategory(value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategoriesNames(subCategory.subCategories);
      }
    });
  };
  const handleSubCategory = (value) => {
    console.log("handleSubCategory :", value);
    setSubCategory(value);
    setRreplaceableSubCategory(value);
  };
  return (
    <div className="create">
      <label>{mainLabel}</label>
      <select value={category} onChange={(e) => handleCategory(e.target.value)}>
        <option value="" disabled>
          קטגוריה ראשית להחלפה
        </option>

        {categoriesNames.map((category, pos) => {
          return (
            <option value={category} key={pos}>
              {category}
            </option>
          );
        })}
      </select>
      {subCategoriesNames && (
        <div>
          <label>{subLabel}</label>
          <select
            value={subCategory}
            onChange={(e) => handleSubCategory(e.target.value)}
          >
            <option value="" disabled>
              קטגוריה משנית להחלפה
            </option>

            {subCategoriesNames.map((category, pos) => {
              return (
                <option value={category} key={pos}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
};

export default SelectCategories;
