function createPromise(value, time, fail = false) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (fail) rej(value);
      else res(value);
    }, time);
  });
}

Promise.all2 = (promises) => {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) resolve([]);

    const result = [];
    let index = 0;
    let completed = 0;

    for (const promise of promises) {
      const curIndex = index++;

      promise
        .then((value) => {
          result[curIndex] = value;
          if (++completed === promises.length) resolve(result);
        })
        .catch(reject);
    }
  });
};

Promise.allSettled2 = (promises) => {
  return new Promise((resolve) => {
    if (promises.length === 0) resolve([]);

    const result = [];
    let index = 0;
    let completed = 0;

    for (const promise of promises) {
      const curIndex = index++;

      promise
        .then((value) => {
          result[curIndex] = { status: "fulfilled", value };
          if (++completed === promises.length) resolve(result);
        })
        .catch((reason) => {
          result[curIndex] = { status: "rejected", reason };
          if (++completed === promises.length) resolve(result);
        });
    }
  });
};

function main() {
  let promises = [
    createPromise(1, 300),
    createPromise(2, 200),
    createPromise(3, 400),
    createPromise(4, 100),
  ];
  Promise.all2(promises).then((res) => console.log(res));

  promises = [
    createPromise(1, 300),
    createPromise(2, 200, true),
    createPromise(3, 300, true),
    createPromise(4, 100),
  ];
  Promise.all2(promises)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  promises = [
    createPromise(1, 300),
    createPromise(2, 200, true),
    createPromise(3, 300, true),
    createPromise(4, 100),
  ];
  Promise.allSettled2(promises).then((res) => console.log(res));
}

main();
