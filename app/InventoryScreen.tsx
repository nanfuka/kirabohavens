import { ScrollView, Text, View } from "react-native";

export default function InventoryScreen() {
  const stock = [
    { item: "Chairs", qty: 120 },
    { item: "Tables", qty: 25 },
    { item: "Tents", qty: 8 },
  ];

  return (
    <ScrollView style={{ padding: 15 }}>
      {stock.map((s, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#fff",
            padding: 15,
            marginBottom: 10,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontWeight: "700" }}>{s.item}</Text>
          <Text>Quantity: {s.qty}</Text>
        </View>
      ))}
    </ScrollView>
  );
}