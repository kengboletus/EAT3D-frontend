// vmSelectionGuard
//
// Ensures a user only shops from one vending machine per session. If the cart
// already contains items from a different VM, it prompts the user to clear the
// cart before switching, then applies the new VM's max product limit and
// navigates to product selection.
import { Alert } from "react-native";

type CartLikeItem = { vmId: string };

type Params = {
  cart: CartLikeItem[];
  vmId: string;
  vmMaxProducts: number;
  setVmLimit: (vmId: string, maxProducts: number) => void;
  clear: () => void;
  navigateToProductSelection: () => void;
};

/**
 * Ensures only one vending machine is used per cart session.
 * If switching to a different VM while the cart has items, asks to clear first.
 */
export function ensureSingleVmSelection({
  cart,
  vmId,
  vmMaxProducts,
  setVmLimit,
  clear,
  navigateToProductSelection,
}: Params) {
  // Empty cart → proceed
  if (!cart || cart.length === 0) {
    setVmLimit(vmId, vmMaxProducts);
    navigateToProductSelection();
    return;
  }

  const existingVmId = cart[0]?.vmId;
  const allSameVm = cart.every((p) => p.vmId === existingVmId);

  // Same VM → proceed
  if (allSameVm && existingVmId === vmId) {
    setVmLimit(vmId, vmMaxProducts);
    navigateToProductSelection();
    return;
  }

  // Different VM → confirm clear and switch
  Alert.alert(
    "Start new selection?",
    "Only one vending machine can be selected each time. Switching machines will clear your current cart.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, clear and switch",
        style: "destructive",
        onPress: () => {
          clear();
          setVmLimit(vmId, vmMaxProducts);
          navigateToProductSelection();
        },
      },
    ]
  );
}


