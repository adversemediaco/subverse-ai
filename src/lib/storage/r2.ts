import "server-only";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isR2Enabled } from "@/lib/config";

/**
 * Cloudflare R2 storage helpers.
 *
 * R2 is S3-compatible, so we use the AWS S3 SDK pointed at the R2 endpoint.
 * The client is created lazily to keep imports safe in demo mode.
 */

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!isR2Enabled) {
    throw new Error(
      "Cloudflare R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_BUCKET_NAME."
    );
  }
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
      },
    });
  }
  return client;
}

const BUCKET = () => process.env.R2_BUCKET_NAME as string;

/**
 * Generate a presigned URL the browser can PUT a file to directly.
 * @param key    object key (path) in the bucket
 * @param contentType MIME type of the upload
 * @param expiresIn seconds until the URL expires (default 1 hour)
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET(),
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(getClient(), command, { expiresIn });
}

/**
 * Generate a presigned URL to download/stream a private object.
 */
export async function getPresignedDownloadUrl(
  key: string,
  expiresIn = 3600
): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET(), Key: key });
  return getSignedUrl(getClient(), command, { expiresIn });
}

/** Delete an object from the bucket. */
export async function deleteObject(key: string): Promise<void> {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: BUCKET(), Key: key })
  );
}

/** Public URL for an object (requires the bucket to have public access / a custom domain). */
export function getPublicUrl(key: string): string {
  const base = process.env.R2_PUBLIC_URL;
  return base ? `${base.replace(/\/$/, "")}/${key}` : key;
}
