import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

interface Event {
  id: number;
  name: string;
  event_date: string;
  guests: number;
  status: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending")
      .order("event_date", { ascending: true });

    if (error) {
      console.log("Fetch error:", error);
      setLoading(false);
      return;
    }

    setEvents(data || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🔥 ADD NEW EVENT BUTTON */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/addDetails")}
        >
          <Text style={styles.addButtonText}>+ Add New Event</Text>
        </TouchableOpacity>

        {/* EVENTS LIST */}
        {events.length === 0 ? (
          <View style={styles.center}>
            <Text>No upcoming events found.</Text>
          </View>
        ) : (
          events.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.card}
              onPress={() => router.push(`/eventDetails/${event.id}`)}
            >
              <Text style={styles.title}>{event.name}</Text>
              <Text style={styles.text}>
                Date: {new Date(event.event_date).toDateString()}
              </Text>
              <Text style={styles.text}>Guests: {event.guests}</Text>
              <Text style={styles.status}>{event.status}</Text>
            </TouchableOpacity>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
    padding: 15,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  addButton: {
    backgroundColor: "#0B6E4F",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#0B6E4F",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  text: {
    color: "#374151",
  },

  status: {
    marginTop: 6,
    fontWeight: "700",
    color: "#0B6E4F",
  },
});