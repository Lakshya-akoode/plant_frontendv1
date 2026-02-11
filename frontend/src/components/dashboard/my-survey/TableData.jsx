import Link from "next/link";
import Image from "next/image";
import { deleteSurveyAPI, getSurveyResponsesBySurveyId } from "../../../api/survey";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { exportSurveyDetailResponsesToCSV, exportSurveyDetailResponsesToExcel } from "@/utils/exportUtils";

const TableData = ({ surveyList, setSurveyList }) => {
  const router = useRouter();
  const [exportLoading, setExportLoading] = useState({});
  const [exportDropdown, setExportDropdown] = useState({});

  // Toggle export dropdown (closed via overlay click, same as user response section)
  const toggleExportDropdown = (id) => {
    setExportDropdown(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const deleteSurvey = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this survey study?");
    if (!isConfirmed) return;

    try {
      const data = await deleteSurveyAPI(id);

      toast.success(data.message);
      setSurveyList((prevSurveyList) => prevSurveyList.filter((survey) => survey._id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete Survey");
      console.error("Delete error:", error);
    }
  };

  const handleExport = async (e, id, type) => {
    e.stopPropagation();
    // Close dropdown
    setExportDropdown(prev => ({ ...prev, [id]: false }));

    // Set loading state for this specific survey
    setExportLoading(prev => ({ ...prev, [id]: true }));

    try {
      const response = await getSurveyResponsesBySurveyId(id);

      if (response.status === 'success' && response.data) {
        if (response.data.responses && response.data.responses.length > 0) {
          if (type === 'csv') {
            exportSurveyDetailResponsesToCSV(response.data);
          } else {
            exportSurveyDetailResponsesToExcel(response.data);
          }
          toast.success("Export downloaded successfully");
        } else {
          toast.info("No responses found for this survey");
        }
      } else {
        toast.error("Failed to fetch survey data");
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export survey data");
    } finally {
      setExportLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  let theadConent = [
    "Study Name",
    "Questions Count",
    "Date Created",
    "Status",
    "Action",
  ];

  let tbodyContent = surveyList?.slice(0, 10)?.map((item) => (
    <tr key={item._id} style={{
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <td scope="row" style={{
        padding: '12px 15px',
        border: 'none',
        color: '#374151',
        fontSize: '16px',
        verticalAlign: 'middle',
        textAlign: 'left',
        fontWeight: '500'
      }}>
        {item.studyName}
      </td>
      {/* End td */}

      <td style={{
        padding: '12px 15px',
        border: 'none',
        color: '#374151',
        fontSize: '16px',
        verticalAlign: 'middle',
        textAlign: 'center'
      }}>
        <span style={{
          backgroundColor: '#000000',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {item.questions?.length || 0} question{item.questions?.length !== 1 ? 's' : ''}
        </span>
      </td>
      {/* End td */}

      <td style={{
        padding: '12px 15px',
        border: 'none',
        color: '#374151',
        fontSize: '16px',
        verticalAlign: 'middle',
        textAlign: 'left'
      }}>
        {new Date(item.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </td>
      {/* End td */}

      <td style={{
        padding: '12px 15px',
        border: 'none',
        textAlign: 'center',
        verticalAlign: 'middle'
      }}>
        <span style={{
          backgroundColor: item.status ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          {item.status ? "Active" : "Inactive"}
        </span>
      </td>
      {/* End td */}

      <td style={{
        padding: '12px 15px',
        border: 'none',
        textAlign: 'center',
        verticalAlign: 'middle'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5px'
        }}>
          <button
            // onClick={() => router.push(`/cmsadminlogin/view-surveystudies/${item._id}`)}
            onClick={() => router.push(`/cmsadminlogin/view-survey-studies`)}
            style={{
              // backgroundColor: '#3b82f6',
              border: 'none',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px'
            }}
            title="View Responses"
          >
            <span className="flaticon-view" style={{
              color: '#374151',
              fontSize: '16px'
            }}></span>
          </button>

          <button
            onClick={() => router.push(`/cmsadminlogin/edit-survey/${item._id}`)}
            style={{
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px'
            }}
            title="Edit Survey"
          >
            <span className="flaticon-edit" style={{
              color: '#374151',
              fontSize: '16px'
            }}></span>
          </button>

          <button
            onClick={() => deleteSurvey(item._id)}
            style={{
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px'
            }}
            title="Delete Survey"
          >
            <span className="flaticon-garbage" style={{
              color: '#374151',
              fontSize: '16px'
            }}></span>
          </button>

          {/* Export Dropdown - same UI as user response section */}
          <div className="user-survey-dropdown-wrapper">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExportDropdown(item._id);
              }}
              className="user-survey-btn-export-small"
              title="Export all responses for this survey study"
              disabled={exportLoading[item._id]}
              style={{ opacity: exportLoading[item._id] ? 0.7 : 1, cursor: exportLoading[item._id] ? 'wait' : 'pointer' }}
            >
              {exportLoading[item._id] ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: '1rem', height: '1rem', marginRight: '6px' }}></span>
              ) : (
                <i className="fa fa-download"></i>
              )}
              Export
              <i className={`fa fa-chevron-${exportDropdown[item._id] ? 'up' : 'down'}`}></i>
            </button>
            {exportDropdown[item._id] && (
              <>
                <div
                  className="user-survey-dropdown-overlay"
                  onClick={() => toggleExportDropdown(item._id)}
                />
                <div className="user-survey-dropdown-menu">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExport(e, item._id, 'csv');
                    }}
                    className="user-survey-dropdown-item"
                  >
                    <i className="fa fa-file-text-o"></i> Export as CSV
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExport(e, item._id, 'excel');
                    }}
                    className="user-survey-dropdown-item"
                  >
                    <i className="fa fa-file-excel-o"></i> Export as Excel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
      {/* End td */}
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i} style={{
                backgroundColor: '#1f2937',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 15px',
                textAlign: i === 0 ? 'left' : i === 1 ? 'center' : i === 2 ? 'left' : 'center',
                border: 'none'
              }}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End thead */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;

