import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const authorizationHeader = req.headers.get('Authorization');
    const { searchParams } = new URL(req.url)
    const rows = searchParams.get('rows')
    const page = searchParams.get('page')
    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Baerer ${authorizationHeader}`,
    }

    const apiUrl = `${process.env.API_URL}/emails/all-emails?rows=${rows}&page=${page}`
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