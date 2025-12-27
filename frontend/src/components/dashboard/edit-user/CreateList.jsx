"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUserById, updateUserAPI } from "../../../api/user";


const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [agent, setAgent] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAgent = async () => {
      try {
        const data = await getUserById(id);
        setAgent({ title: data.data.title, status: data.data.status });
      } catch (error) {
        console.error("Error fetching User:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserAPI(id, agent);
      alert("User updated successfully!");
      router.push("/livetest/cmsadminlogin/my-user");
    } catch (error) {
      alert("Failed to update User.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setAgent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setAgent((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="userTitle">User Title</label>
            <input
              type="text"
              className="form-control"
              id="userTitle"
              name="title"
              value={agent.title}
              onChange={handleChange}
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
              value={agent.status ? "active" : "deactive"}
              onChange={(e) =>
                setAgent((prev) => ({
                  ...prev,
                  status: e.target.value === "active",
                }))
              }
            >
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>
            </select>
          </div>
        </div>
        {/* End .col */}
        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/livetest/cmsadminlogin/my-user'}>Back</button>
            <button className="btn-default float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
