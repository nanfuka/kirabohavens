import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PerformanceScreen() {
  const monthlyData = [
    { month: "Jan", events: 12, revenue: "8.2M" },
    { month: "Feb", events: 18, revenue: "10.5M" },
    { month: "Mar", events: 22, revenue: "12.1M" },
    { month: "Apr", events: 19, revenue: "11.3M" },
    { month: "May", events: 26, revenue: "15.4M" },
    { month: "Jun", events: 31, revenue: "18.2M" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Performance Analytics</Text>
          <Text style={styles.subtitle}>
            Monthly Events & Revenue Overview
          </Text>
        </View>

        {/* SUMMARY CARDS */}
        <View style={styles.summaryRow}>

          <View style={styles.card}>
            <Text style={styles.value}>184</Text>
            <Text style={styles.label}>Total Events</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.value}>UGX 75.7M</Text>
            <Text style={styles.label}>Total Revenue</Text>
          </View>

        </View>

        {/* GROWTH INDICATOR */}
        <View style={styles.growthCard}>
          <Text style={styles.growthTitle}>Growth Rate</Text>
          <Text style={styles.growthValue}>+18.5% ↗</Text>
          <Text style={styles.growthText}>
            Performance is improving compared to last period
          </Text>
        </View>

        {/* GRAPH PLACEHOLDER */}
        <View style={styles.graph}>
          <Text style={{ color: "#0B6E4F", fontWeight: "600" }}>
            Revenue vs Events Graph
          </Text>
        </View>

        {/* MONTHLY BREAKDOWN */}
        <Text style={styles.sectionTitle}>Monthly Breakdown</Text>

        {monthlyData.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.month}>{item.month}</Text>
            <Text style={styles.events}>{item.events} Events</Text>
            <Text style={styles.revenue}>UGX {item.revenue}</Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
  },

  header: {
    backgroundColor: "#0B6E4F",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#D1FAE5",
    marginTop: 4,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    elevation: 3,
  },

  value: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B6E4F",
  },

  label: {
    color: "#6B7280",
    marginTop: 5,
  },

  growthCard: {
    backgroundColor: "#064E3B",
    margin: 15,
    padding: 16,
    borderRadius: 16,
  },

  growthTitle: {
    color: "#D4AF37",
    fontWeight: "600",
  },

  growthValue: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 5,
  },

  growthText: {
    color: "#D1FAE5",
    marginTop: 5,
  },

  graph: {
    height: 200,
    backgroundColor: "#ECFDF5",
    margin: 15,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    color: "#064E3B",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
  },

  month: {
    fontWeight: "700",
  },

  events: {
    color: "#6B7280",
  },

  revenue: {
    color: "#0B6E4F",
    fontWeight: "600",
  },
});