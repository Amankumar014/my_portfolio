import API_BASE_URL from '../config/api';

/**
 * Downloads the CV file
 * Works in both development and production environments
 */
const downloadCV = async () => {
  const cvFileName = 'aman_cv_ai.pdf';
  const cvPath = `pdf/${cvFileName}`;
  
  // In production, use the backend API endpoint
  // In development, use the public folder path
  const isProduction = process.env.NODE_ENV === 'production';
  
  let downloadUrl;
  if (isProduction) {
    // Use backend API endpoint for production (Azure)
    downloadUrl = `${API_BASE_URL}/files/${cvPath}`;
  } else {
    // Use public folder path for development
    downloadUrl = `/files/${cvPath}`;
  }
  
  try {
    // Fetch the file
    const response = await fetch(downloadUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to download CV: ${response.statusText}`);
    }
    
    // Create a blob from the response
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = cvFileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading CV:', error);
    // Fallback: try direct download link
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = cvFileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default downloadCV;

