import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import { plane } from "../../../../contexts/terminal/Terminal";
import removeEmptyFields from "../../../../utils/removeEmptyFields";

const UpdateCategory = ({ selectedCategory }) => {
  //console.log(selectedCategory);

  console.log("need to update id", selectedCategory.id);
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const { handleSubmit, register, reset } = useForm();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  // category update
  const upDateCategory = (data) => {
    removeEmptyFields(data);
    console.log(data);
    plane
      .request({
        name: "updateCategory",
        body: data,
        params: { id: selectedCategory.id },
      })
      .then((res) => console.log(res));

  reset();
  };

  const updateSubCategory = (data) => {
    removeEmptyFields(data);
    console.log("subCategory", data);
    reset();
  };

  const addSubCategory = (data) => {
    removeEmptyFields(data);
    console.log("add sub", data);
    reset();
  };

  return (
    <div>
      {/* category */}
      <form onSubmit={handleSubmit(upDateCategory)}>
        {/*  category name */}
        <div className="mb-2">
          <label
            htmlFor="category"
            className="text-sm font-normal text-slate-600"
          >
            category name
          </label>

          <input
            type="text"
            className="w-full py-2 px-3 border bg-white appearance-none cursor-pointer rounded outline-none"
            placeholder={selectedCategory?.name}
            {...register("categoryname")}
          />
        </div>
        {/* category slug */}
        <div className="mb-2">
          <label
            htmlFor="category"
            className="text-sm font-normal text-slate-600"
          >
            Category Slug
          </label>

          <input
            type="text"
            className="w-full py-2 px-3 border bg-white appearance-none cursor-pointer rounded outline-none"
            placeholder={selectedCategory?.slug}
            {...register("categoryslug")}
          />
        </div>
        <Button
          buttonType="secondaryButton"
          name="Update Category"
          className="self-end rounded-[5px] mt-5"
        >
          <input type="submit" />
        </Button>
      </form>

      {/* subCategory */}
      <div>
        <form
          onSubmit={handleSubmit(
            isDropDownClicked ? updateSubCategory : addSubCategory
          )}
          className="dropdown"
        >
          <div>
            <label
              htmlFor="category"
              className="text-sm font-normal text-slate-600"
            >
              Category Slug
            </label>
            <input
              type="text"
              className="w-full py-2 px-3 border bg-white appearance-none cursor-pointer rounded outline-none"
              {...register("category", { value: selectedOption })}
              onFocus={toggleDropdown}
              onBlur={() => {
                setTimeout(() => setDropdownVisible(false), 200);
              }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            {isDropdownVisible && (
              <div className="dropdown-select">
                {selectedCategory?.subcategory?.map((sub, i) => (
                  <div
                    key={i}
                    className="cursor-pointer hover:bg-sky-300 w-full py-2 px-3 border bg-white appearance-none rounded outline-none"
                    onClick={() => {
                      setIsDropDownClicked(true);
                      handleOptionClick(sub.name);
                    }}
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* category slug */}
          <div className="mb-2">
            <label
              htmlFor="category"
              className="text-sm font-normal text-slate-600"
            >
              Category Slug
            </label>

            <input
              type="text"
              className="w-full py-2 px-3 border bg-white appearance-none cursor-pointer rounded outline-none"
              // value={selectedCategory?.name}
              // value={selectedCategory?.name}
              {...register("subcategoryslug")}
            />
          </div>

          {isDropDownClicked ? (
            <Button
              buttonType="secondaryButton"
              name="Update Category"
              className="self-end rounded-[5px] mt-5"
            >
              <input type="submit" />
            </Button>
          ) : (
            <Button
              buttonType="secondaryButton"
              name="Add Category"
              className="self-end rounded-[5px] mt-5"
            >
              <input type="submit" />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
