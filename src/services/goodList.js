import request from '@/utils/request';
import buildURL from '@/utils/buildURL';
import { stringify } from 'qs';

export async function fetchGoodList(params) {
	return request(buildURL(`/api/v1/goodList/?${stringify(params)}`));
}

export async function createGood(params) {
	return request(buildURL(`/api/v1/goodList/`),{
		method: 'POST',
		body: params
	});
}

export async function updateGood(params) {
	const Id = { Id : params.Id }
	return request(buildURL(`/api/v1/goodList/?${stringify(Id)}`),{
		method: 'PUT',
		body: params
	});
}

export async function deleteGood(params) {
	const Id = { Id : params }
	return request(buildURL(`/api/v1/goodList/?${stringify(Id)}`),{
		method : 'DELETE'
	});
}