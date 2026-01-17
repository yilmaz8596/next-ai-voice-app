import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";

import { db } from "..";
import { eq, sql } from "drizzle-orm";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "a9aa27ce-a3ba-46bd-b185-0d421a28dd8c",
              slug: "beginner",
            },
            {
              productId: "d06706c3-b785-4a89-b7cb-d85620cf5d2e",
              slug: "pro",
            },
            {
              productId: "3d40a70d-cfe9-42a9-8f11-573ae2566fa9",
              slug: "custom",
            },
          ],
          successUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?checkout_id={CHECKOUT_ID}`,
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onPayload: async (payload) => {
            console.log("Received webhook:", payload.type);
          },
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "a9aa27ce-a3ba-46bd-b185-0d421a28dd8c":
                creditsToAdd = 50;
                break;
              case "d06706c3-b785-4a89-b7cb-d85620cf5d2e":
                creditsToAdd = 150;
                break;
              case "3d40a70d-cfe9-42a9-8f11-573ae2566fa9":
                creditsToAdd = 250;
                break;
              default:
                console.log(`Unknown product ID: ${productId}`);
                return;
            }

            try {
              await db
                .update(schema.user)
                .set({
                  credits: sql`${schema.user.credits} + ${creditsToAdd}`,
                })
                .where(eq(schema.user.id, externalCustomerId));

              console.log(
                `Successfully added ${creditsToAdd} credits to user ${externalCustomerId}.`
              );
            } catch (error) {
              console.error("Error updating credits:", error);
            }
          },
        }),
      ],
    }),
  ],
});
