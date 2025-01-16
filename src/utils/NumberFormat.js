function formatNumber(num) {
    // Convert the number to a string
    const numStr = num.toString();
    // Split the number into the integer and decimal parts
    const [integerPart, decimalPart] = numStr.split('.');

    // Use regex to format the integer part for Indian numbering
    const lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);

    const formattedInteger = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherDigits ? "," : "") + lastThreeDigits;

    // Combine the integer and decimal parts (if any)
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export default formatNumber;
