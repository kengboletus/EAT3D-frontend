// components/Cart/DoubleArcHeader
/**
 * DoubleArcHeader
 *
 * Stacks two TopArcHeader layers to create a dual-curve header effect.
 * Accepts optional button content that is forwarded to the top layer.
 * Used by multiple screens to provide a playful brand header.
 */
import React, { ReactNode } from "react";
import { View } from "react-native";
import TopArcHeader from "./TopArcHeader";

const DoubleArcHeader: React.FC<{
  primary?: string;          // 深色
  secondary?: string;        // 淺色
  height?: number;           // 露出的最大高度
  buttonLabel?: ReactNode;   // 清空圖示或文字
  onButtonPress?: () => void;
}> = ({
  primary = "#FE8335",
  secondary = "#FFC899",
  height = 100,
  buttonLabel,
  onButtonPress,
}) => {
  return (
    <View style={{ position: "relative", height }}>
      {/* 底層淺色弧線 (高度較大) */}
      <TopArcHeader color={secondary} height={height} />

      {/* 上層深色弧線 (覆蓋在上，稍微矮一點) */}
      <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <TopArcHeader
          color={primary}
          height={height * 0.9}
          buttonLabel={buttonLabel}
          onButtonPress={onButtonPress}
        />
      </View>
    </View>
  );
};

export default DoubleArcHeader;
