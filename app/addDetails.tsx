import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function AddEvent() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [comments, setComments] = useState("");

  const [totalCost, setTotalCost] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [loading, setLoading] = useState(false);

  function onDateChange(event: any, selectedDate?: Date) {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  }

  async function handleSubmit() {
    if (!name || !guests || !contactName || !contactPhone || !totalCost) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("events").insert([
      {
        name: name.trim(),
        event_date: date.toISOString().split("T")[0], // DATE format

        guests: Number(guests),

        contact_name: contactName.trim(),
        phone: contactPhone.trim(),
        comments: comments.trim(),

        total_cost: Number(totalCost),
        amount_paid: Number(amountPaid || 0),

        status: "pending",
      },
    ]);

    setLoading(false);

    if (error) {
      console.log("Insert error:", error);
      Alert.alert("Error", "Failed to create event");
      return;
    }

    Alert.alert("Success", "Event created successfully");

    // reset
    setName("");
    setGuests("");
    setContactName("");
    setContactPhone("");
    setComments("");
    setTotalCost("");
    setAmountPaid("");
    setDate(new Date());

    router.back();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Event</Text>

      {/* EVENT NAME */}
      <View style={styles.card}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>

      {/* DATE PICKER */}
      <View style={styles.card}>
        <Text style={styles.label}>Event Date</Text>

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateBtn}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      {/* GUESTS */}
      <View style={styles.card}>
        <Text style={styles.label}>Number of Guests</Text>
        <TextInput
          value={guests}
          onChangeText={setGuests}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* CONTACT NAME */}
      <View style={styles.card}>
        <Text style={styles.label}>Contact Person Name</Text>
        <TextInput value={contactName} onChangeText={setContactName} style={styles.input} />
      </View>

      {/* PHONE */}
      <View style={styles.card}>
        <Text style={styles.label}>Contact Phone</Text>
        <TextInput value={contactPhone} onChangeText={setContactPhone} keyboardType="phone-pad" style={styles.input} />
      </View>

      {/* TOTAL COST */}
      <View style={styles.card}>
        <Text style={styles.label}>Total Charge (UGX)</Text>
        <TextInput
          value={totalCost}
          onChangeText={setTotalCost}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* AMOUNT PAID */}
      <View style={styles.card}>
        <Text style={styles.label}>Amount Deposited (UGX)</Text>
        <TextInput
          value={amountPaid}
          onChangeText={setAmountPaid}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* COMMENTS */}
      <View style={styles.card}>
        <Text style={styles.label}>Additional Comments</Text>
        <TextInput
          value={comments}
          onChangeText={setComments}
          multiline
          style={[styles.input, styles.textArea]}
        />
      </View>

      {/* SUBMIT */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Event"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F6F8FA",
    flexGrow: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#0B6E4F",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
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
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  textArea: {
  height: 100,
  textAlignVertical: "top",
},
dateBtn: {
  padding: 12,
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 8,
  backgroundColor: "#FAFAFA",
},
});