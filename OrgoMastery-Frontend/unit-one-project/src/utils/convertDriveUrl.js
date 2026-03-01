export default function convertDriveUrl(url) {
  if (!url) return "";

  // Match Google Drive FILE ID patterns
  const match = url.match(/\/d\/([^/]+)/);
  const id = match ? match[1] : null;

  if (!id) {
    // Return original URL if not a Google Drive link
    return url;
  }

  // Return valid embed link
  return `https://drive.google.com/file/d/${id}/preview`;
}
