import {
  SubscriberArgs,
  type SubscriberConfig,
} from "@medusajs/medusa"
import { Modules } from "@medusajs/framework/utils"

export default async function resetPasswordTokenHandler({
  event: {
    data: { entity_id: email, token, actor_type },
  },
  container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION)

  const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  const frontendUrl = process.env.MEDUSA_FRONTEND_URL || "http://localhost:8000"

  const urlPrefix =
    actor_type === "customer"
      ? frontendUrl
      : actor_type === "user"
        ? backendUrl + "/app"
        : frontendUrl

  await notificationModuleService.createNotifications({
    to: email,
    channel: "email",
    template: "reset-password",
    data: {
      resetUrl: `${urlPrefix}/reset-password?token=${token}&email=${email}`,
    },
  })
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}
