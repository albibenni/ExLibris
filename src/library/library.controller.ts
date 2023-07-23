import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles, RolesGuard } from '../auth/guard/role-guard';
import { ROLES } from '../auth/roles';
import { LibraryService } from './library.service';
import { dtoFromLibrary, LibraryDto } from './dto/library.dto';
import Principal from '../auth/model/principal.model';
import { Library, LibraryCreationRequest } from './library.model';

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
    @Body() requestBody: LibraryCreationRequest,
  ): Promise<LibraryDto> {
    this.logger.log(`Create library with address: ${requestBody.address}`);
    // const principal = <Principal>request.user;
    return this.libraryService
      .create(requestBody, request)
      .then(dtoFromLibrary);
  }
}
