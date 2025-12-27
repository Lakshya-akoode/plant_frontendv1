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
 * Export survey responses to CSV
 */
export const exportSurveyResponsesToCSV = (responsesData, surveyName = 'Survey') => {
  // Handle different response structures
  const groupedByUser = responsesData?.groupedByUser || responsesData?.data?.groupedByUser || (Array.isArray(responsesData?.data) ? null : responsesData?.data);
  
  if (!groupedByUser || (Array.isArray(groupedByUser) && groupedByUser.length === 0)) {
    console.warn('No data to export');
    return;
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

  // Flatten the nested structure for CSV
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

  if (flatData.length === 0) {
    console.warn('No data rows to export');
    return;
  }

  const csvContent = convertToCSV(flatData, headers);
  const filename = `${surveyName.replace(/[^a-z0-9]/gi, '_')}_responses_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export survey responses by user to CSV
 */
export const exportUserSurveyResponsesToCSV = (userData) => {
  if (!userData || !userData.surveys || userData.surveys.length === 0) {
    return;
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

  const csvContent = convertToCSV(flatData, headers);
  const userName = userData.user.name ? userData.user.name.replace(/[^a-z0-9]/gi, '_') : 'User';
  const filename = `${userName}_survey_responses_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export survey responses by survey ID to CSV
 */
export const exportSurveyDetailResponsesToCSV = (surveyData) => {
  if (!surveyData || !surveyData.responses || surveyData.responses.length === 0) {
    return;
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

  const csvContent = convertToCSV(flatData, headers);
  const surveyName = surveyData.survey?.studyName ? surveyData.survey.studyName.replace(/[^a-z0-9]/gi, '_') : 'Survey';
  const filename = `${surveyName}_all_responses_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

