import cloudinary from "../config/cloudinary.js";

export function formatCloudinaryFile(result) {
  return {
    assetId: result.asset_id,
    publicId: result.public_id,
    resourceType: result.resource_type,
    format: result.format,
    bytes: result.bytes,
    version: result.version,
    type: result.type,
    originalFilename: result.original_filename,
    secureUrl: result.secure_url,
    url: result.url,
    width: result.width,
    height: result.height,
    pages: result.pages,
    createdAt: result.created_at,
  };
}

export function buildDeliveryUrl(fileDoc) {
  return cloudinary.url(fileDoc.cloudinary.publicId, {
    secure: true,
    resource_type: fileDoc.cloudinary.resourceType || "image",
    format: fileDoc.cloudinary.format,
  });
}