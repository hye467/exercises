function sanitizeObject(keys, obj) {
  const sanitized = structuredClone(obj);

  for (const key of keys) {
    if (key in obj) {
      sanitized[key] = "****";
    }
  }

  return sanitized;
}

function deepSanitizeObject(keys, obj) {
  const sanitized = structuredClone(obj);

  for (const key of keys) {
    // Assuming a key to sanitize cannot be an object
    if (key in obj) {
      sanitized[key] = "****";
    }
  }

  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === "object") {
      sanitized[key] = deepSanitizeObject(keys, sanitized[key]);
    }
  }

  return sanitized;
}

function main() {
  const sensitiveKeys = ["password", "creditCard"];
  const inputObject = {
    username: "john_doe",
    password: "supersecret",
    email: "john@example.com",
    creditCard: "1111111111111111",
  };
  console.log(sanitizeObject(sensitiveKeys, inputObject));

  const sensitiveKeys2 = ["cardNumber"];
  const inputObject2 = {
    username: "john_doe",
    password: "supersecret",
    address: {
      street: "123 Main St",
      cardNumber: "4111111111111111",
    },
    orders: [{ paymentMethod: { cardNumber: "4111111111111111" } }],
  };
  console.log(deepSanitizeObject(sensitiveKeys2, inputObject2));
}

main();
