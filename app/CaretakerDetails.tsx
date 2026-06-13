import { Text, View } from "react-native";

export default function CaretakerDetails() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>
        Caretaker Profile
      </Text>

      <View
        style={{
          marginTop: 20,
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <Text>Name: Francis Oyuko</Text>
        <Text>Phone: +256703703</Text>
        <Text>Role: Property Caretaker</Text>
        <Text>Status: Active</Text>
        <Text>Assigned: Main Hall</Text>
      </View>
    </View>
  );
}