import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role')
    const viewer = searchParams.get('viewer')
    const type_date = searchParams.get('type_date')
    const start_date = searchParams.get('start_date')
    const end_date = searchParams.get('end_date')
    const authorizationHeader = req.headers.get('Authorization');
    
    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Baerer ${authorizationHeader}`,
    }
    const apiUrl = `${process.env.API_URL}/emails/emails-statistics?role=${role}&viewer=${viewer}&type_date=${type_date}&start_date=${start_date}&end_date=${end_date}`
    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: header,
        next: {
            revalidate: 0
        }
    })

    
    const result = await res.json();
    
    return NextResponse.json(result);
}