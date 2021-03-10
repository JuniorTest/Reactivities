import axious, { AxiosResponse } from 'axios';
import { resolve } from 'path';
import { IActivity } from '../models/activity';

axious.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requets = {
    get: (url: string) => axious.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axious.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axious.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axious.delete(url).then(sleep(1000)).then(responseBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requets.get('/activities'),
    details: (id: string) => requets.get(`/activities/${id}`),
    create: (activity: IActivity) => requets.post('/activities', activity),
    update: (activity: IActivity) => requets.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requets.del(`/activities/${id}`)
}

export default {
    Activities
}