import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import { AppError, ErrorCodes } from './error'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendEmail({
  to,
  subject,
  component,
}: {
  to: string
  subject: string
  component: React.ReactElement
}) {
  try {
    const html = render(component)
    const text = render(component, { plainText: true })

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
      text,
    })
  } catch (error) {
    throw new AppError(
      'Failed to send email',
      500,
      ErrorCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const EmailTemplates = {
  WELCOME: 'welcome',
  VERIFY_EMAIL: 'verify-email',
  RESET_PASSWORD: 'reset-password',
  TEAM_INVITE: 'team-invite',
  SUBSCRIPTION_UPDATED: 'subscription-updated',
  SUBSCRIPTION_CANCELED: 'subscription-canceled',
} as const 