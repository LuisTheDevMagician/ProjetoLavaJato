import {getCookie} from 'cookies-next';

export  async function getCookieClient() {
    const token = await getCookie("token");

    return token;
}