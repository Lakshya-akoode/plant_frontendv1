"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getFaqById, updateFaqAPI } from "../../../api/faq";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();  
    const id = params?.id;  
    const router = useRouter();
    const [faq, setFaq] = useState({ title: "", status: false,description: "", });
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");  
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState("");
    useEffect(() => {
      if (!id) return;      
      const fetchFaq = async () => {
        try {
          const data = await getFaqById(id);
          
          if (data.status === "success" && data.data) {
            setTitle(data.data.title || "");
            setStatus(data.data.status || false);
            setDescription(data.data.description || "");
            setSelectedProperty(data.data.propertyid || "");
          }
          
        } catch (error) {
          console.error("Error fetching FAQ:", error);
          toast.error("Failed to load FAQ data");
        } finally {
          setLoading(false);
        }
      };
  
      fetchFaq();
      
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      
      setError("");
      
      try {
        const formData = {
          title: title,
          description: description,
          status: status
        };
        
        const data = await updateFaqAPI(id, formData);
        toast.success(data.message);
        
        if(data.status === "success"){
          setTimeout(() => {
            router.push("/livetest/cmsadminlogin/my-faq");
          }, 1500); 
        }
        
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
        console.error(error);
      }
    };
  
  
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
    
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="FaqTitle">Faq Title</label>
          <input
        type="text"
        className="form-control"
        id="FaqTitle"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="propertySelect">Select Property</label>
            <select
              id="propertySelect"
              className="selectpicker form-select"
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)} 
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Property --</option>
              {properties.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="FaqDescription">Description</label>
            <textarea id="FaqDescription" className="form-control" name="description" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Faq description"></textarea>
            {error.description && <span className="text-danger">{error.description}</span>}
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
  value={status ? "active" : "deactive"}
  onChange={(e) => setStatus(e.target.value === "active")}
>
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/livetest/cmsadminlogin/my-faq'}>Back</button>
          <button className="btn-default float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
