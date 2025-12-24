import Navbar from "../components/Navbar";
import EditorPanel from "../components/EditorPanel";

export default function Editor(){
  return (
    <div style={styles.wrapper}>
      <Navbar />
      <EditorPanel />
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