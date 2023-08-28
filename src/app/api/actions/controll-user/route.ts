import { NextResponse, NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
    const authorizationHeader = req.headers.get('Authorization');
    
    const request = await req.json()
    const { action_type, user_name } = request;
    const apiUser = `${process.env.API_URL}/users/controll-user`;

    const userInfo = {
        action_type: action_type,
        user_name: user_name,
    };

    const res = await fetch(apiUser, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Baerer ${authorizationHeader}`
        },
        body: JSON.stringify(userInfo),
    });

    const result = await res.json();
    return NextResponse.json(result);
}
