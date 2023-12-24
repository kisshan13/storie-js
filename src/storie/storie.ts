export type Store = Record<string, any>;
export type Callback<T> = (id: number, value: T) => void;

export interface Storie<T> {
  subscribe: (id: number, callback: Callback<T>) => () => void;
  get: () => T;
  set: (value: T) => void;
}

function createStore<T extends Record<string, any>>(info: T) {
  let globalState = info;
  let subscriber: { id: number; callback: Callback<T> }[] = [];

  function subscribe(id: number, callback: Callback<T>) {
    subscriber.push({ id, callback });

    return () => {
      subscriber = subscriber.filter((sub) => sub.id !== id);
    };
  }

  function set(value: T) {
    globalState = value;
    subscriber.forEach(({ id, callback }) => {
      callback(id, value);
    });
  }

  function get() {
    return globalState;
  }

  return {
    subscribe,
    get,
    set,
  };
}

// const createStore<T> = (info: Store): Storie => {
//   let globalState = info;
//   let subscriber: { id: number; callback: Callback }[] = [];

//   function subscribe(id: number, callback: Callback) {
//     subscriber.push({ id, callback });

//     return () => {
//       subscriber = subscriber.filter((sub) => sub.id !== id);
//     };
//   }

//   function set(value: Store) {
//     globalState = value;
//     subscriber.forEach(({ id, callback }) => {
//       callback(id, value);
//     });
//   }

//   function get() {
//     return globalState;
//   }

//   return {
//     subscribe,
//     get,
//     set,
//   };
// };

export default createStore;
