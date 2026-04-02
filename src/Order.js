let currentState = welcoming;

let order = {
  item: "",
  size: "",
  toppings: [],
  drink: ""
};

// MENU (2 items minimum)
const menu = {
  sandwich: {
    sizes: ["small", "large"],
    toppings: ["cheese", "lettuce", "tomato"]
  },
  soup: {
    sizes: ["cup", "bowl"],
    toppings: ["crackers", "herbs"]
  }
};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput() {
  currentState = welcoming;
  order = {
    item: "",
    size: "",
    toppings: [],
    drink: ""
  };
}

/* ---------------- STATES ---------------- */

function welcoming() {
  let aReturn = [];
  currentState = selectItem;

  aReturn.push("Welcome to Hot Off the Press Cafe!");
  aReturn.push("Menu: sandwich, soup");
  aReturn.push("What would you like to order?");

  return aReturn;
}

function selectItem(sInput) {
  let aReturn = [];
  let item = sInput.toLowerCase();

  if (!menu[item]) {
    aReturn.push("Invalid item. Please choose: sandwich or soup.");
    return aReturn;
  }

  order.item = item;
  currentState = selectSize;

  aReturn.push(`You selected: ${item}.`);
  aReturn.push(`Available sizes: ${menu[item].sizes.join(", ")}`);
  aReturn.push("Please choose a size:");

  return aReturn;
}

function selectSize(sInput) {
  let aReturn = [];
  let size = sInput.toLowerCase();

  if (!menu[order.item].sizes.includes(size)) {
    aReturn.push(`Invalid size. Choose: ${menu[order.item].sizes.join(", ")}`);
    return aReturn;
  }

  order.size = size;
  currentState = selectToppings;

  aReturn.push(`Size selected: ${size}`);
  aReturn.push(`Available toppings: ${menu[order.item].toppings.join(", ")}`);
  aReturn.push("Enter toppings separated by commas (or type 'none'):");

  return aReturn;
}

function selectToppings(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase() !== "none") {
    order.toppings = sInput.split(",").map(t => t.trim().toLowerCase());
  }

  currentState = upsellDrink;

  aReturn.push(`Toppings added: ${order.toppings.length ? order.toppings.join(", ") : "none"}`);
  aReturn.push("Would you like to add a drink? (yes/no)");

  return aReturn;
}

function upsellDrink(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase().startsWith("y")) {
    order.drink = "drink added";
    aReturn.push("Great! A drink has been added to your order.");
  } else {
    aReturn.push("No drink added.");
  }

  currentState = confirmOrder;

  aReturn.push("Confirm your order? (yes/no)");
  aReturn.push(
    `Order summary: ${order.item} (${order.size}) with ${
      order.toppings.length ? order.toppings.join(", ") : "no toppings"
    }`
  );

  return aReturn;
}

function confirmOrder(sInput) {
  let aReturn = [];
  currentState = welcoming;

  if (sInput.toLowerCase().startsWith("y")) {
    let d = new Date();
    d.setMinutes(d.getMinutes() + 20);

    aReturn.push("Your order has been placed!");
    aReturn.push(
      `Order: ${order.item} (${order.size})`
    );
    aReturn.push(`Pickup in ~20 minutes.`);
    aReturn.push(`Pickup before ${d.toTimeString()}`);
  } else {
    aReturn.push("Order cancelled.");
    aReturn.push("Restarting order...");
  }

  return aReturn;
}