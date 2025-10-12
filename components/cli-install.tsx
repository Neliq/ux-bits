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
  commands?: CLICommand[];
  initialCommand?: CLICommand["label"];
}

const CLIExample = ({ commands, initialCommand }: CLIExampleProps) => {
  const commandList = useMemo(() => {
    if (commands && commands.length > 0) {
      return commands;
    }
    return DEFAULT_CLI_COMMANDS;
  }, [commands]);

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
        <SnippetTabsContent key={command.label} value={command.label}>
          {command.code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
};
export default CLIExample;
