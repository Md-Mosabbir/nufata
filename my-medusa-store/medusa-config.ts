import { loadEnv, defineConfig } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  // plugins: [
  //   {
  //     resolve: 'medusa-plugin-brevo',
  //     options: {
  //       api_key: process.env.BREVO_API_KEY,
  //       from: {
  //         name: "La Place Store",
  //         email: "kmosabbir@gmail.com",
  //       },
  //       template_map: {
  //         "order.placed": 1,
  //       },
  //       events: [
  //         { event: "user.created", template_id: 1, email: "auto" },
  //         { event: "user.updated", template_id: 1, email: "auto" },
  //         { event: "customer.created", template_id: 1, email: "auto" },
  //         { event: "customer.updated", template_id: 1, email: "auto" },
  //         { event: "customer.password_reset", template_id: 1, email: "auto" },
  //         { event: "invite.created", template_id: 1, email: "auto" },
  //         { event: "estock-notification.restocked", template_id: 1, email: "auto" },
  //         { event: "order.placed", template_id: 1, email: "auto", copy_to: "kmosabbir@gmail.com" },
  //         { event: "order.updated", template_id: 1, email: "auto" },
  //         { event: "order.canceled", template_id: 1, email: "auto" },
  //         { event: "order.completed", template_id: 1, email: "auto" },
  //         { event: "order.orders_claimed", template_id: 1, email: "auto" },
  //         { event: "order.refund_created", template_id: 1, email: "auto" },
  //         { event: "order.payment_captured", template_id: 1, email: "auto" },
  //         { event: "order.payment_capture_failed", template_id: 1, email: "auto" },
  //         { event: "claim.shipment_created", template_id: 1, email: "auto" },
  //         { event: "swap.created", template_id: 1, email: "auto" },
  //         { event: "swap.received", template_id: 1, email: "auto" },
  //         { event: "swap.shipment_created", template_id: 1, email: "auto" },
  //         { event: "order.fulfillment_created", template_id: 1, email: "auto" },
  //         { event: "order.fulfillment_canceled", template_id: 1, email: "auto" },
  //         { event: "gift_card.created", template_id: 1, email: "auto" },
  //       ],
  //     },
  //   },
  // ],
  modules: [
    {
      resolve: "./src/modules/brand",
    },
    {

      resolve: "./src/modules/review",

    }
  ],
});
