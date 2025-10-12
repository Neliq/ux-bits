import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const repoRoot = process.cwd();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const filePath = url.searchParams.get("path");

  if (!filePath) {
    return NextResponse.json(
      { error: "Missing path query parameter" },
      { status: 400 }
    );
  }

  const normalizedPath = path.normalize(filePath);
  const absolutePath = path.resolve(repoRoot, normalizedPath);
  const safePrefix = `${repoRoot}${path.sep}`;

  if (absolutePath === repoRoot || !absolutePath.startsWith(safePrefix)) {
    return NextResponse.json(
      { error: "Invalid path provided" },
      { status: 400 }
    );
  }

  try {
    const stats = await fs.stat(absolutePath);
    if (!stats.isFile()) {
      return NextResponse.json(
        { error: "Requested path is not a file" },
        { status: 400 }
      );
    }

    const code = await fs.readFile(absolutePath, "utf-8");
    return NextResponse.json(
      { code },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Unable to read file: ${message}` },
      { status: 404 }
    );
  }
}
