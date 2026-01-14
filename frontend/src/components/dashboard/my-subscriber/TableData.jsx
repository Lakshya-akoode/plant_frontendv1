"use client";

import { deleteNewsletterAPI, updateNewsletterStatusAPI } from "@/api/newsletter";
import { toast } from 'react-toastify';

const TableData = ({ newsletterList, setNewsletterList }) => {
  const deleteNewsletter = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this subscriber?");
    if (!isConfirmed) return;

    try {
      const data = await deleteNewsletterAPI(id);
      toast.success(data.message || "Subscriber deleted successfully");
      setNewsletterList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete subscriber");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const data = await updateNewsletterStatusAPI(id, newStatus);
      toast.success(data.message || "Status updated successfully");
      setNewsletterList((prevList) =>
        prevList.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const theadContent = ["Email", "Status", "Date", "Action"];

  const tbodyContent = newsletterList?.map((item) => (
    <tr key={item._id}>
      <td>{item.email}</td>
      <td>
        <span
          className={`badge ${item.status ? "bg-success" : "bg-secondary"}`}
          style={{ cursor: "pointer" }}
          onClick={() => toggleStatus(item._id, item.status)}
          title="Click to toggle status"
        >
          {item.status ? "Active" : "Inactive"}
        </span>
      </td>
      <td>
        {new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </td>
      <td>
        <ul className="view_edit_delete_list mb0">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#" onClick={(e) => { e.preventDefault(); deleteNewsletter(item._id); }}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;

