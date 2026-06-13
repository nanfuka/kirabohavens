import { Text, View } from "react-native";

export default function CalendarScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>
        Booking Calendar
      </Text>

      <View
        style={{
          height: 300,
          marginTop: 20,
          backgroundColor: "#F1F8E9",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
        }}
      >
        <Text>Calendar with booked dates</Text>
      </View>
    </View>
  );
}