"use client";

import { useState } from "react";
import { createCommunityAPI } from "../../../api/community";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const CreateList = () => {
  
   const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [isSubmitting, setisSubmitting] = useState(false);
  
    const handleCommentChange = (e) => {
      setComment(e.target.value);
  
      if (e.target.value.trim() !== "") {
        setError("");
      }
    };
  
    const addCommunity = async (e) => {
      
      e.preventDefault();
      setisSubmitting(true)
  
      if (!comment.trim()) {
        setError("Comment is required");
        setisSubmitting(false);
        return;
      }
      
      setError("");
      
      try {
        const data = await createCommunityAPI(comment); 
       
        toast.success(data.message);
      
      if(data.status === "success"){
         setTimeout(() => {
          router.push("/livetest/cmsadminlogin/my-community");
          }, 1500); 
        }
  
        setComment(""); 
      } catch (error) {
        setError(error.message); 
        console.error("Error creating community:", error);
      } finally {
        setisSubmitting(false);
      }
    };
  return (
    <>
    <form onSubmit={addCommunity} className="row">
      <div className="col-lg-12 col-xl-12">
        <div className="my_profile_setting_input form-group">
          <h3 className="mb30">Add Comment</h3>
          <textarea 
            type="text" 
            className="form-control" 
            id="CommunityComment" 
            value={comment} 
            onChange={handleCommentChange}
            rows={4}
            placeholder="Enter your comment..."
          />
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
          <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/livetest/cmsadminlogin/my-community'}>Back</button>
          <button type="submit" className="btn btn2 float-end" disabled={isSubmitting} >{isSubmitting ? 'Creating...' : 'Create Comment'}</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
