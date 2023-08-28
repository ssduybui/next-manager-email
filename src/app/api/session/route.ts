import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
    const authorizationHeader = req.headers.get('Authorization');
    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${authorizationHeader}`,
    }

    const API_URL = `${process.env.API_URL}/auth/signin`
    const res = await fetch(API_URL, {
        method: 'GET',
        headers: header,
    })

    const data = await res.json();

    if (data.statusCode !== 200) {
        throw new Error(data.message);
    }
    
    return NextResponse.json(data);
}