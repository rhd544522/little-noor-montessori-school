/**
 * Formats a phone number and generates a standard wa.me direct chat link
 * with dynamically substituted form type text.
 */
export function formatParentWhatsAppLink(
  phone: string | undefined | null,
  rawType: 'enrollment' | 'enquiry' | 'complaint' | 'tour' | string
): { url: string; formattedPhone: string; hasValidPhone: boolean } {
  if (!phone) {
    return { url: '', formattedPhone: '', hasValidPhone: false };
  }

  // Extract all digits
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length < 7) {
    return { url: '', formattedPhone: phone, hasValidPhone: false };
  }

  let finalNumber = digits;
  // If 10 digits (Standard Indian Mobile without country code), prepend 91
  if (finalNumber.length === 10) {
    finalNumber = `91${finalNumber}`;
  } else if (finalNumber.length === 11 && finalNumber.startsWith('0')) {
    // 09825123456 -> 919825123456
    finalNumber = `91${finalNumber.slice(1)}`;
  } else if (finalNumber.length > 10 && !finalNumber.startsWith('91')) {
    // If has other country code or already 12 digits, keep as is
    finalNumber = finalNumber;
  }

  // Determine dynamic request type label
  let typeLabel = 'Enquiry';
  const lower = String(rawType || '').toLowerCase();
  if (lower === 'enrollment') {
    typeLabel = 'Enrollment';
  } else if (lower === 'complaint') {
    typeLabel = 'Complaint';
  } else {
    typeLabel = 'Enquiry';
  }

  const messageText = `Namaste! Thank you for reaching out to Little Noor Montessori School, Bhuj. We have received your ${typeLabel} and our team will get back to you shortly. We appreciate your interest in our school. 🌱`;

  const url = `https://wa.me/${finalNumber}?text=${encodeURIComponent(messageText)}`;

  return {
    url,
    formattedPhone: `+${finalNumber}`,
    hasValidPhone: true,
  };
}
