import MonacoEditor from "@monaco-editor/react";

export default function EditorPanel({content, theme, setTheme, fontSize, setFontSize, language, setLanguage}) {
  return (
    <MonacoEditor
        options={{minimap: {enabled: false}, fontSize: fontSize}}
        height="100%"
        width="100%"
        language={language}
        defaultValue={content}
        theme={theme}
    />
  );
};