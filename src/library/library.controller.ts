import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles, RolesGuard } from '../auth/guard/role-guard';
import { ROLES } from '../auth/roles';
import { LibraryService } from './library.service';
import {
  BookDto,
  dtoFromBook,
  dtoFromLibrary,
  LibraryBookRentalRequestDto,
  LibraryCreationRequestDto,
  LibraryDto,
  LibraryUpdateRequestDto,
} from './dto/library.dto';
import { LibraryBookRentalRequest } from './library.model';
import Principal from '../auth/model/principal.model';

@Controller('library')
@UseGuards(RolesGuard)
export class LibraryController {
  private readonly logger = new Logger(LibraryController.name);

  constructor(private readonly libraryService: LibraryService) {}

  @Get('libraries')
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  async getLibraries(): Promise<LibraryDto[]> {
    return this.libraryService
      .findLibraries()
      .then((users) => users.map(dtoFromLibrary));
  }

  @Get(':id/books')
  @Roles(ROLES.ADMIN, ROLES.MANAGER, ROLES.AFFILIATE_USER, ROLES.SIMPLE_USER)
  async getBooks(@Param('id') id: string): Promise<BookDto[]> {
    return this.libraryService
      .getBooks(id)
      .then((books) => books.map(dtoFromBook));
  }

  @Get(':address')
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  async getLibraryByAddress(
    @Param('address') address: string,
  ): Promise<LibraryDto> {
    return this.libraryService
      .findByAddress(address)
      .then((lib) =>
        lib
          .map(dtoFromLibrary)
          .orElseThrow(
            () =>
              new NotFoundException(
                `Library with address ${address} not found`,
              ),
          ),
      );
  }

  @Post('')
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  async createLibrary(
    @Req() request: Request,
    @Body() requestBody: LibraryCreationRequestDto,
  ): Promise<LibraryDto> {
    this.logger.log(`Create library with address: ${requestBody.address}`);
    // const principal = <Principal>request.user;
    return this.libraryService
      .create(requestBody, request)
      .then(dtoFromLibrary);
  }

  @Put(':id')
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  async updateLibrary(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() requestBody: LibraryUpdateRequestDto,
  ): Promise<LibraryDto> {
    // const principal = <Principal>request.user;
    return this.libraryService
      .updateLibrary(id, requestBody, request)
      .then(dtoFromLibrary);
  }

  @Put(':id')
  @Roles(ROLES.ADMIN, ROLES.MANAGER, ROLES.AFFILIATE_USER)
  async rentBooksFromALibrary(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() requestBody: LibraryBookRentalRequestDto,
  ): Promise<LibraryDto> {
    // const principal = <Principal>request.user;
    return this.libraryService
      .rentBooksFromALibrary(id, requestBody, request)
      .then(dtoFromLibrary);
  }
}
