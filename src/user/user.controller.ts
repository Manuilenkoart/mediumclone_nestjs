import { User } from "@app/decorators/user.decorator";
import { AuthGuard } from "@app/guards/auth.guard";
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";
import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUsert(@Body("user") createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    // убрать "user" из @Body если не нужна деструкторизация 
     
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buidUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto);
        return this.userService.buidUserResponse(user)
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(
        @Req() request: ExpressRequestInterface,
        @User() user: UserEntity): Promise<UserResponseInterface> {
        
        return this.userService.buidUserResponse(user)
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateCurrentUser(@User('id') currentUserId: number, @Body('user') updateUserDto: UpdateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(currentUserId, updateUserDto);
        return this.userService.buidUserResponse(user)
    }
}