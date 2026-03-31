export interface ParsedPrefixCommand {
  command: string;
  args: string[];
}

export function parsePrefixInput(raw: string): ParsedPrefixCommand {
  const trimmed = raw.trim();
  if (!trimmed) return { command: '', args: [] };
  const [command, ...args] = trimmed.split(/\s+/);
  return { command: command.toLowerCase(), args };
}
