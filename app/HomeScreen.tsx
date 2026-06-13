import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function HomeScreen() {
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  console.log("what is the upcoming count", upcomingCount)

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  async function fetchUpcomingEvents() {
    const today = new Date().toISOString();

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("event_date", today) // future events only
      .order("event_date", { ascending: true });

    if (error) {
      console.log("Upcoming fetch error:", error);
      return;
    }

    setUpcomingEvents(data || []);
    setUpcomingCount(data?.length || 0);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.title}>Kirabo Havens</Text>
          <Text style={styles.subtitle}>Operations Dashboard</Text>
        </View>

        {/* KPI GRID */}
        <View style={styles.grid}>
          <Card
            title="Revenue"
            value="UGX 48.2M"
            onPress={() => router.push("/PerformanceScreen")}
          />

          {/* 🔥 REAL UPCOMING EVENTS COUNT */}
          <Card
            title="Upcoming Events"
            value={String(upcomingCount)}
            onPress={() => router.push("/UpcomingEvents")}
          />

          <Card
            title="Events Held"
            value="184"
            onPress={() => router.push("/PreviousEvents")}
          />

          <Card
            title="Stock Items"
            value="154"
            onPress={() => router.push("/InventoryScreen")}
          />
        </View>

        {/* UPCOMING EVENTS (REAL DATA) */}
        <Section
          title="Upcoming Events"
          onPress={() => router.push("/UpcomingEvents")}
        >
          {upcomingEvents.slice(0, 3).map((event) => (
            <ListItem
              key={event.id}
              text={`${event.name} - ${new Date(
                event.event_date
              ).toDateString()}`}
            />
          ))}
        </Section>

        {/* STATIC SECTIONS (unchanged for now) */}
        <Section
          title="Previous Events"
          onPress={() => router.push("/PreviousEvents")}
        >
          <ListItem text="Graduation Party - Completed" />
          <ListItem text="Baby Shower - Completed" />
        </Section>

        <Section
          title="Current Stock"
          onPress={() => router.push("/InventoryScreen")}
        >
          <ListItem text="Chairs - 120" />
          <ListItem text="Tables - 25" />
          <ListItem text="Tents - 8" />
        </Section>

        <Section
          title="Pending Purchases"
          onPress={() => router.push("/InventoryScreen")}
        >
          <ListItem text="Sofas - 3 needed" />
          <ListItem text="Flowers - 50 needed" />
          <ListItem text="Curtains - 8 needed" />
        </Section>

        <TouchableOpacity
          style={styles.caretaker}
          onPress={() => router.push("/CaretakerDetails")}
        >
          <Text style={styles.sectionTitle}>Current Caretaker</Text>
          <Text style={styles.caretakerName}>Francis Oyuko</Text>
          <Text style={styles.viewText}>Tap to view details →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({ title, value, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function Section({ title, children, onPress }: any) {
  return (
    <TouchableOpacity style={styles.section} onPress={onPress}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{children}</View>
    </TouchableOpacity>
  );
}

function ListItem({ text }: any) {
  return (
    <View style={styles.listItem}>
      <Text>{text}</Text>
    </View>
  );
}

function GraphBox({ label }: any) {
  return (
    <View style={styles.graph}>
      <Text style={{ color: "#0B6E4F" }}>{label}</Text>
    </View>
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
    padding: 22,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  greeting: {
    color: "#D4AF37",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: "#D1FAE5",
    marginTop: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
  },

  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B6E4F",
  },

  cardTitle: {
    color: "#6B7280",
    marginTop: 5,
  },

  section: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 16,
    borderRadius: 16,
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 10,
    color: "#064E3B",
  },

  listItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  graph: {
    height: 160,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  caretaker: {
    backgroundColor: "#064E3B",
    margin: 15,
    padding: 20,
    borderRadius: 16,
  },

  caretakerName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  viewText: {
    color: "#D4AF37",
    marginTop: 8,
  },
});