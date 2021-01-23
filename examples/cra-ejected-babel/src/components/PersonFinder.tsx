import React, { ReactElement, useMemo, useState } from "react";
import data from "../../data/users-mock.json";
import { User } from "../types/User";

export default function PersonFinder(): ReactElement {
  const users: User[] = data;

  const [query, setQuery] = useState<string>();

  const queryList = useMemo(
    () => users.filter((u) => u.name.includes(query || "")),
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
          <h3>{user.name}</h3>
        ))}
      </div>
    </div>
  );
}
