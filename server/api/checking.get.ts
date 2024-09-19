import { generateId } from "lucia";

export default defineEventHandler(async (event) => {
  try {
    await useDrizzle()
      .insert(tables.cronJobTable)
      .values({
        id: generateId(15),
      });
  } catch (error: any) {
    console.log(error.message);
  }
});
