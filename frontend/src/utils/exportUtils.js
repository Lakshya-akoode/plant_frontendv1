// Utility functions for exporting data to CSV/Excel

/**
 * Convert array of objects to CSV format
 */
export const convertToCSV = (data, headers) => {
  if (!data || data.length === 0) return '';

  // Create header row
  const headerRow = headers.map(h => `"${h.label}"`).join(',');
  
  // Create data rows
  const dataRows = data.map(row => {
    return headers.map(header => {
      const value = header.accessor(row);
      // Handle nested values and escape quotes
      let stringValue = value || '';
      if (typeof stringValue === 'object') {
        stringValue = JSON.stringify(stringValue);
      }
      // Replace quotes with double quotes and wrap in quotes
      stringValue = String(stringValue).replace(/"/g, '""');
      return `"${stringValue}"`;
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
};

/**
 * Download CSV file
 */
export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Download Excel file (XLSX format)
 */
export const downloadExcel = (data, headers, filename) => {
  // Create Excel XML format (works with Excel and other spreadsheet software)
  const xmlHeader = '<?xml version="1.0"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n xmlns:o="urn:schemas-microsoft-com:office:office"\n xmlns:x="urn:schemas-microsoft-com:office:excel"\n xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n xmlns:html="http://www.w3.org/TR/REC-html40">\n<Worksheet ss:Name="Sheet1">\n<Table>\n';
  
  // Create header row
  const headerRow = '<Row>\n' + headers.map(h => `<Cell><Data ss:Type="String">${escapeXml(h.label)}</Data></Cell>`).join('\n') + '\n</Row>\n';
  
  // Create data rows
  const dataRows = data.map(row => {
    const cells = headers.map(header => {
      const value = header.accessor(row);
      let stringValue = value || '';
      if (typeof stringValue === 'object') {
        stringValue = JSON.stringify(stringValue);
      }
      return `<Cell><Data ss:Type="String">${escapeXml(String(stringValue))}</Data></Cell>`;
    }).join('\n');
    return `<Row>\n${cells}\n</Row>\n`;
  }).join('');
  
  const xmlFooter = '</Table>\n</Worksheet>\n</Workbook>';
  const excelContent = xmlHeader + headerRow + dataRows + xmlFooter;
  
  const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.xls');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Escape XML special characters
 */
const escapeXml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Prepare survey responses data for export
 */
const prepareSurveyResponsesData = (responsesData) => {
  // Handle different response structures
  const groupedByUser = responsesData?.groupedByUser || responsesData?.data?.groupedByUser || (Array.isArray(responsesData?.data) ? null : responsesData?.data);
  
  if (!groupedByUser || (Array.isArray(groupedByUser) && groupedByUser.length === 0)) {
    return { headers: null, flatData: [] };
  }

  const headers = [
    { label: 'User Name', accessor: (row) => row.userName || 'N/A' },
    { label: 'User Email', accessor: (row) => row.userEmail || 'N/A' },
    { label: 'User Phone', accessor: (row) => row.userPhone || 'N/A' },
    { label: 'Survey Name', accessor: (row) => row.surveyName || 'N/A' },
    { label: 'Question', accessor: (row) => row.question || 'N/A' },
    { label: 'Answer', accessor: (row) => row.answer || 'N/A' },
    { label: 'Completed At', accessor: (row) => row.completedAt ? new Date(row.completedAt).toLocaleString() : 'N/A' },
  ];

  // Flatten the nested structure
  const flatData = [];
  const userGroups = Array.isArray(groupedByUser) ? groupedByUser : [groupedByUser];
  
  userGroups.forEach(userGroup => {
    if (userGroup && userGroup.surveys && Array.isArray(userGroup.surveys)) {
      userGroup.surveys.forEach(survey => {
        if (survey && survey.questionAnswerPairs && Array.isArray(survey.questionAnswerPairs)) {
          survey.questionAnswerPairs.forEach(qa => {
            flatData.push({
              userName: userGroup.userName,
              userEmail: userGroup.userEmail,
              userPhone: userGroup.userPhone,
              surveyName: survey.surveyName,
              question: qa.question,
              answer: qa.answer,
              completedAt: survey.completedAt,
            });
          });
        }
      });
    }
  });

  return { headers, flatData };
};

/**
 * Export survey responses to CSV
 */
export const exportSurveyResponsesToCSV = (responsesData, surveyName = 'Survey') => {
  const { headers, flatData } = prepareSurveyResponsesData(responsesData);
  
  if (!headers || flatData.length === 0) {
    console.warn('No data to export');
    return;
  }

  const csvContent = convertToCSV(flatData, headers);
  const filename = `${surveyName.replace(/[^a-z0-9]/gi, '_')}_responses_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export survey responses to Excel
 */
export const exportSurveyResponsesToExcel = (responsesData, surveyName = 'Survey') => {
  const { headers, flatData } = prepareSurveyResponsesData(responsesData);
  
  if (!headers || flatData.length === 0) {
    console.warn('No data to export');
    return;
  }

  const filename = `${surveyName.replace(/[^a-z0-9]/gi, '_')}_responses_${new Date().toISOString().split('T')[0]}.xls`;
  downloadExcel(flatData, headers, filename);
};

/**
 * Prepare user survey responses data for export
 */
const prepareUserSurveyResponsesData = (userData) => {
  if (!userData || !userData.surveys || userData.surveys.length === 0) {
    return { headers: null, flatData: [] };
  }

  const headers = [
    { label: 'Survey Name', accessor: (row) => row.surveyName || 'N/A' },
    { label: 'Question', accessor: (row) => row.question || 'N/A' },
    { label: 'Options', accessor: (row) => row.options ? row.options.join('; ') : 'N/A' },
    { label: 'Answer', accessor: (row) => row.answer || 'N/A' },
    { label: 'Completed At', accessor: (row) => row.completedAt ? new Date(row.completedAt).toLocaleString() : 'N/A' },
  ];

  // Flatten the data
  const flatData = [];
  userData.surveys.forEach(survey => {
    survey.questionAnswerPairs.forEach(qa => {
      flatData.push({
        surveyName: survey.surveyName,
        question: qa.question,
        options: qa.options || [],
        answer: qa.answer,
        completedAt: survey.completedAt,
      });
    });
  });

  return { headers, flatData };
};

/**
 * Export survey responses by user to CSV
 */
export const exportUserSurveyResponsesToCSV = (userData) => {
  const { headers, flatData } = prepareUserSurveyResponsesData(userData);
  
  if (!headers || flatData.length === 0) {
    return;
  }

  const csvContent = convertToCSV(flatData, headers);
  const userName = userData.user.name ? userData.user.name.replace(/[^a-z0-9]/gi, '_') : 'User';
  const filename = `${userName}_survey_responses_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export survey responses by user to Excel
 */
export const exportUserSurveyResponsesToExcel = (userData) => {
  const { headers, flatData } = prepareUserSurveyResponsesData(userData);
  
  if (!headers || flatData.length === 0) {
    return;
  }

  const userName = userData.user.name ? userData.user.name.replace(/[^a-z0-9]/gi, '_') : 'User';
  const filename = `${userName}_survey_responses_${new Date().toISOString().split('T')[0]}.xls`;
  downloadExcel(flatData, headers, filename);
};

/**
 * Prepare single survey response data for export
 */
const prepareSingleSurveyResponseData = (user, survey) => {
  if (!survey || !survey.questionAnswerPairs || survey.questionAnswerPairs.length === 0) {
    return { headers: null, flatData: [] };
  }

  const headers = [
    { label: 'Survey Name', accessor: (row) => row.surveyName || 'N/A' },
    { label: 'Question', accessor: (row) => row.question || 'N/A' },
    { label: 'Options', accessor: (row) => row.options ? row.options.join('; ') : 'N/A' },
    { label: 'Answer', accessor: (row) => row.answer || 'N/A' },
    { label: 'Completed At', accessor: (row) => row.completedAt ? new Date(row.completedAt).toLocaleString() : 'N/A' },
  ];

  // Flatten the data for single survey
  const flatData = survey.questionAnswerPairs.map(qa => ({
    surveyName: survey.surveyName,
    question: qa.question,
    options: qa.options || [],
    answer: qa.answer,
    completedAt: survey.completedAt || survey.createdAt,
  }));

  return { headers, flatData };
};

/**
 * Export single survey response to CSV
 */
export const exportSingleSurveyResponseToCSV = (user, survey) => {
  const { headers, flatData } = prepareSingleSurveyResponseData(user, survey);
  
  if (!headers || flatData.length === 0) {
    return;
  }

  const csvContent = convertToCSV(flatData, headers);
  const userName = user?.name ? user.name.replace(/[^a-z0-9]/gi, '_') : 'User';
  const surveyName = survey?.surveyName ? survey.surveyName.replace(/[^a-z0-9]/gi, '_') : 'Survey';
  const filename = `${userName}_${surveyName}_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export single survey response to Excel
 */
export const exportSingleSurveyResponseToExcel = (user, survey) => {
  const { headers, flatData } = prepareSingleSurveyResponseData(user, survey);
  
  if (!headers || flatData.length === 0) {
    return;
  }

  const userName = user?.name ? user.name.replace(/[^a-z0-9]/gi, '_') : 'User';
  const surveyName = survey?.surveyName ? survey.surveyName.replace(/[^a-z0-9]/gi, '_') : 'Survey';
  const filename = `${userName}_${surveyName}_${new Date().toISOString().split('T')[0]}.xls`;
  downloadExcel(flatData, headers, filename);
};

/**
 * Prepare survey detail responses data for export
 */
const prepareSurveyDetailResponsesData = (surveyData) => {
  if (!surveyData || !surveyData.responses || surveyData.responses.length === 0) {
    return { headers: null, flatData: [] };
  }

  const headers = [
    { label: 'User Name', accessor: (row) => row.userName || 'N/A' },
    { label: 'User Email', accessor: (row) => row.userEmail || 'N/A' },
    { label: 'User Phone', accessor: (row) => row.userPhone || 'N/A' },
    { label: 'Question', accessor: (row) => row.question || 'N/A' },
    { label: 'Options', accessor: (row) => row.options ? row.options.join('; ') : 'N/A' },
    { label: 'Answer', accessor: (row) => row.answer || 'N/A' },
    { label: 'Completed At', accessor: (row) => row.completedAt ? new Date(row.completedAt).toLocaleString() : 'N/A' },
  ];

  // Flatten the data
  const flatData = [];
  surveyData.responses.forEach(response => {
    response.questionAnswerPairs.forEach(qa => {
      flatData.push({
        userName: response.userName,
        userEmail: response.userEmail,
        userPhone: response.userPhone,
        question: qa.question,
        options: qa.options || [],
        answer: qa.answer,
        completedAt: response.completedAt,
      });
    });
  });

  return { headers, flatData };
};

/**
 * Export survey responses by survey ID to CSV
 */
export const exportSurveyDetailResponsesToCSV = (surveyData) => {
  const { headers, flatData } = prepareSurveyDetailResponsesData(surveyData);
  
  if (!headers || flatData.length === 0) {
    return;
  }

  const csvContent = convertToCSV(flatData, headers);
  const surveyName = surveyData.survey?.studyName ? surveyData.survey.studyName.replace(/[^a-z0-9]/gi, '_') : 'Survey';
  const filename = `${surveyName}_all_responses_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export survey responses by survey ID to Excel
 */
export const exportSurveyDetailResponsesToExcel = (surveyData) => {
  const { headers, flatData } = prepareSurveyDetailResponsesData(surveyData);
  
  if (!headers || flatData.length === 0) {
    return;
  }

  const surveyName = surveyData.survey?.studyName ? surveyData.survey.studyName.replace(/[^a-z0-9]/gi, '_') : 'Survey';
  const filename = `${surveyName}_all_responses_${new Date().toISOString().split('T')[0]}.xls`;
  downloadExcel(flatData, headers, filename);
};

/**
 * Prepare user list data for export
 */
const prepareUserListData = (usersData) => {
  if (!usersData || !Array.isArray(usersData) || usersData.length === 0) {
    return { headers: null, flatData: [] };
  }

  const headers = [
    { label: 'Name', accessor: (row) => row.name || 'N/A' },
    { label: 'Email', accessor: (row) => row.email || 'N/A' },
    { label: 'MPQ Status', accessor: (row) => row.masterProfileQuestionnaireCompleted ? 'Completed' : 'Not Completed' },
    { label: 'Registration Completed', accessor: (row) => row.registrationCompleted ? 'Yes' : 'No' },
    { label: 'Email Verified', accessor: (row) => row.isEmailVerified ? 'Yes' : 'No' },
    { label: 'Phone Verified', accessor: (row) => row.isPhoneVerified ? 'Yes' : 'No' },
    { label: 'Status', accessor: (row) => row.status ? 'Active' : 'Inactive' },
    { label: 'Created At', accessor: (row) => row.createdAt ? new Date(row.createdAt).toLocaleString() : 'N/A' },
  ];

  const flatData = usersData.map(user => ({
    name: user.name,
    email: user.email,
    masterProfileQuestionnaireCompleted: user.masterProfileQuestionnaireCompleted,
    registrationCompleted: user.registrationCompleted,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    status: user.status,
    createdAt: user.createdAt,
  }));

  return { headers, flatData };
};

/**
 * Export user list to CSV
 */
export const exportUserListToCSV = (usersData) => {
  const { headers, flatData } = prepareUserListData(usersData);
  
  if (!headers || flatData.length === 0) {
    console.warn('No user data to export');
    return;
  }

  const csvContent = convertToCSV(flatData, headers);
  const filename = `user_list_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export user list to Excel
 */
export const exportUserListToExcel = (usersData) => {
  const { headers, flatData } = prepareUserListData(usersData);
  
  if (!headers || flatData.length === 0) {
    console.warn('No user data to export');
    return;
  }

  const filename = `user_list_${new Date().toISOString().split('T')[0]}.xls`;
  downloadExcel(flatData, headers, filename);
};

