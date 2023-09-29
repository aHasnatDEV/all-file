import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import PreviousButtonHeading from "../../../components/PreviousButtonHeading/PreviousButtonHeading";
import Delete from "../../../assets/icons/Delete.svg";
import { useForm } from "react-hook-form";
import ItemDetailsUpdate from "../../../container/AdminContainer/ItemReqContainer/ItemDetailsUpdate/ItemDetailsUpdate";
import ItemPaymentUpdate from "../../../container/AdminContainer/ItemReqContainer/ItemPaymentUpdate/ItemPaymentUpdate";
import CustomerDetailsUpdate from "../../../container/AdminContainer/CustomerDetailsUpdate/CustomerDetailsUpdate";
import removeEmptyField from "../../../utils/removeEmptyFields";
import { plane } from "../../../contexts/terminal/Terminal";

const ItemRequestUpdate = () => {
  const { id } = useParams();
  const [singleItem, setSingleItem] = useState();

  const requestItem = useLocation().state?.requestItem;
  console.log(requestItem);

  useEffect(() => {
    plane.request({ name: "singleRequest", params: { id: id } }).then((res) => {
      console.log(res);
      setSingleItem(res);
    });
  }, []);

  //const { user, fee, tax, price, quantity, link, sellerTakes, note } =
  //  requestItem;

  const [isEdit, setIsEdit] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    setValue("link", singleItem?.link);
    setValue("quantity", singleItem?.quantity);
    setValue("sellerTakes", singleItem?.sellerTakes);
    setValue("tax", singleItem?.tax);
    setValue("fee", singleItem?.fee);
    setValue("note", singleItem?.note);
    setValue("email", singleItem?.user?.email);
  });

  const onSubmit = async (data) => {
    removeEmptyField(data);
    console.log(data);
    const { images, ...rest } = data;
    plane
      .request({
        name: "updateRequest",
        params: { id: id },
        body: { data: rest, images: images },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    plane.request({ name: "removeRequest", body: { id: id } }).then((res) => {
      console.log(res);
      navigate("/admin");
    });
  };

  return (
    <div className="h-screen">
      {/* Heading */}
      <div className="p-[20px_0]  border-b w-full flex justify-between items-center">
        <PreviousButtonHeading id={id} buttonName="Back to item request" />
        <div className="flex gap-4">
          <button onClick={handleDelete} className="flex items-center gap-2">
            <img src={Delete} alt="" /> Delete
          </button>
          <Button
            buttonType="secondaryButton"
            form="reqUpdate"
            name="Update"
            className="rounded-[5px]"
          >
            <input type="submit" />
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="reqUpdate"
        className="flex gap-4 items-start mt-5"
      >
        {/* Item details */}
        <div className="w-4/6 flex flex-col gap-4">
          {/* Item images and quantity */}
          <ItemDetailsUpdate
            itemQuantity={singleItem?.quantity}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            register={register}
          />
          {/* payment */}
          <ItemPaymentUpdate register={register} />
        </div>

        <div className="w-1/3">
          <CustomerDetailsUpdate
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            register={register}
          />
        </div>
      </form>
    </div>
  );
};

export default ItemRequestUpdate;
