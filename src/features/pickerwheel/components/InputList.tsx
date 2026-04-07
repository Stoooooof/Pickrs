import { useActionState, useState } from "react";

type InputListProps = {
  users: string[];
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
};

const InputList = ({ users, setUsers }: InputListProps) => {
  const [inputValue, setInputValue] = useState("");
  const updateUsers = (newUser: string) =>
    setUsers((current) => [...current, newUser]);
  const [state, action] = useActionState(setUsers);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <article className="flex w-full max-w-md flex-col items-start gap-4 rounded-lg border p-4 border-neutral-800">
      <form action={}>
        <label htmlFor="input" className="text-white">
          Add User
        </label>
        <input
          id="input"
          type="text"
          className="input input-bordered w-full max-w-xs bg-neutral-800 text-white p-3"
          placeholder="John Doe"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </form>
      <section>
        <ol>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ol>
      </section>
    </article>
  );
};

export default InputList;
