import Navbar from "../components/Navbar";
import EditorPanel from "../components/EditorPanel";
import { useRef, useState } from "react";
import api from "../utils/axios";
import { getUserSettings, saveUserSettings } from "../utils/user";

export default function Editor(){
  const userSettings = getUserSettings();
  const [theme, setTheme] = useState(userSettings.theme);
  const [fontSize, setFontSize] = useState(userSettings.fontSize);
  const [language, setLanguage] = useState(userSettings.activeSettingsId.language);
  const editorRef = useRef(null);

  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    try {
      // 2️⃣ Call backend API
      const { data } = await api.put("editor/user", {
        language: newLanguage
      });

      console.log("Language saved →", data.settings.language);

      // 3️⃣ Update localStorage safely
      const user = getUserSettings();
      if (user) {
        const updatedUser = {
          ...user,
          personalSettingsId: {
            ...user.personalSettingsId,
            language: data.settings.language
          },
          activeSettingsId: {
            ...user.activeSettingsId,
            language: data.settings.language
          }
        };

        saveUserSettings(updatedUser);
        console.log("LocalStorage user updated →", updatedUser);
      }

    } catch (err) {
      console.error("Language update failed:", err?.response?.data || err.message);
    }
  };

  const handleFontSizeChange = async (newFontSize) => {
    setFontSize(newFontSize);
    try {
      const { data } = await api.patch("user/settings/font-size", {
        fontSize: newFontSize
      });

      // 2️⃣ Merge + update localStorage user
      const user = getUserSettings();
      if (user) {
        const updatedUser = {
          ...user,
          fontSize: data.fontSize
        };
        saveUserSettings(updatedUser);
      }

    } catch (err) {
      console.error("Font size update failed:", err?.response?.data || err.message);
      // optional rollback
      // const user = getUserSettings();
      // setFontSize(user?.fontSize || 14);
    }

  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div style={styles.wrapper}>
      <Navbar editorRef={editorRef} theme={theme} setTheme={handleThemeChange} fontSize={fontSize} setFontSize={handleFontSizeChange} language={language} setLanguage={handleLanguageChange}/>
      <EditorPanel onMount={handleEditorMount} content={userSettings.activeSettingsId.content} theme={theme} setTheme={handleThemeChange} fontSize={fontSize} setFontSize={handleFontSizeChange} language={language} setLanguage={handleLanguageChange}/>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }
};