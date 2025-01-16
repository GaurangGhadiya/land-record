function ConvertDateFormat(dateString) {
    // Split the date and time parts
    const [datePart, timePart] = dateString.split(' ');

    // Split the date into its components
    const [year, month, day] = datePart.split('-');

    // Format the date to the desired format
    return `${day}-${month}-${year} ${timePart}`;
}

function convertDateFormatApi(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
}

export default ConvertDateFormat
export { convertDateFormatApi }