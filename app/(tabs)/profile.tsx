import { getCurrentUser, updateUser } from "@/lib/appwrite";
import React, { useEffect, useState } from "react";
import { Alert, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar || `https://avatars.dicebear.com/api/initials/${user.name}.png`);
        setUserId(user.$id);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      await updateUser(userId, { name, email });
      Alert.alert("Success", "Profile updated successfully!");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#f5f5f5" }}>
      {/* Header Card */}
      <View
        style={{
          backgroundColor: "#FE8C00",
          height: 200,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: avatar }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#fff",
          }}
        />
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold", marginTop: 10 }}>{name}</Text>
      </View>

      {/* Info Section */}
      <View style={{ padding: 20, marginTop: -50 }}>
        {/* Name Input */}
        <Text style={{ fontWeight: "600", marginBottom: 5 }}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 15,
            padding: 15,
            backgroundColor: "#fff",
            marginBottom: 15,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: Platform.OS === "android" ? 2 : 0,
          }}
        />

        {/* Email Input */}
        <Text style={{ fontWeight: "600", marginBottom: 5 }}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Your Email"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 15,
            padding: 15,
            backgroundColor: "#fff",
            marginBottom: 25,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: Platform.OS === "android" ? 2 : 0,
          }}
        />

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={loading}
          style={{
            backgroundColor: "#FE8C00",
            padding: 15,
            borderRadius: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 3 },
            elevation: Platform.OS === "android" ? 5 : 0,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
