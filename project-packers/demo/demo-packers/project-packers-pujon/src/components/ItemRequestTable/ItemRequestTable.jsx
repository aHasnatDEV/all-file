import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Status from "../Status/Status";

const ItemRequestTable = ({ filterStatus, filterSearch }) => {
  const [allRequest, setAllRequest] = useState();

  const [axiosSecure] = useAxiosSecure();
  // console.log(filterStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!filterSearch && !filterStatus) {
      axiosSecure.get(`/request`).then((res) => {
        setAllRequest(res.data.docs);
      });
    } else if (filterStatus !== "all") {
      if (!filterSearch) {
        axiosSecure.get(`/request?status=${filterStatus}`).then((res) => {
          setAllRequest(res.data.docs);
        });
      } else {
        axiosSecure
          .get(`/request?status=${filterStatus}&&id=${filterSearch}`)
          .then((res) => {
            setAllRequest(res.data.docs);
          });
      }
    } else {
      if (!filterSearch) {
        axiosSecure.get(`/request`).then((res) => {
          setAllRequest(res.data.docs);
        });
      } else {
        axiosSecure.get(`/request?id=${filterSearch}`).then((res) => {
          setAllRequest(res.data.docs);
        });
      }
    }
  }, [filterStatus, filterSearch]);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className=" border-y bg-slate-50 text-slate-600">
            <th className="text-start p-[10px_16px]">
              <input type="checkbox" name="" id="" />
            </th>
            <th className="text-start p-[10px_16px]">ID</th>
            <th className="text-start p-[10px_16px]">Product Name</th>
            <th className="text-start p-[10px_16px]">Link</th>
            <th className="text-start p-[10px_16px]">Date</th>
            <th className="text-start p-[10px_16px]">Customer</th>
            <th className="text-start p-[10px_16px]">Status</th>
          </tr>
        </thead>
        <tbody>
          {allRequest &&
            allRequest.map((request) => (
              <tr
                key={request.id}
                className="border-b py-[180px] hover:bg-[#FEF9DC]"
              >
                <td className="p-[18px_16px]">
                  <input type="checkbox" name="" id="" />
                </td>
                <td
                  onClick={() =>
                    navigate(`/admin/updateItemRequest/${request.id}`, {
                      state: { requestItem: request },
                    })
                  }
                  className="p-[18px_16px] cursor-pointer "
                >
                  {request.id}
                </td>
                <td
                  onClick={() =>
                    navigate(`/admin/updateItemRequest/${request.id}`)
                  }
                  className="p-[18px_16px] cursor-pointer"
                >
                  {request.name}
                </td>
                <td className="p-[18px_16px]">{request.link}</td>
                <td className="p-[18px_16px]">{}</td>
                <td className="p-[18px_16px]">{request.user.fullName}</td>
                <td className="p-[18px_16px]">
                  <Status title={request.status} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemRequestTable;
