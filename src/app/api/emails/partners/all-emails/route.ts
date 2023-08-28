import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const authorizationHeader = req.headers.get('Authorization');
    const viewer = searchParams.get('viewer')
    const rows = searchParams.get('rows')
    const page = searchParams.get('page')
    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Baerer ${authorizationHeader}`,
    }
    const apiUrl = `${process.env.API_URL}/emails/all-emails-user?viewer=${viewer}&rows=${rows}&page=${page}`
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