import request from '@/utils/request';
import buildURL from '@/utils/buildURL';
import { stringify } from 'qs';

export async function fetchPeopleList(params) {
	return request(buildURL(`/api/v1/peopleList/?${stringify(params)}`));
}

export async function fetchAllPeople() {
	return request(buildURL(`/api/v1/allPeopleList/`));
}

export async function createPeople(params) {
	return request(buildURL(`/api/v1/peopleList/`),{
		method: 'POST',
		body: params
	});
}

export async function updatePeople(params) {
	const Id = { Id : params.Id }
	return request(buildURL(`/api/v1/peopleList/?${stringify(Id)}`),{
		method: 'PUT',
		body: params
	});
}

export async function deletePeople(params) {
	const Id = { Id : params }
	return request(buildURL(`/api/v1/peopleList/?${stringify(Id)}`),{
		method : 'DELETE'
	});
}