import AWS from "aws-sdk"
import { IncomingWebhook, IncomingWebhookSendArguments } from "@slack/webhook"
const SSM = new AWS.SSM()

let cachedWebhookUrl: string | undefined = undefined

export const sendSlackNotification = async (payload: IncomingWebhookSendArguments) => {
  if (typeof cachedWebhookUrl === 'undefined') {
    const parameterResp = await SSM.getParameter({
      Name: `/propid/slack/main`,
      WithDecryption: true
    }).promise()
    cachedWebhookUrl = parameterResp.Parameter?.Value!
  }

  const webhook = new IncomingWebhook(cachedWebhookUrl)
  return webhook.send(payload)
}
