/**
 * Downloads the CV file from the frontend public folder
 * Works in both development and production environments
 * The file is served as a static asset from the public folder
 */
const downloadCV = () => {
  const cvFileName = 'AmanKumarSah_2026DS05_Resume.pdf';
  // File is in frontend/public/files/pdf/, which is served at /files/pdf/ in the app
  const cvPath = `/files/pdf/${cvFileName}`;
  
  // Create a temporary anchor element to trigger download
  const link = document.createElement('a');
  link.href = cvPath;
  link.download = cvFileName;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadCV;

