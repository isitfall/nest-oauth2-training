import {Injectable} from "@nestjs/common";
import {encodeToUrlEncoded} from "./auth.helper";

@Injectable()
export class AuthService {
    async getRedditTokens(code: string) {
        const encodedHeader = btoa(`${process.env.REDDIT_FETCHER_APP_CLIENT_ID}:${process.env.REDDIT_FETCHER_APP_SECRET}`);

        const retrieveToken = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            body: encodeToUrlEncoded({
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.REDDIT_FETCHER_APP_REDIRECT_URI
            }),
            headers: {Authorization: `Basic ${encodedHeader}`, 'Content-Type': 'application/x-www-form-urlencoded'}
        })

        const bodyRetrieve = await retrieveToken.json();

        return bodyRetrieve;
    }

    async getYandexTokens(code: string) {
        const encodedHeader = btoa(`${process.env.YANDEX_APP_CLIENT_ID}:${process.env.YANDEX_APP_SECRET}`);


        const tokensRequest = await fetch('https://oauth.yandex.ru/token', {
            method: 'POST',
            body: encodeToUrlEncoded({code, grant_type: 'authorization_code'}),
            headers: {Authorization: `Basic ${encodedHeader}`, 'Content-type': 'application/x-www-form-urlencoded'}
        });

        const tokensResponse = await tokensRequest.json();

        return tokensResponse;
    }

    async getGithubTokens(code: string) {
        const tokensRequest = await fetch('https://github.com/login/oauth/access_token\n', {
            method: 'POST',
            body: encodeToUrlEncoded({
                code,
                client_id: process.env.GITHUB_APP_CLIENT_ID,
                client_secret: process.env.GIRHUB_APP_SECRET,
                redirect_uri: process.env.GITHUB_APP_REDIRECT_URI,
            }),
            headers: {'Content-type': 'application/x-www-form-urlencoded', Accept: 'application/json'}
        });

        const tokensResponse = await tokensRequest.json();

        return tokensResponse;
    }
}