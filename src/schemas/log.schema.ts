import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const CREATELOGSCHEMA: ApiResponseOptions = {
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
      msisdn: '66123456',
      ip: '1.1.1.1',
      device: 'PC',
      browser: 'chrome',
      service_name: 'service 1',
      short_code: '00001',
      cid: '114',
      media_code: '500001',
      appear_time: '2022-03-07 13:57:24.569295',
      hit_time: '2022-02-07 13:57:24.569295',
      time_on_page: 10,
      is_bot: false,
      blocked: false,
    },
  },
};
