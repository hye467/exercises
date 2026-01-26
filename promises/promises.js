function createPromise(fail = false, opts) {
  if (!opts) opts = { failMsg: "reject", value: "resolve" };

  return new Promise((res, rej) => {
    setTimeout(
      () => {
        if (fail) rej(opts.failMsg);
        else res(opts.value);
      },
      Math.round(Math.random() * 1000)
    );
  });
}

async function createPromiseWithCatch(fail = false, opts) {
  return createPromise(fail, opts).catch((error) =>
    console.log("caught promise with error: " + error)
  );
}

function main() {
  Promise.all([
    createPromise(),
    createPromise(true, { failMsg: "failed!" }),
    createPromise(true),
    createPromise(),
    createPromise(),
  ])
    .then((result) => console.log(result))
    .catch((error) => console.log("Promise.all() error: " + error));

  Promise.all([
    createPromiseWithCatch(),
    createPromiseWithCatch(true, { failMsg: "failed!" }),
    createPromise(true).catch((error) => {
      console.log("caught promise with error: " + error);
      return 5;
    }),
    createPromiseWithCatch(),
    createPromiseWithCatch(),
  ]).then((result) => console.log(result));
}

main();
