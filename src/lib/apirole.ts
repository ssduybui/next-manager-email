export async function getRoleUser(userName: string | null | undefined) {
    try {
        const url = `${process.env.API_URL}/users/role`;
        const userInfo = {
            user_name: userName
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo),
        });
        const data = await res.json();
        if (data.statusCode === 200) {
            return data.data;
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}