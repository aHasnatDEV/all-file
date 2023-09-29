import React, { useState } from "react";
import Internet from "../../../../assets/icons/cd-internet.svg";
import ImageUpload from "../../../../assets/icons/Image-upload.svg";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

const ItemDetailsUpdate = ({ isEdit, setIsEdit, register, itemQuantity }) => {
  const [quantity, setQuantity] = useState(0);
  const [searchURL, setSearchURL] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  const handleQuantity = (type) => {
    if (type === "minus" && quantity > 0) {
      setQuantity(quantity - 1);
    }
    if (type === "plus") {
      setQuantity(quantity + 1);
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAllImages((prev) => [...prev, file]);
    setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
  };

  const handleImageDelete = (index) => {
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    const updatedAllImages = allImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviewImages);
    setAllImages(updatedAllImages);
  };

  useEffect(() => {
    register("images", { value: allImages }); // Register the allImages array
    return () => {
      previewImages.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [allImages, previewImages, register]);

  const handleBlur = () => {
    isEdit(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setAllImages((prev) => [...prev, file]);
    setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
  };

  return (
    <div>
      <div className="border rounded-lg ">
        <div className="p-5">
          <h2 className="pb-5 text-base font-semibold">Request Items</h2>

          {/* search */}
          <div className="flex gap-[10px] py-5">
            <div
              className={`w-auto md:w-full lg:w-full flex px-3 items-center text-ellipsis truncate rounded border bg-transparent border-slate-200  `}
            >
              {/* search Icon */}
              <img src={Internet} alt="" />

              {/* search input */}
              <input
                type="url"
                className="relative m-0 block flex-auto bg-transparent bg-clip-padding ps-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-600 outline-none placeholder:text-slate-600"
                placeholder="Search"
                {...register("link", {
                  onChange: (e) => {
                    setSearchURL(e.target.value);
                  },
                })}
              />
            </div>
            <Link to={searchURL} className="py-2 px-4 border rounded">
              Go
            </Link>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-[22px]">
            <label htmlFor="quantity" className="text-sm font-semibold ">
              Quantity
            </label>
            <div className="flex items-center justify-center gap-2 border py-3 px-5  bg-white w-[182px]">
              <button
                className="text-base"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuantity("minus");
                }}
              >
                <AiOutlineMinus />
              </button>
              <input
                type="number"
                readOnly
                value={quantity}
                {...register("quantity", { value: quantity })}
                id="quantity"
                name="quantity"
                className="bg-transparent  text-center text-black text-sm outline-none  font-normal w-24"
              />
              <button
                className="text-base"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuantity("plus");
                }}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>

          {/* products images */}
          <div className="pt-5">
            <h2 className="pb-3 text-sm font-semibold">Product images</h2>

            <div className="flex items-center gap-3">
              <div className="flex max-w-[300]  overflow-x-scroll">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    className={`w-[134px] h-[133px] border rounded-lg flex items-center justify-center relative p-3	`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="max-w-[123px] min-w-[123px] "
                    />
                    <button
                      className="p-1 bg-[#CFF6EF] rounded-50 absolute right-2 top-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageDelete(index);
                      }}
                    >
                      <MdOutlineClose />{" "}
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <label
                  htmlFor="file"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={`cursor-pointer w-[134px] h-[133px] border rounded-lg flex flex-col items-center justify-center`}
                >
                  <img src={ImageUpload} alt="" />
                  <span>Upload Image</span>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  // draggable={true}
                  // onDrop={handleDrop}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* note */}
        <div className="p-5">
          <h2 className="t mb-3 flex w-full justify-between ">
            <p className="ext-sm font-semibold">Note</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEdit("note");
              }}
              className="text-[#3E949A]"
            >
              Edit
            </button>
          </h2>
          {isEdit === "note" ? (
            <textarea
              name="note"
              id="note"
              cols="30"
              rows="5"
              onBlur={handleBlur}
              {...register("note")}
              className="w-full outline-none border rounded p-2"
            ></textarea>
          ) : (
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
              beatae voluptate officiis tempore voluptatibus iste nam culpa
              libero aspernatur esse.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsUpdate;
