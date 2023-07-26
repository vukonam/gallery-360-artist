import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProfileCard = ({ name, profilePic, handleAddArtwork }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Image source={profilePic} style={styles.profilePic} />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileInfoText}>
              make your first sale by adding artwork
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddArtwork}>
          <Text style={styles.addButtonText}>Add Artworks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles for ProfileCard component here
  // ...
});

export default ProfileCard;
