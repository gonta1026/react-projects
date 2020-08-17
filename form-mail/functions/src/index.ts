import * as functions from 'firebase-functions';
import {createTransport} from 'nodemailer';
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().admin.email;

// 送信に使用するメールサーバーの設定
const mailTransport = createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// 管理者用のメールテンプレート
const adminContents = (data: any) => {
  return `以下内容でアプルよりお問い合わせを受けました。
    お名前：
    ${data.name}

    メールアドレス：
    ${data.email}

    内容：
    ${data.content}
  `;
};

export const sendMail = functions.https.onCall(async (data, context) => {
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: adminEmail,
    subject: "ホームページお問い合わせ",
    text: adminContents(data)
  };

  // 管理者へのメール送信
  try {
    await mailTransport.sendMail(adminMail);
    console.log(`New subscription confirmation email sent to:`);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
});
