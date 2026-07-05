import { NextRequest, NextResponse } from "next/server";
import { isR2Enabled } from "@/lib/config";
import { getPresignedUploadUrl } from "@/lib/storage/r2";
import { generateId } from "@/lib/utils";

/**
 * POST /api/upload
 * Returns a presigned URL the browser uses to upload a video directly to R2.
 * In demo mode (no R2 keys) it returns a placeholder so the UI flow still works.
 */

const ALLOWED_TYPES = ["video/mp4", "video/quicktime", "video/x-msvideo", "video/x-matroska", "video/webm"];
const MAX_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileSize, fileType } = await request.json();

    if (!fileType || !ALLOWED_TYPES.includes(fileType)) {
      return NextResponse.json(
        { error: "Invalid file type. Supported: MP4, MOV, AVI, MKV, WebM" },
        { status: 400 }
      );
    }
    if (typeof fileSize === "number" && fileSize > MAX_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 5GB." }, { status: 400 });
    }

    const projectId = `proj_${generateId()}`;
    const key = `uploads/${projectId}/${(fileName as string) || "video"}`;

    // LIVE: real presigned R2 URL
    if (isR2Enabled) {
      const uploadUrl = await getPresignedUploadUrl(key, fileType);
      return NextResponse.json({ success: true, uploadUrl, projectId, key });
    }

    // DEMO: placeholder response
    return NextResponse.json({
      success: true,
      uploadUrl: "https://upload.subverse.ai/demo-presigned-url",
      projectId,
      key,
      demo: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
