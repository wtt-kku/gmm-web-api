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

export const LOGSUCCESS_BODY: ApiResponseOptions = {
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
      service_id: '114400',
      operator: 'TRUE',
      msisdn: '66852210011',
      cid: '1705',
      media_code: '8520000',
      short_code: '1452001',
      appear_time: '2022-04-11T15:53:20.256Z',
      hit_time: '2022-04-11T15:53:20.256Z',
      time_on_page: 10,
      is_bot: false,
    },
  },
};
