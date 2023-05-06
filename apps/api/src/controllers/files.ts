/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';
import { RequestHandler } from 'express';
import status from 'http-status';
import File, {
  IFile,
  FileCreateRequest,
  FileListResponse,
} from 'lib/models/file';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OperationId,
  Path,
  Post,
  Query,
  Response,
  Route,
  Tags,
} from 'tsoa';
import restHandlers from '../helpers/rest-handlers';

const handlers = restHandlers<IFile>(File);

const uploadFile: RequestHandler = async function uploadFile(req, res, next) {
  try {
    if (!req.file) return res.sendStatus(status.BAD_REQUEST);

    const file = await File.create({
      _id: req.file.filename,
      bucket: res.locals.bucket,
      user: res.locals.user.id,
      size: req.file.size,
      filename: req.file.originalname,
      type: req.file.mimetype,
      restricted: !!req.query.restricted,
    });

    res.send(file);
  } catch (err) {
    next(err);
  }
};

@Route('files')
@Tags('Files')
class FilesController extends Controller {
  /** @summary Create file */
  @Post()
  @Tags('Files')
  @OperationId('files_create')
  @Response<IFile>(200)
  @Response(401, 'Unauthorized')
  @Response(400, 'Bad Request')
  public async create(
    @Inject() req: express.Request,
    @Inject() res: express.Response,
    @Inject() next: express.NextFunction,
    @Body() requestBody?: FileCreateRequest,
    @Query() bucket?: string,
    @Query() restricted?: string
  ) {
    return uploadFile(req, res, next);
  }

  /** @summary Retrieve file */
  @Get('{id}')
  @Tags('Files')
  @OperationId('files_retrieve')
  @Response<IFile>(200)
  @Response(401, 'Unauthorized')
  @Response(404, 'Not Found')
  public async retrieve(
    @Inject() req: express.Request,
    @Inject() res: express.Response,
    @Inject() next: express.NextFunction,
    @Path() id?: string,
    @Query() expand?: string
  ) {
    return handlers.retrieve(req, res, next);
  }

  /** @summary List files */
  @Get()
  @Tags('Files')
  @OperationId('files_list')
  @Response<FileListResponse>(200)
  @Response(401, 'Unauthorized')
  @Response(400, 'Bad Request')
  public async list(
    @Inject() req: express.Request,
    @Inject() res: express.Response,
    @Inject() next: express.NextFunction,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() sort?: number,
    @Query() expand?: string
  ) {
    return handlers.list(req, res, next);
  }

  /** @summary Delete file */
  @Delete('{id}')
  @Tags('Files')
  @OperationId('files_delete')
  @Response<IFile>(200)
  @Response(401, 'Unauthorized')
  @Response(404, 'Not Found')
  public async delete(
    @Inject() req: express.Request,
    @Inject() res: express.Response,
    @Inject() next: express.NextFunction,
    @Path() id?: string
  ) {
    return handlers.delete(req, res, next);
  }
}

export default new FilesController();
