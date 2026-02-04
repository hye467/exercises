function passcodeFactory() {
  const passcode = Math.round(Math.random() * 100);
  return () => {
    console.log("The passcode is " + passcode);
  };
}

function passcodeCacheFactory() {
  const passcodeCache = new Map();
  return (name) => {
    if (passcodeCache.has(name))
      console.log("The passcode is " + passcodeCache.get(name));
    else {
      const passcode = Math.round(Math.random() * 100);
      passcodeCache.set(name, passcode);
      console.log("The passcode is " + passcode);
    }
  };
}

function main() {
  let passcode = passcodeFactory();
  passcode();
  passcode();
  passcode = passcodeFactory();
  passcode();
  passcode();

  console.log();

  const passcodeCache = passcodeCacheFactory();
  passcodeCache("Peter");
  passcodeCache("Peter");
  passcodeCache("Mary");
  passcodeCache("Mary");
  passcodeCache("Peter");
  passcodeCache("Mary");
}

main();
