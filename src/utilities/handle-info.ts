// src/utilities/handle-info.ts

import * as vscode from "vscode";

export function handleInfo(info: string) {
  vscode.window.showInformationMessage(info);
}
