import { ScrollView, Text, View } from "react-native";

export default function PendingPurchases() {
  const items = [
    { item: "Sofas", qty: 3 },
    { item: "Flowers", qty: 50 },
    { item: "Curtains", qty: 8 },
  ];

  return (
    <ScrollView style={{ padding: 15 }}>
      {items.map((i, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#fff",
            padding: 15,
            marginBottom: 10,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontWeight: "700" }}>{i.item}</Text>
          <Text>Needed: {i.qty}</Text>
        </View>
      ))}
    </ScrollView>
  );
}