// ./registry/lagos/utils/cloudinary-uploader.ts

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

const uploadToCloudinary = async ({
  file,
  preset,
}: {
  file: File;
  preset: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);
  formData.append("api_key", CLOUDINARY_API_KEY as string);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data;
};

export default uploadToCloudinary;
