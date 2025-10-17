"use client";
import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/snippet";
import {
  DEFAULT_CLI_COMMANDS,
  type CLICommand,
} from "@/lib/collection-examples";
import { useEffect, useMemo, useState } from "react";

interface CLIExampleProps {
  cliInstallUrl?: string;
  initialCommand?: CLICommand["label"];
}

const CLIExample = ({ cliInstallUrl, initialCommand }: CLIExampleProps) => {
  // Generate commands dynamically if cliInstallUrl is provided
  const commandList: CLICommand[] = useMemo(() => {
    if (cliInstallUrl) {
      return [
        { label: "pnpm", code: `pnpm dlx shadcn@latest add ${cliInstallUrl}` },
        { label: "npm", code: `npx shadcn@latest add ${cliInstallUrl}` },
        { label: "yarn", code: `yarn shadcn@latest add ${cliInstallUrl}` },
        { label: "bun", code: `bunx --bun shadcn@latest add ${cliInstallUrl}` },
      ];
    }
    return DEFAULT_CLI_COMMANDS;
  }, [cliInstallUrl]);

  const defaultLabel = useMemo(() => {
    if (
      initialCommand &&
      commandList.some((cmd) => cmd.label === initialCommand)
    ) {
      return initialCommand;
    }
    return commandList[0]?.label ?? DEFAULT_CLI_COMMANDS[0]?.label ?? "";
  }, [commandList, initialCommand]);

  const [value, setValue] = useState(defaultLabel);
  const activeCommand = commandList.find((command) => command.label === value);

  useEffect(() => {
    setValue(defaultLabel);
  }, [defaultLabel]);
  return (
    <Snippet onValueChange={setValue} value={value}>
      <SnippetHeader>
        <SnippetTabsList>
          {commandList.map((command) => (
            <SnippetTabsTrigger key={command.label} value={command.label}>
              {command.label}
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>
        {activeCommand && (
          <SnippetCopyButton
            className="text-primary"
            onCopy={() =>
              console.log(`Copied "${activeCommand.code}" to clipboard`)
            }
            onError={() =>
              console.error(
                `Failed to copy "${activeCommand.code}" to clipboard`
              )
            }
            value={activeCommand.code}
          />
        )}
      </SnippetHeader>
      {commandList.map((command) => (
        <SnippetTabsContent
          key={command.label}
          value={command.label}
          className="text-primary"
        >
          {command.code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
};
export default CLIExample;
