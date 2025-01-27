<!-- <p align="center">
  <img src="./assets/readme-title.png" width="600" />
</p> -->

# Nextgen Copy Paste JSON

A VS Code extension that copies files and folders as a structured JSON tree, perfect for use with content management systems and databases.

## Features

- **Copy as JSON Tree**: Right-click any file or folder to copy its contents as a structured JSON tree
- **Maintains Directory Structure**: Preserves your folder hierarchy in the JSON output
- **Generates Unique IDs**: Automatically creates unique identifiers for each node
- **Smart Content Processing**: Options to minimize content and remove comments

## Quick Start

1. Install the extension
2. Right-click a file or folder in VS Code
3. Select 'Copy File Contents To Clipboard'
4. Paste the JSON anywhere you need it

## JSON Output Structure

```json
{
  "_id": "file-content-command",
  "_type": "command",
  "title": "File Content Command",
  "filePaths": [
    {
      "_key": "unique-key",
      "_type": "filePathGroup",
      "id": "unique-id",
      "path": "directory-name",
      "nodes": [
        {
          "_key": "unique-key",
          "_type": "treeNode",
          "id": "unique-id",
          "name": "filename",
          "code": "file content",
          "children": []
        }
      ]
    }
  ]
}
```

## Configuration

Key settings:

```json
{
  "copyFolderContent.minimize": true, // Minimize output
  "copyFolderContent.removeComments": true // Remove code comments
}
```
