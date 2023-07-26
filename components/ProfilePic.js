import React from "react";

export default function ProfilePic() {
  const profilePic = require("./assets/images/userImage.jpg"); // Replace with the actual path to the profile picture
  const [name, setName] = useState("John Doe");
  return (
    <View style={styles.header}>
      <View style={styles.headerInfo}>
        <Text style={styles.name}>Hi {name}</Text>
        <Image source={profilePic} style={styles.profilePic} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 200,
  },
});
