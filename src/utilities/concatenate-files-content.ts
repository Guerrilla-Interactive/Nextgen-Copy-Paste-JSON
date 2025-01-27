// src/utilities/concatenate-files-content.ts

import * as fs from "fs/promises";
import * as path from "path";
import * as vscode from "vscode";
import { getConfig } from "./get-config";
import { removeCommentsFromCode } from "./remove-comments";
import { randomBytes } from "crypto";

export type ConcatenateFilesContentProps = {
  files?: string[];
};

interface TreeNode {
  _key: string;
  _type: "treeNode";
  id: string;
  name: string;
  code?: string;
  children: TreeNode[];
}

interface CommandStructure {
  _id: string;
  _type: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  filePaths: Array<{
    _key: string;
    _type: string;
    id: string;
    path: string;
    nodes: TreeNode[];
  }>;
}

const generateRandomKey = () => randomBytes(16).toString("base64");

function createTreeStructure(filePath: string, content?: string): TreeNode {
  const name = path.basename(filePath);

  return {
    _key: `node-${generateRandomKey()}`,
    _type: "treeNode",
    id: `node-${generateRandomKey()}`,
    name,
    code: content,
    children: [],
  };
}

function buildFileTree(
  files: Map<string, string>,
  baseDir: string
): TreeNode[] {
  const root: { [key: string]: TreeNode } = {};

  for (const [filePath, content] of files.entries()) {
    const relativePath = path.relative(baseDir, filePath);
    const parts = relativePath.split("/");
    let currentLevel = root;

    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = createTreeStructure(
          part,
          index === parts.length - 1 ? content : undefined
        );
      }

      if (index < parts.length - 1) {
        currentLevel = currentLevel[part].children.reduce(
          (acc, child) => {
            acc[child.name] = child;
            return acc;
          },
          {} as { [key: string]: TreeNode }
        );
      }
    });
  }

  return Object.values(root);
}

export async function concatenateFilesContent({
  files,
}: ConcatenateFilesContentProps) {
  if (!files) {
    throw new Error("Files are required");
  }

  const rootDir = vscode.workspace.workspaceFolders
    ? vscode.workspace.workspaceFolders[0].uri.fsPath
    : "";

  const { removeComments, minimize } = getConfig();

  // Create the base command structure
  const commandStructure: CommandStructure = {
    _id: "file-content-command",
    _type: "command",
    title: "File Content Command",
    slug: {
      _type: "slug",
      current: "file-content-command",
    },
    filePaths: [],
  };

  // Group files by their base directory
  const filesByDirectory = new Map<string, Map<string, string>>();

  // Process all files in parallel
  await Promise.all(
    files.map(async (file) => {
      const fileContent = await fs.readFile(file, "utf8");
      let processedContent = fileContent;

      if (removeComments) {
        processedContent = removeCommentsFromCode(processedContent);
      }
      if (minimize) {
        processedContent = processedContent.replace(/\s+/g, " ");
      }

      const relativePath = path.relative(rootDir, file);
      const baseDir = path.dirname(relativePath).split("/")[0];

      if (!filesByDirectory.has(baseDir)) {
        filesByDirectory.set(baseDir, new Map());
      }
      filesByDirectory.get(baseDir)!.set(file, processedContent);
    })
  );

  // Convert the grouped files into the desired structure
  commandStructure.filePaths = Array.from(filesByDirectory.entries()).map(
    ([baseDir, filesMap]) => ({
      _key: `group-${generateRandomKey()}`,
      _type: "filePathGroup",
      id: `group-${generateRandomKey()}`,
      path: baseDir,
      nodes: buildFileTree(filesMap, rootDir),
    })
  );

  return JSON.stringify(commandStructure, null, 2);
}
