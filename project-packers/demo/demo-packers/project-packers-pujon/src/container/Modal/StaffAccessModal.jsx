import React from "react";
import { useForm } from "react-hook-form";

const StaffAccessModal = ({
  image,
  name,
  access,
  role,
  id,
  ...eventHandler
}) => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[500px]">
      <h2>User Access</h2>
      <div className="flex items-center justify-between   h-[88px] px-5 py-4">
        <div className="flex items-center gap-3">
          <div>
            <img src={image} alt="" className="w-10 h-10 rounded-full" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-sm font-normal text-[#6D7175]">{access}</p>
          </div>
        </div>
        <div>
          <select
            {...eventHandler}
            {...register("role")}
            name="access"
            id="access"
            className="px-4 py-2 border outline-none rounded bg-transparent text-sm font-medium"
          >
            <option value="admin">Admin</option>
            <option value="support">Support</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <input
            {...register("support")}
            type="checkbox"
            value="support"
            id="chat"
          />
          <label htmlFor="chat">Support ticket / life chat </label>
        </div>
        <div>
          <input
            {...register("product")}
            value="product"
            type="checkbox"
            id="uploadEdit"
          />
          <label htmlFor="uploadEdit">Product upload and edit</label>
        </div>
        <div>
          <input
            {...register("order")}
            type="checkbox"
            value="order"
            id="orderManagement"
          />
          <label htmlFor="orderManagement">Order management </label>
        </div>
        <div>
          <input
            {...register("request")}
            type="checkbox"
            value="request"
            id="requestManagement"
          />
          <label htmlFor="requestManagement">Request management </label>
        </div>
      </div>
      <button
        type="submit"
        className="flex self-end rounded-[5px] p-[8px_16px] bg-[#3E949A] text-white mt-5 ml-auto"
      >
        Apply Change
      </button>
    </form>
  );
};

export default StaffAccessModal;
