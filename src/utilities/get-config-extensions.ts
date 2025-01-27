// src/utilities/get-config-extensions.ts

import * as vscode from "vscode";

export type GetConfigExtensionsProps = object;

// eslint-disable-next-line no-empty-pattern
export function getConfigExtensions({}: GetConfigExtensionsProps) {
  const config = vscode.workspace.getConfiguration("copyFolderContent");
  return config.get<string[]>("include", ["**/*.{js,ts,jsx,tsx}"]);
}
