import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

// Dynamic colors for better UI
const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33FFF2", "#FFD700", "#FF8C00"];

// Diet Data
const dietData: { [key: string]: string } = {
  "2025-03-24": "🍽️ Breakfast: Oats with banana & almonds\n🥗 Lunch: Grilled chicken with quinoa salad\n🍽️ Dinner: Baked salmon with steamed veggies",
  "2025-03-25": "🍽️ Breakfast: Scrambled eggs with whole wheat toast\n🥗 Lunch: Lentil soup with mixed greens\n🍽️ Dinner: Stir-fried tofu with brown rice",
  "2025-03-26": "🍽️ Breakfast: Greek yogurt with berries & chia seeds\n🥗 Lunch: Chickpea salad with feta & olives\n🍽️ Dinner: Grilled shrimp with sweet potato mash",
  "2025-03-27": "🍽️ Breakfast: Smoothie (spinach, banana, protein powder)\n🥗 Lunch: Turkey wrap with hummus & veggies\n🍽️ Dinner: Baked cod with roasted Brussels sprouts",
  "2025-03-28": "🍽️ Breakfast: Avocado toast with poached egg\n🥗 Lunch: Quinoa bowl with roasted vegetables\n🍽️ Dinner: Grilled steak with asparagus & quinoa",
  "2025-03-29": "🍽️ Breakfast: Cottage cheese with walnuts & honey\n🥗 Lunch: Asian-style tofu stir-fry\n🍽️ Dinner: Spaghetti with lean turkey meatballs",
  "2025-03-30": "🍽️ Breakfast: Pancakes (oats & banana-based)\n🥗 Lunch: Grilled chicken Caesar salad\n🍽️ Dinner: Mushroom risotto with a side of green beans",
  "2025-03-31": "🍽️ Breakfast: Veggie omelet with whole-grain toast\n🥗 Lunch: Sushi rolls with miso soup\n🍽️ Dinner: Spicy chickpea curry with basmati rice",
  "2025-04-01": "🍽️ Breakfast: Chia pudding with mango\n🥗 Lunch: Grilled salmon with couscous & greens\n🍽️ Dinner: Mediterranean lentil stew",
};

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState<string>("#FF5733"); // Default color

  // Handle user tapping on a date
  const handleDayPress = (day: DateData): void => {
    setSelectedDate(day.dateString);
    setThemeColor(colors[Math.floor(Math.random() * colors.length)]); // Random color

    // Fetch diet for the selected date
    const dietPlan = dietData[day.dateString] || "No diet plan available for this date.";

    // Show Alert with the diet plan
    Alert.alert("Today's Goal", `📅 Date: ${day.dateString}\n\n${dietPlan}`);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColor }]}>📆 Diet Calendar</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: themeColor } } : {}}
        theme={{
          todayTextColor: themeColor,
          arrowColor: themeColor,
          selectedDayBackgroundColor: themeColor,
          selectedDayTextColor: "#fff",
        }}
      />

      {/* Show selected date in a text box */}
      {selectedDate && (
        <View style={[styles.textBox, { borderColor: themeColor }]}>
          <Text style={[styles.textBoxTitle, { color: themeColor }]}>📅 Selected Date: {selectedDate}</Text>
          <Text style={styles.textBoxText}>{dietData[selectedDate] || "No diet plan available."}</Text>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  textBox: { padding: 15, marginTop: 20, borderWidth: 2, borderRadius: 10, backgroundColor: "#fff" },
  textBoxTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5, textAlign: "center" },
  textBoxText: { fontSize: 16, textAlign: "center" },
});

export default App;
