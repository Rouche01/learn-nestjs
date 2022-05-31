import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    // return 'Editing new user';
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists)
      throw new ForbiddenException('User does not exist!');

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    delete user.hashedPassword;
    return user;
  }
}
