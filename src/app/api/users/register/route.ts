import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {
        const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
        const request = await req.json();
        const { userName, userFullName, selectRole, tokenUser, recaptcha_token } = request.body;
        
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptcha_token}`;
        const response = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const recaptchaJson = await response.json();
        
        if (recaptchaJson.success) {
            const apiRegister = `${process.env.API_URL}/users/register`;

            const header = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Baerer ${tokenUser}`,
            }
            const userInfo = {
                user_name: userName,
                user_fullname: userFullName,
                user_role: selectRole,
            }
            
            const res = await fetch(apiRegister, {
                method: 'POST',
                headers: header,
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
