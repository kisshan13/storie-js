import { useEffect, useState } from "react";
import { Storie } from "./storie";

type StorieHook<T> = [value: T, setValue: (val: T) => void];

function useStorie<T>(storie: Storie<T>): StorieHook<T> {
  const [snap, setSnap] = useState<T>(storie.get());
  const [id, setId] = useState(Math.ceil(Math.random() * 100000));

  function set(val: T) {
    storie.set(val);
  }

  useEffect(() => {
    const unsubscribe = storie.subscribe(id, (id, value) => {
      setSnap(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return [snap, set];
}

export default useStorie;
