"use client";
import type { BundledLanguage } from "@/components/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/code-block";
import React, { useEffect, useState } from "react";

interface CodeExampleProps {
  path: string;
}

const CodeExample = ({ path }: CodeExampleProps) => {
  const filename = path.split("/").pop() || "";
  const extension = (filename.split(".").pop() || "").toLowerCase();

  // State for code, loading, and error
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const fetchCode = async () => {
      setLoading(true);
      setError("");
      setCode("");
      try {
        const res = await fetch(`/api/code?path=${encodeURIComponent(path)}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = (await res.json()) as { code?: string; error?: string };
        if (!res.ok || !data || typeof data.code !== "string") {
          throw new Error(data?.error || "Unexpected response");
        }
        if (!cancelled) {
          setCode(data.code);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            typeof err === "object" && err && "message" in err
              ? (err as { message: string }).message
              : String(err);
          setError(message);
          setLoading(false);
        }
      }
    };
    fetchCode();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [path]);

  const language = extension === "tsx" ? "tsx" : extension;
  const codeData = [
    {
      language,
      filename,
      code,
    },
  ];

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading code…</div>;
  }
  if (error) {
    return (
      <div className="text-sm text-destructive" role="alert">
        Error loading code: {error}
      </div>
    );
  }

  return (
    <CodeBlock data={codeData} defaultValue={language}>
      <CodeBlockHeader>
        <CodeBlockFiles>
          {(item) => (
            <CodeBlockFilename key={item.language} value={item.language}>
              {item.filename}
            </CodeBlockFilename>
          )}
        </CodeBlockFiles>
        <CodeBlockSelect>
          <CodeBlockSelectTrigger>
            <CodeBlockSelectValue />
          </CodeBlockSelectTrigger>
          <CodeBlockSelectContent>
            {(item) => (
              <CodeBlockSelectItem key={item.language} value={item.language}>
                {item.language}
              </CodeBlockSelectItem>
            )}
          </CodeBlockSelectContent>
        </CodeBlockSelect>
        <CodeBlockCopyButton
          onCopy={() => console.log("Copied code to clipboard")}
          onError={() => console.error("Failed to copy code to clipboard")}
        />
      </CodeBlockHeader>
      <CodeBlockBody>
        {(item) => (
          <CodeBlockItem key={item.language} value={item.language}>
            <CodeBlockContent language={item.language as BundledLanguage}>
              {item.code}
            </CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </CodeBlock>
  );
};
export default CodeExample;
