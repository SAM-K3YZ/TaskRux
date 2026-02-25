import { QuickSettingsProps } from "@/types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuickSettings = ({
  items,
  selected,
  onToggle,
  containerStyle,
}: QuickSettingsProps) => {
  const handlePress = (id: string) => {
    const isSelected = selected.includes(id);
    onToggle(id, !isSelected);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item) => {
        const isSelected = selected.includes(item.id);
        const Icon = item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, isSelected && styles.cardSelected]}
            activeOpacity={0.8}
            onPress={() => handlePress(item.id)}
          >
            {Icon && (
              <Icon
                size={26}
                color="#FF6A00"
                weight={isSelected ? "fill" : "regular"}
              />
            )}

            <Text style={styles.label}>{item.label}</Text>

            {isSelected && (
              <View style={styles.check}>
                <Text style={styles.checkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default QuickSettings;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#FF6A00",
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "relative",
  },
  cardSelected: {
    backgroundColor: "#FFF3EB",
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  check: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: "#FF6A00",
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
