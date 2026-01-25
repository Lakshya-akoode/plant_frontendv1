"use client";

import { useState } from "react";
import { addUserAPI } from "../../../api/user.ts";
import { toast } from 'react-toastify';
const CreateList = () => {
   const [title, setTitle] = useState("");
    const [error, setError] = useState("");
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
  
      // ✅ Clear the error when user starts typing
      if (e.target.value.trim() !== "") {
        setError("");
      }
    };
  
    const addAgent = async (e) => {
      
      e.preventDefault();
  
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      // alert("testw")
      setError("");
      
      try {
        const data = await addUserAPI(title); // 🔹 Call the API function
       
        toast.success(data.message);
  
        setTitle(""); // ✅ Reset input after success
      } catch (error) {
        setError(error.message); // ❌ Show error if request fails
      }
    };
  return (
    <>
    <form onSubmit={addAgent} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="agentTitle">User Title</label>
          <input type="text" className="form-control" id="agentTitle" value={title} onChange={handleTitleChange} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6 d-none">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="1">Active</option>
            <option data-tokens="2">Deactive</option>
          </select>
        </div>
      </div>
      {/* End .col */}
      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/cmsadminlogin/my-dashboard'}>Back</button>
          <button type="submit" className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
