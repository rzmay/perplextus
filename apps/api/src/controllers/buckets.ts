/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';
import Bucket, { BucketCreateRequest, BucketListResponse, BucketUpdateRequest, IBucket } from 'lib/models/bucket';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OperationId, Patch,
  Path,
  Post,
  Query,
  Response,
  Route,
  Tags
} from 'tsoa'
import restHandlers from '../helpers/rest-handlers';

const handlers = restHandlers<IBucket>(Bucket);

@Route('buckets')
@Tags('Buckets')
class BucketsController extends Controller {
  /** @summary Create bucket */
  @Post()
  @Tags('Buckets')
  @OperationId('buckets_create')
  @Response<IBucket>(200)
  @Response(401, 'Unauthorized')
  @Response(400, 'Bad Request')
  public async create(
    @Inject() req: express.Request,
    @Inject() res: express.Response,
    @Inject() next: express.NextFunction,
    @Body() requestBody?: BucketCreateRequest
  ) {
    return handlers.create(req, res, next);
  }

  /** @summary Retrieve bucket */
  @Get('{id}')
  @Tags('Buckets')
  @OperationId('buckets_retrieve')
  @Response<IBucket>(200)
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

  /** @summary List buckets */
  @Get()
  @Tags('Buckets')
  @OperationId('buckets_list')
  @Response<BucketListResponse>(200)
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

  /** @summary Update bucket */
  @Patch('{id}')
  @Tags('Buckets')
  @OperationId('buckets_update')
  @Response<IBucket>(200)
  @Response(401, 'Unauthorized')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  public async update(
    @Inject() req: express.Request,
    @Inject() res: express.Response,
    @Inject() next: express.NextFunction,
    @Path() id?: string,
    @Body() requestBody?: BucketUpdateRequest,
  ) {
    return handlers.update(req, res, next);
  }

  /** @summary Delete bucket */
  @Delete('{id}')
  @Tags('Buckets')
  @OperationId('buckets_delete')
  @Response<IBucket>(200)
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

export default new BucketsController();
