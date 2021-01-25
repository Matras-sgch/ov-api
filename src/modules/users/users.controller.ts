import { Body, Controller, Get, NotFoundException, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JWTAuthGuard } from 'src/core/guards/jwtAuth.guard';
import { editFileName, imageFileFilter } from '../../utils/file.upload.utils';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserToUpdateDto } from './dto/userToUpdate.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('/avatar')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseGuards(JWTAuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './public/avatars',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFilePath(@UploadedFile() file, @Req() req) {
        let user = await this.userService.findOneById(req.user.id)
        user.avatar = file.filename
        await user.save({ fields: ['avatar'] });
        return `avatars/${file.filename}`;
    }

    @UseGuards(JWTAuthGuard)
    @Get('avatar/:image')
    getImage(@Param('image') image: string, @Res() res) {
        res.setHeader('Content-Type', 'image/jpeg');
        res.sendFile(image, { root: './public/avatars' });
    }

    @UseGuards(JWTAuthGuard)
    @ApiBearerAuth()
    @Get('statistics/:email')
    async getStatistics(@Param('email') email: string): Promise<boolean> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return false;
        }
        return true;
    }

    @UseGuards(JWTAuthGuard)
    @ApiBearerAuth()
    @Get('favorites')
    async getAllFav(): Promise<User[]> {
        return await this.userService.getAllFav()
    }

    @UseGuards(JWTAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    async update(@Param('id') id: number, @Body() userToUpdate: UserToUpdateDto): Promise<User> {
        // get the number of row affected and the updated user
        const { numberOfAffectedRows, updatedUser } = await this.userService.update(id, userToUpdate);

        // if the number of row affected is zero, 
        // it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This User doesn\'t exist');
        }
        return updatedUser;
    }

}

