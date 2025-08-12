/**
 * TopArcHeader
 *
 * Draws a large circle whose top arc is visible within the given height
 * to create a smooth curved header background. Optionally renders a
 * small floating button (e.g., clear icon) aligned to bottom-right.
 */
import React, { ReactNode } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const RADIUS = width * 1.2;          
const DIAMETER = RADIUS * 2.5;

const TopArcHeader: React.FC<{
  color?: string;
  height?: number;         
  buttonLabel?: ReactNode;
  onButtonPress?: () => void;
}> = ({ color = "#FE8335", height = 100, buttonLabel, onButtonPress }) => {
  return (
    <View style={{ height, overflow: "hidden" }}>
      <View
        style={[
          styles.circle,
          {
            width: DIAMETER,
            height: DIAMETER,
            borderRadius: RADIUS,
            backgroundColor: color,
            top: -DIAMETER + height,
          },
        ]}
      />
      {buttonLabel && (
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          {typeof buttonLabel === "string" ? (
            <Text style={styles.buttonLabel}>{buttonLabel}</Text>
          ) : (
            buttonLabel
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopArcHeader;

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    left: -(RADIUS - Dimensions.get("window").width / 2),
  },
    button: {
    position: "absolute",
    bottom: 12,
    right: 24,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonLabel: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
});
