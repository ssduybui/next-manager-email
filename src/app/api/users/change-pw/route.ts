import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {
        const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
        const request = await req.json();
        const { userName, currentPassword, newPassword, recaptcha_token } = request.body;
        const authorizationHeader = req.headers.get('Authorization');
        console.log(authorizationHeader);
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptcha_token}`;
        const response = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const recaptchaJson = await response.json();

        if (recaptchaJson.success) {
            const apiRegister = `${process.env.API_URL}/users/change-pw`;
            const userInfo = {
                user_name: userName,
                old_password: currentPassword,
                new_password: newPassword,
            }

            const res = await fetch(apiRegister, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Baerer ${authorizationHeader}`
                },
                body: JSON.stringify(userInfo),
            });

            const resRegister = await res.json();

            return NextResponse.json(resRegister);
        } else {
            return NextResponse.json(400);
        }
    } else {
        return NextResponse.json(500);
    }
}
