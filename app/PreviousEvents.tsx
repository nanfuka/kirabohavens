import { ScrollView, Text, View } from "react-native";

export default function PreviousEvents() {
  const events = [
    { name: "Graduation Party", revenue: "UGX 3.2M", status: "Completed" },
    { name: "Baby Shower", revenue: "UGX 1.1M", status: "Completed" },
  ];

  return (
    <ScrollView style={{ padding: 15 }}>
      {events.map((e, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#fff",
            padding: 15,
            marginBottom: 10,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontWeight: "700" }}>{e.name}</Text>
          <Text>{e.revenue}</Text>
          <Text>{e.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}