import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: any) {
  const { name, email, message } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: email,
      to: 'nsam7655@gmail.com',
      subject: 'Письмо с сайте Trendy Store',
      react: `
        <h3>Сообщение от ${ name }</h3>
        <p>${ message }</p>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer'

// export async function POST(request: any) {
//   const { name, email, message } = await request.json();

//   const transporter = nodemailer.createTransport({
//     host: "connect.smtp.bz",
//     port: 587,
//     secure: false,
//     auth: {
//       user: 'nsam7655@gmail.com',
//       pass: '4fx2qwLbkPtb',
//     }
//   })

//   const mailOption = {
//     from: 'n-samoilov@mail.ru',
//     to: "nsam7655@gmail.com",
//     subject: "Письмо с сайта",
//     html: `
//         <h3>Привет, Никита</h3>
//         <li> title: ${ name }</li>
//         <li> title: ${ email }</li>
//         <li> message: ${ message }</li>
//         `
//   }

//   console.log('Подключено')

//   try {
//     await transporter.sendMail(mailOption);
//     return NextResponse.json({ message: "Письмо отправлено" }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ message: "Ошибка отправки письма" }, { status: 500 })
//   }
// }