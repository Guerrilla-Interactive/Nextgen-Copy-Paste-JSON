// src/utilities/handle-error.ts

import * as vscode from "vscode";

export type HandleErrorProps = {
  error?: unknown;
};

export function handleError({ error }: HandleErrorProps) {
  if (error instanceof Error) {
    vscode.window.showErrorMessage(`Error: ${error.message}`);
  } else {
    vscode.window.showErrorMessage("An unknown error occurred");
  }
}
