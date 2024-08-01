import jwt from "jsonwebtoken";
import { generateId } from "lucia";
import { createDate, TimeSpan } from "oslo";
import { magicLinkRequest } from "~/server/utils/email/templates/magic-link";

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event);

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      throw createError({
        message: "Invalid email!",
        statusCode: 400,
      });
    }

    // check if user exists
    const user = await useDrizzle().query.userTable.findFirst({
      where: (table) => eq(table.email, email),
    });

    if (user) {
      await useDrizzle()
        .insert(tables.magicLinkTable)
        .values({
          id: generateId(15),
          userId: user.id,
          expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
        });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "10m",
      });

      const url = `${process.env.BASE_URL}/auth/magic-link?token=${token}`;

      const htmlTemplate = magicLinkRequest(url);

      await sendEmail({
        html: htmlTemplate,
        to: email,
        subject: "You've got the magic!",
      });

      return {
        message: `We've sent an email to you at ${email}. It contains a link that will sign you in super quick!`,
      };
    }

    const userId = generateId(15);

    await useDrizzle().insert(tables.userTable).values({
      id: userId,
      email,
    });

    await useDrizzle()
      .insert(tables.magicLinkTable)
      .values({
        id: generateId(15),
        userId,
        expiresAt: createDate(new TimeSpan(10, "m")),
      });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "10m",
    });

    const url = `${process.env.BASE_URL}/auth/magic-link?token=${token}`;

    const htmlTemplate = magicLinkRequest(url);

    await sendEmail({
      html: htmlTemplate,
      to: email,
      subject: "You've got the magic!",
    });

    return {
      message: `We've sent an email to you at ${email}. It contains a link that will sign you in super quick!`,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
