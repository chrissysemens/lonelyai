export const converters = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (data: FirebaseFirestore.DocumentData) => data.data() as T,
});

