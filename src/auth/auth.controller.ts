import {Controller, Get, Query} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('/reddit')
    authReddit(@Query('state') state: string, @Query('code') code: string) {
        return this.authService.getRedditTokens(code);
    }

    @Get('/yandex')
    authYandex(@Query('code') code: string) {
        return this.authService.getYandexTokens(code);
    }

    @Get("/github")
    authGithub(@Query('code') code: string) {
        return this.authService.getGithubTokens(code);
    }
}