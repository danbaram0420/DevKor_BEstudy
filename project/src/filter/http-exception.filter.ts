import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

//예외처리를 이렇게 별도의 filter에서 하면 관리하기 편함.

@Catch(HttpException)//exception이 발생했을 때 수행됨
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost){//exception 안에 에러 정보가 들어 있음
        const ctx = host.switchToHttp();//호스트 정보를 http로 변환
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();//request와 response를 받아옴
        const status = exception.getStatus();
        const error = exception.getResponse() as string | { message: string; error: string; statusCode: number };//에러 메시지를 받아옴

        if (typeof error === 'string')//에러가 문자열이면{
            response.status(status).json({//json형식으로 에러 데이터를 반환(필터링)
                success: false,
                error: error,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        } else {
            response.status(status).json({//json형식으로 에러 데이터를 반환(필터링)
                ...error,
                success: false,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }

        
    }
}