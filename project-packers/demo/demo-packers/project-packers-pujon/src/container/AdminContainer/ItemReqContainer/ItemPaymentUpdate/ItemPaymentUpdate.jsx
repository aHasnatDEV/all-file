import React from "react";
import Button from "../../../../components/Button/Button";

const ItemPaymentUpdate = ({ register }) => {
  return (
    <div>
      <div className=" border rounded-lg ">
        <div className="p-5 flex flex-col gap-4">
          <h2 className="pb-5 text-base font-semibold">Payment</h2>

          {/* seller takes */}
          <div className="flex items-center justify-between w-full">
            <label
              htmlFor="sellerTakes"
              className="text-sm font-normal text-slate-600"
            >
              Seller Takes
            </label>
            <input
              type="number"
              id="sellerTakes"
              {...register("sellerTakes")}
              className=" border outline-none text-end p-2"
            />
          </div>

          {/* US sales tax  */}
          <div className="flex items-center justify-between w-full">
            <label htmlFor="tax" className="text-sm font-normal text-slate-600">
              US sales tax
            </label>
            <input
              type="number"
              id="tax"
              {...register("tax")}
              className=" border outline-none text-end p-2"
            />
          </div>

          {/* packers fee */}
          <div className="flex items-center justify-between w-full">
            <label htmlFor="fee" className="text-sm font-normal text-slate-600">
              Packers Fee
            </label>
            <input
              type="number"
              id="fee"
              {...register("fee")}
              className=" border outline-none text-end p-2"
            />
          </div>

          {/* total */}
          <div className="flex items-center justify-between w-full">
            <h3 className="text-sm font-semibold">Total</h3>
            <p>Total</p>
          </div>
        </div>
        <hr />
        <div className="flex justify-end gap-4 w-full p-5">
          <button className="py-2 px-4 border rounded">Cancel</button>
          <Button
            buttonType="secondaryButton"
            name="Send Invoice"
            className="rounded-[5px]"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ItemPaymentUpdate;
