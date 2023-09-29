import React from "react";
import { useForm } from "react-hook-form";

const AddNewStaff = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    removeEmptyField(data);
    console.log(data);
  };

  return (
    <div>
    
      <form
        id="addStaff"
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 rounded-lg border flex flex-col"
      >
        {/* Name */}
        <div className="flex gap-2">
          {/* first name */}
          <div className="mb-3 w-full">
            <label
              htmlFor="firstName"
              className="text-sm font-normal text-slate-600"
            >
              First Name
            </label>
            <input
              // value={prevProducts && prevProducts.name}
              {...register("firstName")}
              type="text"
              className="w-full py-2 px-3 border rounded outline-none"
              id="firstName"
            />
          </div>
          {/* last name */}
          <div className="mb-3 w-full">
            <label
              htmlFor="lastName"
              className="text-sm font-normal text-slate-600"
            >
              Last Name
            </label>
            <input
              // value={prevProducts && prevProducts.name}
              {...register("lastName")}
              type="text"
              className="w-full py-2 px-3 border rounded outline-none"
              id="lastName"
            />
          </div>
        </div>

        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="text-sm font-normal text-slate-600">
            Email
          </label>
          <input
            // value={prevProducts && prevProducts.name}
            {...register("email")}
            type="email"
            className="w-full py-2 px-3 border rounded outline-none"
            id="email"
          />
        </div>

        {/*phone*/}
        <div className="mb-3">
          <label htmlFor="phone" className="text-sm font-normal text-slate-600">
            Phone
          </label>
          <input
            // value={prevProducts && prevProducts.name}
            {...register("phone")}
            type="tel"
            className="w-full py-2 px-3 border rounded outline-none"
            id="phone"
          />
        </div>

        {/*role */}
        <div>
          <label htmlFor="role" className="text-sm font-normal text-slate-600">
            Role
          </label>

          <select
            id="role"
            {...register("role")}
            className="px-4 py-2 border w-full outline-none rounded bg-transparent text-sm font-medium"
          >
            <option value="admin">Admin</option>
            <option value="support">Support</option>
          </select>
        </div>
      </form>

      <button
        type="submit"
        form="addStaff"
        className="flex self-end rounded-[5px] p-[8px_16px] bg-[#3E949A] text-white mt-5 ml-auto"
      >
        Add Staff
      </button>
    </div>
  );
};

export default AddNewStaff;
