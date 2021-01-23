import * as React from "react";
import UserResult from "./UserResult";
import data from "../../data/users-mock.json";
import { User } from "../types/User";
import { useMemo } from "react";

interface IResultListProps {
  query: string;
}

const ResultList: React.FunctionComponent<IResultListProps> = ({ query }) => {
  const users: User[] = data;
  const initialList = users.slice(0, 25);
  const queryList = useMemo(
    () =>
      query ? users.filter((u) => u.name.includes(query || "")) : initialList,
    [query]
  );
  return (
    <div id="results-list">
      {queryList.slice(0, 100).map((user) => (
        <UserResult user={user} />
      ))}
    </div>
  );
};

export default ResultList;
