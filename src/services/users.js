import request from '@/utils/request';
import buildURL from '@/utils/buildURL';
import { stringify } from 'qs';

export async function fetchUsers(params) {
	return request(buildURL(`/api/v1/users/?${stringify(params)}`));
}
export async function fetchPermissions() {
	return request(buildURL(`/api/v1/permissions/`));
}
export async function updateUsers(params) {
	const id = {id : params.id}
	const userInfo = params.userInfo
	return request(buildURL(`/api/v1/users/?${stringify(id)}`), {
		method: 'PUT',
		body: userInfo
	});
}
export async function deleteUsersById(id) {
	const ID = {id : id}
	return request(buildURL(`/api/v1/users/?${stringify(ID)}`), {
		method: 'DELETE'
	});
}
export async function createUsers(params) {
	return request(buildURL('/api/v1/users/'), {
		method: 'POST',
		body: params
	});
}
