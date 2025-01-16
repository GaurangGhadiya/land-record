export const getImagePath = (path) => {
    const prefix = "/land-record-survey"; // For staging
    // const prefix = "/"; // For local
    return `${prefix}${path}`;
  };
