import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserToUpdateDto } from './dto/userToUpdate.dto';

@Injectable()
export class UsersService {

    constructor(@Inject('USER_REPOSITORY') private readonly userRepository: typeof User) { }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }

    async getAllFav(): Promise<User[]> {
        return await this.userRepository.findAll<User>({where: { favorites: true } })
    }

    async update(id: number, userToUpdate: UserToUpdateDto) {
        const [numberOfAffectedRows, [updatedUser]] = await this.userRepository.update({ ...userToUpdate }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedUser };

    }
}