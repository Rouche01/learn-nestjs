import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(
    dto: CreateBookmarkDto,
    userId: number,
  ) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        title: dto.title,
        link: dto.link,
        description: dto.description,
        userId,
      },
    });

    return bookmark;
  }

  async getBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: userId },
    });

    return bookmarks;
  }

  async getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });

    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
