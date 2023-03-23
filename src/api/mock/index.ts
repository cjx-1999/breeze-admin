import http from '@/config/mockRequest'

export function selectTypeData(params?: any) {
    return http.post("/bar/selectTypeData", params);
}
