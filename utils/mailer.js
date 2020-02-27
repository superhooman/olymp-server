const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

const getHTML = (data) => {
    let body = ""
    for (let block of data) {
        if (block.type === 'header') {
            body = body + `<tr>
            <td align="left"
                style="font-size:0px;padding:0;padding-bottom:32px;word-break:break-word;">
                <div
                    style="font-family:Arial;font-size:28px;font-weight:700;line-height:35px;text-align:left;color:#000000;">${block.html}</div>
            </td>
        </tr>`
        } else if (block.type === 'block') {
            body = body +
                `<tr>
                <td align="left"
                    style="font-size:0px;padding:0;padding-bottom:16px;word-break:break-word;">
                    <div
                        style="font-family:Arial;font-size:16px;line-height:24px;text-align:left;color:#000000;">${block.html}</div>
                </td>
            </tr>`
        }
    }

    return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <title></title>
        <!--[if !mso]-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style type="text/css">
            #outlook a {
                padding: 0;
            }
    
            .ReadMsgBody {
                width: 100%;
            }
    
            .ExternalClass {
                width: 100%;
            }
    
            .ExternalClass * {
                line-height: 100%;
            }
    
            body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
            }
    
            p {
                display: block;
                margin: 13px 0;
            }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
            @media only screen and (max-width:480px) {
                @-ms-viewport {
                    width: 320px;
                }
    
                @viewport {
                    width: 320px;
                }
            }
        </style>
        <!--<![endif]-->
        <!--[if mso]>        <xml>        <o:OfficeDocumentSettings>          <o:AllowPNG/>          <o:PixelsPerInch>96</o:PixelsPerInch>        </o:OfficeDocumentSettings>        </xml>        <![endif]-->
        <!--[if lte mso 11]>        <style type="text/css">          .outlook-group-fix { width:100% !important; }        </style>        <![endif]-->
        <style type="text/css">
            @media only screen and (min-width:480px) {
                .mj-column-per-50 {
                    width: 50% !important;
                    max-width: 50%;
                }
    
                .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
            }
        </style>
        <style type="text/css"></style>
    </head>
    
    <body style="background-color:#f2f3f5;">
        <div style="background-color:#f2f3f5;">
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:624px;" width="624" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="Margin:0px auto;max-width:624px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                        <tr>
                            <td
                                style="direction:ltr;font-size:0px;padding:64px 32px 32px;text-align:center;vertical-align:top;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="column-50-outlook" style="vertical-align:middle;width:280px;" ><![endif]-->
                                <div class="mj-column-per-50 outlook-group-fix column-50"
                                    style="min-width: 50%; max-width: 50%; font-size: 13px; text-align: left; direction: ltr; display: inline-block; vertical-align: middle; width: 100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                        <tbody>
                                            <tr>
                                                <td style="vertical-align:middle;padding:0;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        width="100%">
                                                        <tr>
                                                            <td align="left"
                                                                style="font-size:0px;padding:0;word-break:break-word;">
                                                                <div
                                                                    style="font-family:Arial;font-size:13px;line-height:1;text-align:left;color:#000000;">
                                                                    <span class="algolia-logo"
                                                                        style="width: auto; height: 32px;"><img align="left"
                                                                            class="algolia-logo"
                                                                            src="http://devel.kz/img/asd.png"
                                                                            alt="logo UpSkill"
                                                                            style="width: auto; height: 32px;"
                                                                            height="32"></span></div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td><td class="column-50-outlook" style="vertical-align:middle;width:280px;" ><![endif]-->
                                <div class="mj-column-per-50 outlook-group-fix column-50"
                                    style="min-width: 50%; max-width: 50%; font-size: 13px; text-align: left; direction: ltr; display: inline-block; vertical-align: middle; width: 100%;">
                                    
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:624px;" width="624" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:624px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="background:#ffffff;background-color:#ffffff;width:100%;">
                    <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:32px 0;text-align:center;vertical-align:top;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="624px" ><![endif]-->
                                <div class="mj-column-per-100 outlook-group-fix"
                                    style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                        <tbody>
                                            <tr>
                                                <td style="vertical-align:top;padding:0 32px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        width="100%">
                                                        ${body}
                                                        </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            <!--[if mso | IE]></td></tr><tr><td class="" width="624px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:624px;" width="624" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                            <div style="Margin:0px auto;max-width:624px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td
                                                style="direction:ltr;font-size:0px;padding:0;text-align:center;vertical-align:top;">
                                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:624px;" ><![endif]-->
                                                <div class="mj-column-per-100 outlook-group-fix"
                                                    style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        role="presentation" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td style="vertical-align:top;padding:0 32px;">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation" width="100%">
                                                                        <tr>
                                                                            <td align="left"
                                                                                style="font-size:0px;padding:0;word-break:break-word;">
                                                                                <div
                                                                                    style="font-family:Arial;font-size:16px;font-style:italic;line-height:24px;text-align:left;color:#000000;">
                                                                                    --</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="left"
                                                                                style="font-size:0px;padding:0;word-break:break-word;">
                                                                                <div
                                                                                    style="font-family:Arial;font-size:16px;font-style:italic;line-height:24px;text-align:left;color:#000000;">
                                                                                    UpSkill</div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if mso | IE]></td></tr></table><![endif]-->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:624px;" width="624" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="Margin:0px auto;max-width:624px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                        <td
                            style="direction:ltr;font-size:0px;padding:34px 32px 46px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="column-100-outlook" style="vertical-align:middle;width:560px;" ><![endif]-->
                            <div class="mj-column-per-100 outlook-group-fix column-100"
                                style="min-width: 100%; max-width: 100%; font-size: 13px; text-align: left; direction: ltr; display: inline-block; vertical-align: middle; width: 100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                        <tr>
                                            <td style="vertical-align:middle;padding:0;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    width="100%">
                                                    <tr>
                                                        <td align="left"
                                                            style="font-size:0px;padding:0;word-break:break-word;">
                                                            <div
                                                                style="font-family:Arial;font-size:13px;line-height:1;text-align:left;color:#000000;">
                                                                <a target="_blank"
                                                                    href="http://devel.kz/"><img
                                                                        align="right" width="48px"
                                                                        src="http://devel.kz/img/logo.png"
                                                                        alt="logo Devel.kz"></a></div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
    </div><br />
</body>

</html>`
}

    /**
    * Send an email
    *
    * @param  {Array} data an array of elements
    * @param  {File} icon svg icon for new category
    * @return {Object} New created category
    */

async function sendEmail(data, subject, to) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_LOGIN,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const html = getHTML(data)

    const text = htmlToText.fromString(html, {
        wordwrap: 130
    });

    let info = await transporter.sendMail({
        from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_LOGIN}>`,
        to,
        subject,
        text,
        html
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail