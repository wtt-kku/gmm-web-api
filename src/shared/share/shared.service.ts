import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseResult } from 'src/common/const';
import { MESSAGE } from '../../common/msg.const';

@Injectable()
export class SharedService {
  returnCreated() {
    return {
      result: true,
      status: HttpStatus.CREATED,
      message: MESSAGE.CREATED.msgTH,
    };
  }

  returnUnAuth() {
    return {
      result: false,
      status: HttpStatus.UNAUTHORIZED,
      message: MESSAGE.UNAUTHORIZED.msgTH,
    };
  }

  returnSuccess(hasData: boolean, data?: any) {
    if (!hasData) {
      return {
        result: true,
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.msgTH,
      };
    } else {
      return {
        result: true,
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.msgTH,
        data: data,
      };
    }
  }

  returnNoSuccess(data?: any) {
    return {
      result: false,
      status: HttpStatus.OK,
      message: MESSAGE.UNCREATED.msgTH,
      error: data,
    };
  }

  returnNotFound() {
    return {
      result: false,
      status: HttpStatus.NO_CONTENT,
      message: MESSAGE.NOT_FOUND.msgTH,
      error: {},
    };
  }

  returnError(errorMsg?: any) {
    errorMsg =
      errorMsg !== undefined && errorMsg.indexOf('Duplicate entry') == -1
        ? errorMsg
        : 'Duplicate entry ' + MESSAGE.DUPLICATE_DATA.msgTH;
    return {
      result: false,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: MESSAGE.INTERNAL_ERR.msgTH,
      error: errorMsg,
    };
  }

  returnResponse(code: number, data?: any, errMsg?: any): ResponseResult {
    switch (code) {
      case 200:
        if (data === undefined || data === null) {
          return {
            result: true,
            status: HttpStatus.OK,
            message: MESSAGE.SUCCESS.msgTH,
          };
        } else {
          return {
            result: true,
            status: HttpStatus.OK,
            message: MESSAGE.SUCCESS.msgTH,
            data: data,
          };
        }
      case 201:
        return {
          result: true,
          status: HttpStatus.CREATED,
          message: MESSAGE.CREATED.msgTH,
        };
      case 204:
        if (errMsg === undefined || errMsg === null) {
          return {
            result: false,
            status: HttpStatus.NO_CONTENT,
            message: MESSAGE.NOT_FOUND.msgTH,
          };
        } else {
          return {
            result: false,
            status: HttpStatus.NO_CONTENT,
            message: MESSAGE.NOT_FOUND.msgTH,
            error: errMsg,
          };
        }
      case 401:
        return {
          result: false,
          status: HttpStatus.UNAUTHORIZED,
          message: MESSAGE.UNAUTHORIZED.msgTH,
        };
      case 400:
        return {
          result: false,
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.BAD_REQUEST.msgTH,
          error: errMsg,
        };
      case 404:
        return {
          result: false,
          status: HttpStatus.NOT_FOUND,
          message: MESSAGE.BAD_REQUEST.msgTH,
          error: errMsg,
        };
      case 500:
        if (typeof errMsg === 'string' && errMsg.indexOf('Duplicate entry') > -1) {
          errMsg = MESSAGE.DUPLICATE_DATA.msgTH + ` '${errMsg.split(`'`)[1]}'`;
        }
        return {
          result: false,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGE.INTERNAL_ERR.msgTH,
          error: errMsg,
        };
      default:
        return {
          result: false,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGE.INTERNAL_ERR.msgTH,
          error: errMsg,
        };
    }
  }
}
