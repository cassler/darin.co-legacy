import React, { ReactElement, useMemo, useState } from "react";
import data from "../../data/users-mock.json";
import { User } from "../types/User";
import UserResult from "./UserResult";

export default function PersonFinder(): ReactElement {
  const users: User[] = data;
  const [query, setQuery] = useState<string>("");
  const initialList = users.slice(0, 25);
  const queryList = useMemo(
    () =>
      query ? users.filter((u) => u.name.includes(query || "")) : initialList,
    [query]
  );

  return (
    <div>
      <input
        type="text"
        onChange={(evt) => setQuery(evt.target.value)}
        defaultValue={query}
        placeholder="Type a name..."
      />
      {queryList.length}
      <div id="results-list">
        {queryList.slice(0, 100).map((user) => (
          <UserResult user={user} />
        ))}
      </div>
    </div>
  );
}
