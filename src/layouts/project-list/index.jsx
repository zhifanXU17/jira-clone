import { useEffect, useState } from "react";
import qs from "qs";

import SearchPanel from "./SearchPanel";
import List from "./List";
import { cleanObject } from "../../utils";

const api_url = process.env.REACT_APP_API_URL;

const ProjectListLayout = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${api_url}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

  useEffect(() => {
    fetch(`${api_url}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [param]);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListLayout;
