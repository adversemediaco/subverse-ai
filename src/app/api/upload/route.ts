import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload
 * Handles video upload via presigned URL flow.
 * In production, this generates a presigned URL for Cloudflare R2 upload.
 */

export async function POST(request: NextRequest) {
  try {
    // In production: authenticate user via Clerk
    // const { userId } = auth();
    // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { fileName, fileSize, fileType } = body;

    // Validate file type
    const allowedTypes = ["video/mp4", "video/mov", "video/avi", "video/mkv", "video/webm"];
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json(
        { error: "Invalid file type. Supported: MP4, MOV, AVI, MKV, WebM" },
        { status: 400 }
      );
    }

    // Validate file size (5GB max)
    const MAX_SIZE = 5 * 1024 * 1024 * 1024;
    if (fileSize > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5GB." },
        { status: 400 }
      );
    }

    // In production: Generate presigned URL for R2 upload
    // const key = `uploads/${userId}/${generateId()}-${fileName}`;
    // const presignedUrl = await getPresignedUploadUrl(key, fileType);

    // Create project in database
    // const project = await prisma.project.create({
    //   data: { userId, name: fileName, videoKey: key, fileSize, status: "UPLOADING" }
    // });

    return NextResponse.json({
      success: true,
      uploadUrl: "https://upload.subverse.ai/presigned-url-placeholder",
      projectId: "proj_" + Date.now(),
      message: "Upload URL generated. Upload your file to begin processing.",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
