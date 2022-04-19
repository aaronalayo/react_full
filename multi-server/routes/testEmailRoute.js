import {sendEmail } from'../util/sendEMail';

export const testEmailRoute = {
    path: '/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to:'editoraaron@gmail.com',
                from:'aaron.aa@me.com',
                subject:'Does this work?',
                text:'If you are reading this.. it works'
            });
            res.sendStatus(200);
        } catch (e) {
            console.log(e.response.body);
            res.sendStatus(500);
        }
    }
}