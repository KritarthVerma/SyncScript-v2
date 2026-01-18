import Navbar from "../components/Navbar";
import EditorPanel from "../components/EditorPanel";
import { useRef, useState, useEffect } from "react";
import api from "../utils/axios";
import {socket} from "../config/socket.js";
import { toast } from "react-toastify";
import { getUserSettings, saveUserSettings } from "../utils/user";

export default function Editor(){
  const userSettings = getUserSettings();
  const [theme, setTheme] = useState(userSettings.theme);
  const [fontSize, setFontSize] = useState(userSettings.fontSize);
  const [language, setLanguage] = useState(userSettings.activeSettingsId.language);
  const [inRoom, setInRoom] = useState(userSettings.currentRoomId ? true : false);
  const editorRef = useRef(null);

  const handleLanguageChange = async (newLanguage,updateDB = true) => {
    setLanguage(newLanguage);
    if(!updateDB) return;
    console.log("Updating language to:", newLanguage, "inRoom:", inRoom);
    try {
      // 2️⃣ Call backend API
      const url = inRoom ? "/editor/room/" + userSettings.currentRoomId : "/editor/user";
      const { data } = await api.put(url, {
        language: newLanguage
      });

      console.log("Language saved →", data.settings.language);

      // 3️⃣ Update localStorage safely
      const user = getUserSettings();
      if (user) {
        let updatedUser = {
          ...user,
          activeSettingsId: {
            ...user.activeSettingsId,
            language: data.settings.language
          }
        };

        if(!inRoom){
          console.log("Updating personalSettingsId language");
          updatedUser = {
            ...updatedUser,
            personalSettingsId: {
              ...updatedUser.personalSettingsId,
              language: data.settings.language
            }
          };
        }

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

  const handleThemeChange = async (newTheme) => {
    setTheme(newTheme);
    try {
      const { data } = await api.patch("user/settings/theme", {
        theme: newTheme
      });

      // 2️⃣ Merge + update localStorage user
      const user = getUserSettings();
      if (user) {
        const updatedUser = {
          ...user,
          theme: data.theme
        };
        saveUserSettings(updatedUser);
      }

    } catch (err) {
      console.error("Theme update failed:", err?.response?.data || err.message);
    }
  };

  useEffect(() => {
  
      socket.on("user-joined", (data) => {
        if(data.userId !== getUserSettings()._id){
          toast.info(`${data.name} joined the room`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
      });
  
      socket.on("join-room-success", () => {
          toast.success("You have joined the room successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
      });
  
      socket.on("user-left", (data) => {
        if(data.userId !== getUserSettings()._id){
          toast.info(`${data.name} left the room`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
      })
  
      socket.on("left-room-success", () => {
        toast.success("You have left the room successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  
      // cleanup to avoid duplicate listeners
      return () => {
        socket.off("user-joined");
        socket.off("join-room-success");
        socket.off("user-left");
        socket.off("left-room-success");
      };
    }, []);

  return (
    <div style={styles.wrapper}>
      <Navbar setInRoom={setInRoom} inRoom={inRoom} editorRef={editorRef} theme={theme} setTheme={handleThemeChange} fontSize={fontSize} setFontSize={handleFontSizeChange} language={language} setLanguage={handleLanguageChange}/>
      <EditorPanel inRoom={inRoom} onMount={handleEditorMount} initialContent={userSettings.activeSettingsId.content} theme={theme} setTheme={handleThemeChange} fontSize={fontSize} setFontSize={handleFontSizeChange} language={language} setLanguage={handleLanguageChange}/>
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