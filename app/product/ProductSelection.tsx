/**
 * ProductSelectionScreen
 *
 * Allows users to select multiple products from a vending machine in one go:
 * - Grid shows products with +/− to pick quantities
 * - Floating bottom bar appears when any quantity is selected, showing totals
 * - Tapping the bar opens a bottom sheet with a detailed list of selected items
 * - Confirm adds all selected items into the cart context and navigates to the cart
 */
import { type UnifiedInventoryItem } from "@/assets/dummies/product";
import SplashScreenLoading from "@/components/SplashScreenLoading";
import VMProducts from "@/components/VMProducts";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../../context/cartContext";
import { useAuthFetch } from "../../hooks/useAuthFetch";

const ProductSelectionScreen = ({}) => {
  const router = useRouter();
  const [selection, setSelection] = useState<Record<string, number>>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inventory, setInventory] = useState<UnifiedInventoryItem[]>([]);
  const { addItem } = useCart();
  const authFetch = useAuthFetch();

  const { machineId } = useLocalSearchParams();

  useEffect(() => {
    if (!machineId) {
      console.warn("Machine ID is missing");
    }
  }, [machineId]);

  useEffect(() => {
    // define a fetch function because effect functions can't be async
    const fetchInventory = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const response = await authFetch(`/api/v1/vms/${machineId}/inventory`, {
          method: "GET",
        });
        console.log("API response:", response);
        const { message, data } = response;
        if (!data) {
          setErrorMsg(message || "VMs not found");
          setInventory([]);
          console.log("No data returned:", message);
        } else {
          setInventory(data);
          console.log("Inventory set:", data);
        }
      } catch (error: any) {
        setErrorMsg(
          error.message || "An unexpected error occurred. Please try again."
        );
        setInventory([]);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [authFetch, machineId]); // dependency array

  // Data source: using local dummy products for now; swap to inventory when backend ready
  const products = useMemo<UnifiedInventoryItem[]>(() => {
    // return vendingMachineProducts[machineId as string] || [];
    return inventory; // when backend is ready
  }, [inventory]);

  const getProductKey = (p: UnifiedInventoryItem) => `${p.vmId}::${p.name}`;

  // Increase selection respecting available stock
  const handleIncrease = (p: UnifiedInventoryItem) => {
    const key = getProductKey(p);
    setSelection((prev) => {
      const current = prev[key] || 0;
      const next = Math.min(current + 1, p.quantity);
      return { ...prev, [key]: next };
    });
  };

  // Decrease selection but never below 0
  const handleDecrease = (p: UnifiedInventoryItem) => {
    const key = getProductKey(p);
    setSelection((prev) => {
      const current = prev[key] || 0;
      const next = Math.max(current - 1, 0);
      return { ...prev, [key]: next };
    });
  };

  const { selectedCount, selectedAmount } = useMemo(() => {
    let count = 0;
    let amount = 0;
    for (const p of products) {
      const qty = selection[getProductKey(p)] || 0;
      count += qty;
      amount += qty * p.price;
    }
    return { selectedCount: count, selectedAmount: amount };
  }, [selection, products]);

  // Derived list for the bottom sheet
  const selectedItems = useMemo(
    () =>
      products
        .map((p) => ({ item: p, qty: selection[getProductKey(p)] || 0 }))
        .filter((x) => x.qty > 0),
    [products, selection]
  );

  const bottomVisible = selectedCount > 0;
  const slideAnim = useRef(new Animated.Value(160)).current; // translateY for larger bar
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity

  const SHEET_HEIGHT = Math.round(Dimensions.get("window").height * 0.62);
  const sheetY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: bottomVisible ? 0 : 160,
        duration: 240,
        easing: bottomVisible
          ? Easing.out(Easing.cubic)
          : Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: bottomVisible ? 1 : 0,
        duration: 220,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bottomVisible, slideAnim, fadeAnim]);

  // Animate bottom sheet open/close
  const openSheet = () => {
    setIsSheetOpen(true);
    requestAnimationFrame(() => {
      Animated.timing(sheetY, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  };

  const closeSheet = () => {
    Animated.timing(sheetY, {
      toValue: SHEET_HEIGHT,
      duration: 220,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setIsSheetOpen(false);
    });
  };

  // Commit the selection into the cart context and go to cart
  const handleAddToCart = () => {
    // Add selected quantities into cart
    for (const p of products) {
      const qty = selection[getProductKey(p)] || 0;
      if (qty > 0) {
        for (let i = 0; i < qty; i += 1) {
          addItem(p);
        }
      }
    }
    setSelection({});
    router.push("/(eshop)/cart");
  };

  if (loading) {
    return <SplashScreenLoading />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Select Product</Text>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {errorMsg && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
          {errorMsg}
        </Text>
      )}

      <FlatList
        // Change to inventory when backend is ready
        data={products}
        //data={inventory}
        numColumns={3}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMProducts
            name={item.name}
            image={item.image}
            available={item.quantity > 0}
            price={item.price}
            quantity={selection[getProductKey(item)] || 0}
            onIncrease={() => handleIncrease(item)}
            onDecrease={() => handleDecrease(item)}
          />
        )}
        contentContainerStyle={{ paddingBottom: bottomVisible ? 240 : 20 }}
      />

      {/* Floating bottom bar (浮窗效果) */}
      <Animated.View
        pointerEvents={bottomVisible ? "auto" : "none"}
        style={[
          styles.floatingBar,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.floatingLeftTouchable}
          activeOpacity={0.85}
          onPress={openSheet}
        >
          <View style={styles.floatingLeft}>
            <Text style={styles.floatingTitle}>Selected</Text>
            <Text style={styles.floatingMeta}>
              {selectedCount} item(s) · HK$ {selectedAmount.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatingCTA} onPress={handleAddToCart}>
          <Ionicons name="cart" size={18} color="#fff" />
          <Text style={styles.floatingCTAText}>Add to Cart</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Sheet with selected products */}
      <Modal
        visible={isSheetOpen}
        transparent
        onRequestClose={closeSheet}
        animationType="none"
      >
        <Pressable style={styles.sheetOverlay} onPress={closeSheet} />
        <Animated.View
          style={[
            styles.sheetContainer,
            { transform: [{ translateY: sheetY }] },
          ]}
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Selected Items</Text>
            <TouchableOpacity
              onPress={closeSheet}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={22} color="#585858" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={selectedItems}
            keyExtractor={(it) => getProductKey(it.item)}
            renderItem={({ item }) => (
              <View style={styles.sheetRow}>
                <Image
                  source={{ uri: item.item.image }}
                  style={styles.sheetImage}
                />
                <View style={styles.sheetInfo}>
                  <Text style={styles.sheetName} numberOfLines={1}>
                    {item.item.name}
                  </Text>
                  <Text style={styles.sheetPrice}>
                    HK$ {item.item.price.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.sheetQtyControls}>
                  <TouchableOpacity
                    style={styles.sheetQtyBtn}
                    onPress={() => handleDecrease(item.item)}
                  >
                    <Entypo name="minus" size={16} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.sheetQtyText}>
                    {String(item.qty).padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    style={styles.sheetQtyBtn}
                    onPress={() => handleIncrease(item.item)}
                  >
                    <Entypo name="plus" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.sheetEmpty}>尚未選擇商品</Text>
            }
            contentContainerStyle={{ paddingBottom: 16 }}
          />

          <View style={styles.sheetFooter}>
            <View>
              <Text style={styles.sheetFooterTitle}>Total</Text>
              <Text style={styles.sheetFooterMeta}>
                {selectedCount} item(s) · HK$ {selectedAmount.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.sheetCTA}
              onPress={() => {
                closeSheet();
                handleAddToCart();
              }}
            >
              <Text style={styles.sheetCTAText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
    backgroundColor: "#FE8335",
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    textAlignVertical: "center",
  },
  cancelBtn: {
    position: "absolute",
    top: 45,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelText: {
    color: "#585858",
    fontWeight: "bold",
    fontSize: 16,
  },
  floatingBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 36,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 1,
  },
  floatingLeftTouchable: { flex: 1, marginRight: 12 },
  floatingLeft: {},
  floatingTitle: {
    color: "rgba(52, 51, 49, 0.79)",
    fontSize: 13,
    marginBottom: 4,
    fontWeight: "600",
  },
  floatingMeta: { color: "#000", fontSize: 17, fontWeight: "700" },
  floatingCTA: {
    backgroundColor: "#FE8335",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  floatingCTAText: {
    color: "#fff",
    fontWeight: "900",
    marginLeft: 6,
    fontSize: 17,
  },

  // Sheet styles
  sheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheetContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  sheetTitle: { fontSize: 16, fontWeight: "700", color: "#585858" },
  sheetRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  sheetImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#EEE",
  },
  sheetInfo: { flex: 1, marginLeft: 12 },
  sheetName: { fontSize: 15, fontWeight: "600", color: "#222" },
  sheetPrice: { marginTop: 4, color: "#585858", fontWeight: "600" },
  sheetQtyControls: { flexDirection: "row", alignItems: "center" },
  sheetQtyBtn: {
    backgroundColor: "#78BE21",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sheetQtyText: {
    width: 28,
    textAlign: "center",
    fontWeight: "800",
    color: "#333",
  },
  sheetEmpty: { textAlign: "center", color: "#9CA3AF", paddingVertical: 24 },
  sheetFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  sheetFooterTitle: { color: "#9CA3AF", fontSize: 12, marginBottom: 2 },
  sheetFooterMeta: { color: "#111827", fontSize: 16, fontWeight: "800" },
  sheetCTA: {
    backgroundColor: "#FE8335",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  sheetCTAText: { color: "#fff", fontWeight: "900", fontSize: 16 },
});

export default ProductSelectionScreen;
