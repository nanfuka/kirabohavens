// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });



import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";


interface Event {
  id: number;
  name: string;
  event_date: string;
  guests: number;
  status: string;
}
export default function HomeScreen({ navigation }: any) {
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [pastCount, setPastCount] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  async function fetchDashboardData() {
    const now = new Date().toISOString();

    // 🔵 UPCOMING EVENTS
    const { data: upcoming } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending")
      .order("event_date", { ascending: false });








    // 🔴 PAST EVENTS
    const { data: past } = await supabase
      .from("events")
      .select("*")
      .eq("status", "done")
      .order("event_date", { ascending: false });

    setUpcomingEvents(upcoming || []);
    setPastEvents(past || []);

    setUpcomingCount(upcoming?.length || 0);
    setPastCount(past?.length || 0);
  }



  async function fetchPendingEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending")
      .order("event_date", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      console.log("ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", data.length)
      setUpcomingCount(data.length);
    }

    
  }

  //   useEffect(() => {
  //   fetchPendingEvents();

  // }, []);

    async function fetchDoneEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "done")
      .order("event_date", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setPastCount(data.length);
    }

    
  }

    useEffect(() => {
    fetchDoneEvents();
    fetchPendingEvents()
  }, [pastCount, upcomingCount]);
      
    console.log("theeeeeee upcome ishhhhhhhhhhhhhhhhhhhhhhhhh", events)


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
            value="UGX 6"
            onPress={() => router.push("/PerformanceScreen")}
          />

          <Card
            title="Upcoming Events"
            value={String(upcomingCount)}
            onPress={() => router.push("/UpcomingEvents")}
          />

          <Card
            title="Events Held"
            value={String(pastCount)}
            onPress={() => router.push("/PreviousEvents")}
          />

          <Card
            title="Stock Items"
            value="154"
            onPress={() => router.push("/InventoryScreen")}
          />

        </View>

        {/* PERFORMANCE */}
        <Section
          title="Monthly Performance"
          onPress={() => router.push("/PerformanceScreen")}
        >
          <GraphBox label="Revenue & Events Trend" />
        </Section>

        {/* CALENDAR */}
        <Section
          title="Booking Calendar"
          onPress={() => router.push("/CalendarScreen")}
        >
          <GraphBox label="Booked Dates Overview" />
        </Section>

        {/* UPCOMING EVENTS */}
        <Section
          title="Upcoming Events"
          onPress={() => router.push("/UpcomingEvents")}
        >
          <ListItem text="Wedding Reception - 18 Jun" />
          <ListItem text="Corporate Meeting - 21 Jun" />
          <ListItem text="Birthday Party - 25 Jun" />
        </Section>

        {/* PREVIOUS EVENTS */}
        <Section
          title="Previous Events"
          onPress={() => router.push("/PreviousEvents")}
        >
          <ListItem text="Graduation Party - Completed" />
          <ListItem text="Baby Shower - Completed" />
        </Section>

        {/* INVENTORY */}
        <Section
          title="Current Stock"
          onPress={() => router.push("/InventoryScreen")}
        >
          <ListItem text="Chairs - 120" />
          <ListItem text="Tables - 25" />
          <ListItem text="Tents - 8" />
        </Section>

        {/* PENDING PURCHASES */}
        <Section
          title="Pending Purchases"
        // onPress={() => router.push("/PendingPurchases")}
        >
          <ListItem text="Sofas - 3 needed" />
          <ListItem text="Flowers - 50 needed" />
          <ListItem text="Curtains - 8 needed" />
        </Section>

        {/* CARETAKER */}
        <TouchableOpacity
          style={styles.caretaker}
          onPress={() => navigation.navigate("CaretakerDetails")}
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