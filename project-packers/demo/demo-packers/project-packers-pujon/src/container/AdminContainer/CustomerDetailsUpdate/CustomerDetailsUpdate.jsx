import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";

const CustomerDetailsUpdate = ({ isEdit, setIsEdit, register }) => {
  const [value, setValue] = useState();
  const [shipping, setShipping] = useState(null);
  const [billing, setBilling] = useState(null);

  useEffect(() => {
    register("phoneNumber", { value: value });
    register("shipping", { value: shipping });
    register("billing", { value: billing });
  });

  return (
    <div>
      <div className=" border rounded-lg text-sm font-medium text-slate-600">
        {/* customer details */}
        <div className="space-y-5 p-5">
          <h2 className="text-base font-semibold text-[#0D3D4B]">Customer</h2>
          <div>
            <p className=" text-[#3E949A] underline mb-2">Pujon Das Auvi</p>
            <p className="">No orders</p>
          </div>
        </div>

        <hr />

        {/* contact information */}
        <div className="space-y-2 p-5">
          <h2 className="flex items-center justify-between w-full">
            <p className="text-base font-semibold text-[#0D3D4B]">
              Contact Information
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEdit("contact");
              }}
              className="text-[#3E949A]"
            >
              Edit
            </button>
          </h2>

          {isEdit === "contact" ? (
            <div className="flex flex-col gap-2">
              <input
                type="email"
                className="border p-2 w-full"
                {...register("email")}
              />

              <PhoneInput
                placeholder="input your phone number"
                defaultCountry="BD"
                international
                className="border p-2"
                value={value}
                onChange={setValue}
              />
            </div>
          ) : (
            <div>
              <p className="text-[#3E949A]">pujon_das@coredevs.ltd</p>
              <p>No phone number</p>
            </div>
          )}
        </div>

        <hr />

        {/* shipping address */}
        <div className="space-y-2 p-5">
          <h2 className="flex items-center justify-between w-full">
            <p className="text-base font-semibold text-[#0D3D4B]">
              Shipping Address
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEdit("shipping");
              }}
              className="text-[#3E949A]"
            >
              Edit
            </button>
          </h2>

          {isEdit === "shipping" ? (
            <div className="flex flex-col gap-2">
              {/* Address */}
              <input
                type="text"
                placeholder="address"
                className="outline-none p-2 border rounded"
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    address: e.target.value,
                  })
                }
              />
              {/* city */}
              <input
                type="text"
                placeholder="city"
                className="outline-none p-2 border rounded"
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    city: e.target.value,
                  })
                }
              />
              {/* area */}
              <input
                type="text"
                placeholder="area"
                className="outline-none p-2 border rounded"
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    area: e.target.value,
                  })
                }
              />
              {/* zip */}
              <input
                type="text"
                placeholder="zip"
                className="outline-none p-2 border rounded"
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    zip: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <div>
              <p>No Address</p>
            </div>
          )}
        </div>

        <hr />

        {/* billing address */}
        <div className="space-y-2 p-5">
          <h2 className="flex items-center justify-between w-full">
            <p className="text-base font-semibold text-[#0D3D4B]">
              Billing Address
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEdit("billing");
              }}
              className="text-[#3E949A]"
            >
              Label
            </button>
          </h2>

          {isEdit === "billing" ? (
            <div className="flex flex-col gap-2">
              {/* Address */}
              <input
                type="text"
                placeholder="address"
                className="outline-none p-2 border rounded"
                onChange={(e) =>
                  setBilling({
                    ...shipping,
                    address: e.target.value,
                  })
                }
              />
              {/* city */}
              <input
                type="text"
                placeholder="city"
                className="outline-none p-2 border rounded"
                onChange={(e) =>
                  setBilling({
                    ...shipping,
                    city: e.target.value,
                  })
                }
              />
              {/* area */}
              <input
                type="text"
                placeholder="area"
                className="outline-none p-2 border rounded"
                onChange={(e) =>
                  setBilling({
                    ...shipping,
                    area: e.target.value,
                  })
                }
              />
              {/* zip */}
              <input
                type="text"
                placeholder="zip"
                className="outline-none p-2 border rounded"
                onChange={(e) =>
                  setBilling({
                    ...shipping,
                    zip: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <div>
              <p>No Address</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsUpdate;
