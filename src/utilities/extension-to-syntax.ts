// src/utilities/extension-to-syntax.ts

export type ExtensionToSyntaxProps = {
  extension?: string;
};

const extensionSyntaxMap: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  html: "html",
  css: "css",
  json: "json",
  xml: "xml",
  yml: "yaml",
  yaml: "yaml",
  md: "markdown",
  markdown: "markdown",
  py: "python",
  rb: "ruby",
  php: "php",
  java: "java",
  cs: "csharp",
  cpp: "cpp",
  c: "c",
  h: "cpp",
  hpp: "cpp",
  swift: "swift",
  kt: "kotlin",
  go: "go",
  rs: "rust",
  sh: "shell",
  bash: "shell",
  zsh: "shell",
  perl: "perl",
  pl: "perl",
  lua: "lua",
  coffee: "coffeescript",
  litcoffee: "coffeescript",
  scss: "scss",
  less: "less",
  styl: "stylus",
  sql: "sql",
  txt: "plaintext",
  conf: "plaintext",
  config: "plaintext",
  ini: "plaintext",
  log: "plaintext",
  diff: "diff",
  patch: "diff",
  vb: "vbnet",
  ps1: "powershell",
  ps1xml: "powershell",
  psd1: "powershell",
  psm1: "powershell",
  dockerfile: "dockerfile",
  asm: "assembly",
  s: "assembly",
  vhdl: "vhdl",
  verilog: "verilog",
  sv: "verilog",
  r: "r",
  m: "matlab",
  octave: "octave",
  groovy: "groovy",
  adoc: "asciidoc",
  asciidoc: "asciidoc",
  latex: "latex",
  tex: "latex",
  bib: "bibtex",
  rst: "restructuredtext",
  rsttxt: "restructuredtext",
  apib: "apib",
  postman: "postman",
  toml: "toml",
  lock: "toml",
  plist: "xml",
  ipynb: "python",
  tf: "hcl",
  tfvars: "hcl",
  tfstate: "json",
  // Add more extensions and their syntax mappings here as needed
};

export function extensionToSyntax({
  extension,
}: ExtensionToSyntaxProps): string {
  if (!extension) {
    throw new Error("Extension is required");
  }

  return extensionSyntaxMap[extension] || extension;
}
