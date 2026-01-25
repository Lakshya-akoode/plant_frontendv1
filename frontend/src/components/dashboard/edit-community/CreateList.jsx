"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCommunityById, updateCommunityAPI } from "../../../api/community";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();
  
    const id = params?.id;
  
    const router = useRouter();
    const [community, setCommunity] = useState({ comment: "", status: true });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!id) return;
      
      const fetchCommunity = async () => {
        try {
          const data = await getCommunityById(id);
          setCommunity({ 
            comment: data.data.comment || "", 
            status: data.data.status !== undefined ? data.data.status : true 
          });
        } catch (error) {
          console.error("Error fetching Community:", error);
          // Set mock data for development
          setCommunity({ 
            comment: "Sample community comment for editing", 
            status: true 
          });
        } finally {
          setLoading(false);
        }
      };
  
      fetchCommunity();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await updateCommunityAPI(id, community);
        toast.success(data.message);
        if(data.status === "success"){
          setTimeout(() => {
            router.push("/cmsadminlogin/my-community");
          }, 1500); 
        }
      } catch (error) {
        alert("Failed to update Community comment.");
        console.error(error);
      }
    };
  
    const handleChange = (e) => {
      setCommunity((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleStatusChange = () => {
      setCommunity((prev) => ({ ...prev, status: !prev.status }));
    };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-12 col-xl-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="CommunityComment">Community Comment</label>
          <textarea
            type="text"
            className="form-control"
            id="CommunityComment"
            name="comment"
            value={community.comment}
            onChange={handleChange}
            rows={4}
            placeholder="Enter community comment..."
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            value={community.status ? "active" : "inactive"}
            onChange={(e) =>
              setCommunity((prev) => ({
                ...prev,
                status: e.target.value === "active",
              }))
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/cmsadminlogin/my-community'}>Back</button>
          <button className="btn-default float-end">Update Comment</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
