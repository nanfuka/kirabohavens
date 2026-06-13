import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function EventDetails() {
  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchEvent();
  }, [id]);

  async function fetchEvent() {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      console.log("Fetch error:", error);
      setLoading(false);
      return;
    }

    setEvent(data);
    setEditData(data);
    setLoading(false);
  }

  const handleChange = (key: string, value: string) => {
    setEditData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const startEdit = () => {
    setEditData(event);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditData(event);
    setIsEditing(false);
  };

  const saveEdit = async () => {
    // 🚨 IMPORTANT: remove any computed/generated fields
    const {
      balance, // generated column (DO NOT SEND)
      id: _id,
      ...clean
    } = editData;

    const payload = {
      name: clean.name,
      phone: clean.phone,
      event_date: clean.event_date,
      amount_paid: Number(clean.amount_paid),
      total_cost: Number(clean.total_cost),
      comments: clean.comments,
      status: clean.status,
    };

    const { data, error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", Number(id))
      .select()
      .single();

    if (error) {
      console.log("Update error:", error);
      return;
    }

    setEvent(data);
    setEditData(data);
    setIsEditing(false);
  };

  if (loading || !event || !editData) {
    return <Text style={{ padding: 20 }}>Loading event...</Text>;
  }

  // ✅ computed locally (NOT from DB)
  const balance =
    Number(editData.total_cost || 0) -
    Number(editData.amount_paid || 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Event Details</Text>

      {/* STATUS */}
      <View style={styles.card}>
        <Text style={styles.label}>Status</Text>
        {isEditing ? (
          <TextInput
            value={editData.status}
            onChangeText={(t) => handleChange("status", t)}
            style={styles.input}
          />
        ) : (
          <Text style={styles.value}>{event.status?.toUpperCase()}</Text>
        )}
      </View>

      {/* NAME */}
      <View style={styles.card}>
        <Text style={styles.label}>Event Name</Text>
        {isEditing ? (
          <TextInput
            value={editData.name}
            onChangeText={(t) => handleChange("name", t)}
            style={styles.input}
          />
        ) : (
          <Text style={styles.value}>{event.name}</Text>
        )}
      </View>

      {/* PHONE */}
      <View style={styles.card}>
        <Text style={styles.label}>Contact Number</Text>
        {isEditing ? (
          <TextInput
            value={editData.phone}
            onChangeText={(t) => handleChange("phone", t)}
            style={styles.input}
          />
        ) : (
          <Text style={styles.value}>{event.phone}</Text>
        )}
      </View>

      {/* DATE */}
      <View style={styles.card}>
        <Text style={styles.label}>Event Date</Text>
        {isEditing ? (
          <TextInput
            value={editData.event_date}
            onChangeText={(t) => handleChange("event_date", t)}
            style={styles.input}
          />
        ) : (
          <Text style={styles.value}>{event.event_date}</Text>
        )}
      </View>

      {/* AMOUNT PAID */}
      <View style={styles.card}>
        <Text style={styles.label}>Amount Paid</Text>
        {isEditing ? (
          <TextInput
            value={String(editData.amount_paid)}
            onChangeText={(t) => handleChange("amount_paid", t)}
            keyboardType="numeric"
            style={styles.input}
          />
        ) : (
          <Text style={styles.value}>
            UGX {Number(event.amount_paid).toLocaleString()}
          </Text>
        )}
      </View>

      {/* TOTAL COST */}
      <View style={styles.card}>
        <Text style={styles.label}>Total Cost</Text>
        {isEditing ? (
          <TextInput
            value={String(editData.total_cost)}
            onChangeText={(t) => handleChange("total_cost", t)}
            keyboardType="numeric"
            style={styles.input}
          />
        ) : (
          <Text style={styles.value}>
            UGX {Number(event.total_cost).toLocaleString()}
          </Text>
        )}
      </View>

      {/* BALANCE (computed only) */}
      <View style={styles.card}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.value}>
          UGX {balance.toLocaleString()}
        </Text>
      </View>

      {/* COMMENTS */}
      <View style={styles.card}>
        <Text style={styles.label}>Comments</Text>
        {isEditing ? (
          <TextInput
            value={editData.comments}
            onChangeText={(t) => handleChange("comments", t)}
            style={styles.input}
            multiline
          />
        ) : (
          <Text style={styles.value}>{event.comments}</Text>
        )}
      </View>

      {/* BUTTONS */}
      {!isEditing ? (
        <TouchableOpacity style={styles.button} onPress={startEdit}>
          <Text style={styles.buttonText}>Edit Event</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.row}>
          <TouchableOpacity style={styles.saveBtn} onPress={saveEdit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={cancelEdit}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#F6F8FA",
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#0B6E4F",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#0B6E4F",
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  status: {
    color: "#0B6E4F",
  },

  balance: {
    color: "#B91C1C",
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
  },

  button: {
    backgroundColor: "#0B6E4F",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#0B6E4F",
    padding: 14,
    borderRadius: 10,
    marginRight: 5,
    alignItems: "center",
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#B91C1C",
    padding: 14,
    borderRadius: 10,
    marginLeft: 5,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    marginTop: 10,
  },
});