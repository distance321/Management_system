import request from '@/utils/request';
import buildURL from '@/utils/buildURL';
import { stringify } from 'qs';

export async function fetchSalaryList(params) {
	return request(buildURL(`/api/v1/salaryList/?${stringify(params)}`));
}

export async function createSalary(params) {
	return request(buildURL(`/api/v1/salaryList/`),{
		method: 'POST',
		body: params
	});
}

export async function fetchAllSalary() {
	return request(buildURL(`/api/v1/allSalaryList/`));
}

export async function updateSalary(params) {
	const Id = { Id : params.Id }
	return request(buildURL(`/api/v1/salaryList/?${stringify(Id)}`),{
		method: 'PUT',
		body: params
	});
}

export async function deleteSalary(params) {
	const Id = { Id : params }
	return request(buildURL(`/api/v1/salaryList/?${stringify(Id)}`),{
		method : 'DELETE'
	});
}