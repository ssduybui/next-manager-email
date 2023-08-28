import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {
        const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
        const request = await req.json();
        const { userName, userPassword, recaptcha_token } = request.body;
        
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptcha_token}`;
        const response = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const recaptchaJson = await response.json();
        
        if (recaptchaJson.success) {
            const apiRegister = `${process.env.API_URL}/users/login`;
            const userInfo = {
                user_name: userName,
                user_password: userPassword,
            }
            
            const res = await fetch(apiRegister, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
