import {
  SubscriberArgs,
  type SubscriberConfig,
} from "@medusajs/medusa"
import { Modules } from "@medusajs/framework/utils"

export default async function resetPasswordTokenHandler({
  event: { data: {
    entity_id: email,
    token,
    actor_type,
  } },
  container,
}: SubscriberArgs<{ entity_id: string, token: string, actor_type: string }>) {
  const notificationModuleService = container.resolve(
    Modules.NOTIFICATION
  )

  const urlPrefix = actor_type === "customer"
    ? "http://localhost:8000/"
    : actor_type === "user"
      ? "http://localhost:9000/app/"
      : "http://localhost:8000/"

  await notificationModuleService.createNotifications({
    to: email,
    channel: "email",
    template: "reset-password",
    data: {
      resetUrl: `${urlPrefix}reset-password?token=${token}&email=${email}`,
    },
  })
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}