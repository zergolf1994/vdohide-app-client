import { env } from "@/env.mjs";
import { MailtrapClient } from "mailtrap"

const client = new MailtrapClient({ token: env.MAILTRAP_TOKEN });

interface IVariables {
    [key: string]: string | number | boolean
}

type TParams = {
    email: string;
    template_uuid: string;
    template_variables: IVariables
};

export const sendMailTrap = async ({
    email,
    template_uuid,
    template_variables,
}: TParams) =>
    await client.send({
        from: { name: "Mailtrap Test", email: env.MAILTRAP_EMAIL },
        to: [{ email }],
        template_uuid,
        template_variables,
    });

//ทำระบบ ส่งอีเมลื
// const send = await sendMailTrap({
//     email: newUser.email,
//     template_uuid: "b655a4aa-e1c4-477f-8c92-7122036d38b3",
//     template_variables: {
//         "company_name": "Vdohide.com",
//         "user_name": newUser.name,
//         "confirmation_link": verificationUrl
//     }
// })