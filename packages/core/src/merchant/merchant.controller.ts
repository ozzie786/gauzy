import { ApiTags } from '@nestjs/swagger';
import {
	Controller,
	HttpStatus,
	Get,
	Query,
	UseGuards,
	Body,
	HttpCode,
	Post
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrudController, IPagination, Merchant } from 'core';
import { MerchantService } from './merchant.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ParseJsonPipe } from '../shared/pipes/parse-json.pipe';
import { IMerchant } from '@gauzy/contracts';
import { TenantPermissionGuard } from '../shared/guards/auth/tenant-permission.guard';


@ApiTags('Merchants')
@UseGuards(AuthGuard('jwt'), TenantPermissionGuard)
@Controller()
export class MerchantController extends CrudController<Merchant> {
	constructor(
		private readonly productStoreService: MerchantService
	) {
		super(productStoreService);
		}
		
		@ApiOperation({
			summary: 'Find all product stores.'
		})
		@ApiResponse({
			status: HttpStatus.OK,
			description: 'Found product stores.',
			type: Merchant
		})
		@ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Record not found'
		})
		@Get()
		async findAllMerchants(
			@Query('data', ParseJsonPipe) data: any,
			@Query('page') page: any,
			@Query('_limit') limit: any
		): Promise<IPagination<Merchant>> {
			const {
				relations = [],
				findInput = null} = data;
			return this.productStoreService.findAllProductTypes(
				relations,
				findInput,
				{page, limit}
			);
		}


		@ApiOperation({ summary: 'Create record' })
		@ApiResponse({
			status: HttpStatus.CREATED,
			description: 'The record has been successfully created.'
		})
		@ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Record not found'
		})
		@ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description:
				'Invalid input, The response body may contain clues as to what went wrong'
		})
		@HttpCode(HttpStatus.ACCEPTED)
		@Post()
		async create(
			@Body() productStoreInput: IMerchant
		): Promise<Merchant> {
			return this.productStoreService.createStore(productStoreInput);
		}

	


    
}
