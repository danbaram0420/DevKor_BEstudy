import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule} from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        UserModule,
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}//auth module은 user module과 jwt module을 import함. auth controller와 auth service를 제공함.