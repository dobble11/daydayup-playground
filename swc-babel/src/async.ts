async function asyncFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(11);
    }, 2000);
  });
}

export async function done() {
  await asyncFn();
}

export type T = string | number;
