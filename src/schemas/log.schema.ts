import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const FILTER_BODY: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  schema: {
    type: 'object',
    properties: {
      result: {
        type: 'boolean',
      },
      status: {
        type: 'number',
      },
      message: {
        type: 'string',
      },
      error: {
        type: 'array',
        items: {
          type: 'object',
          properties: {},
        },
      },
    },
    example: {
      service_id: 'horo1',
      operator: 'TRUE',
      msisdn: '66898182239',
      cid: '1700',
      media_code: '0002',
      is_bot: false,
    },
  },
};
