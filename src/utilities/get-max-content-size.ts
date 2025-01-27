// src/utilities/get-max-content-size.ts

import * as vscode from "vscode";

export type GetMaxContentSizeProps = object;

// eslint-disable-next-line no-empty-pattern
export function getMaxContentSize({}: GetMaxContentSizeProps) {
  const config = vscode.workspace.getConfiguration("copyFolderContent");
  return config.get<number>("maxContentSize", 1048576); // Default to 1MB
}
