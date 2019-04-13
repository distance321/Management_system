import request from '@/utils/request';
import buildURL from '@/utils/buildURL';
import { stringify } from 'qs';

export async function fetchMemberList(params) {
	return request(buildURL(`/api/v1/memberList/?${stringify(params)}`));
}

export async function fetchAllMember() {
	return request(buildURL(`/api/v1/allMemberList/`));
}

export async function createMember(params) {
	return request(buildURL(`/api/v1/memberList/`),{
		method: 'POST',
		body: params
	});
}

export async function createList(params) {
	return request(buildURL(`/api/v1/memberList/`),{
		method: 'PATCH',
		body: params
	});
}

export async function updateMember(params) {
	const Id = { Id : params.Id }
	return request(buildURL(`/api/v1/memberList/?${stringify(Id)}`),{
		method: 'PUT',
		body: params
	});
}

export async function deleteMember(params) {
	const Id = { Id : params }
	return request(buildURL(`/api/v1/memberList/?${stringify(Id)}`),{
		method : 'DELETE'
	});
}