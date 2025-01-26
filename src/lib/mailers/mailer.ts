import { env } from "@/env.mjs";
import { resend } from "./resendClient";

type Params = {
    to: string | string[];
    subject: string;
    text: string;
    html: string;
    from?: string;
};

const mailer_sender = `no-reply <${env.EMAIL_FROM}>`;

export const sendEmail = async ({
    to,
    from = mailer_sender,
    subject,
    text,
    html,
}: Params) =>
    await resend.emails.send({
        from,
        to: Array.isArray(to) ? to : [to],
        text,
        subject,
        html,
    });