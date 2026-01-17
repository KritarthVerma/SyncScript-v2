import MonacoEditor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { getUserSettings, saveUserSettings } from "../utils/user";

export default function EditorPanel({inRoom,onMount,initialContent, theme, setTheme, fontSize, setFontSize, language, setLanguage}) {
  const saveTimeoutRef = useRef(null);
  
  const handleEditorChange = (newValue) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(() => {
      // 2. Get current full user object to avoid losing other properties
      const currentUser = getUserSettings();
      
      // 3. Merge the new content into the user structure
      const updatedUser = {
        ...currentUser,
        activeSettingsId: {
          ...currentUser.activeSettingsId,
          content: newValue
        }
      };

      if(!inRoom){
        updatedUser.personalSettingsId = {
          ...updatedUser.personalSettingsId,
          content: newValue
        };
      }

      saveUserSettings(updatedUser);
      console.log("Auto-saved to user settings");
    }, 1000);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);
  return (
    <MonacoEditor
        options={{minimap: {enabled: false}, fontSize: fontSize}}
        height="100%"
        width="100%"
        language={language}
        value={initialContent}
        theme={theme}
        onMount={onMount}
        onChange={handleEditorChange}
    />
  );
};