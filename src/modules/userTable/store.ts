import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
}

interface UsersState {
  users: User[];
  isLoading: boolean;
  errors: string[];
  addUser: (username: string) => void;
  fetchUsers: () => Promise<void>;
}

// пример каррирования: вызываем ф-ю create, в неё ничего не передаём  и вызываем ещё раз,
// куда передаём ф-ю immer, в которую передаём ф-ю, которая возвращает объект
// Это необходимо для корректной работы ts

// оборачиваем в devtools, чтобы можно было использовать redux devtools в браузере

// оборачиваем в persist, чтобы сохранять состояние в localStorage
// важно при изменении д-х в стейте, менять версию, иначе не будет работать

const useUserStore = create<UsersState>()(
  persist(
    devtools(
      immer((set) => ({
        users: [],
        isLoading: false,
        errors: [],
        addUser: (username: string) => {
          set((state) => {
            state.users.push({ id: Date.now(), username });
          });
        },

        fetchUsers: async () => {
          const result = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          const users = (await result.json()) as User[];
          console.log("users", users);
          set({ users });
        },
      }))
    ),
    { name: "userStore", version: 1 }
  )
);
export default useUserStore;
