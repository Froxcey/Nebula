// TODO: Implement logic

import { getDatabase } from ".";
import { TableDefinition, TypeOfDefinition } from "./types";

const tableDefinition = {
  name: "levelRewards",
  definition: {
    guild: "INTEGER",
    role: "INTEGER",
    level: "INTEGER",
  },
} satisfies TableDefinition;

const database = getDatabase(tableDefinition);

const getQuery = database.query("SELECT * FROM levelRewards WHERE guild = $1;");
export function get(guildID: string) {
  return getQuery.all(guildID) as TypeOfDefinition<typeof tableDefinition>[];
}

const addQuery = database.query(
  "INSERT INTO levelRewards (guild, role, level) VALUES (?1, ?2, ?3);",
);
export function add(guildID: string, role: number | string, level: number) {
  return addQuery.all(guildID, level, role) as TypeOfDefinition<
    typeof tableDefinition
  >[];
}

const updateQuery = database.query(
  "UPDATE levelRewards SET level = $3 WHERE guild = $1 AND role = $2",
);
export function updateLevel(
  guildID: string,
  role: number | string,
  level: number,
) {
  updateQuery.run(guildID, role, level);
}

const removeQuery = database.query(
  "DELETE FROM levelRewards WHERE guild = $1 AND role = $2",
);
export function remove(guildID: number | string, role: number | string) {
  removeQuery.run(guildID, role);
}
