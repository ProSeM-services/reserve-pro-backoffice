// Note: S3 Image Component
export function getS3Url(image: string) {
  const baseUrl = import.meta.env.VITE_S3_BASE_URL;
  return `${baseUrl}/${image}`;
}
