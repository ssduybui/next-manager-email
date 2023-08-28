import { NextResponse, NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {

    const authorizationHeader = req.headers.get('Authorization');
    
    const request = await req.json()
    const { action_type, id, domain, name_domain, note } = request;
    const apiUser = `${process.env.API_URL}/emails/update-email`;

    const userInfo = {
        action_type: action_type,
        id: id,
        domain: domain,
        name_domain: name_domain,
        note: note
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
