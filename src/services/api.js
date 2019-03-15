import request from '@/utils/request';
import buildURL from '@/utils/buildURL';
export async function Login(params) {
	return request(buildURL('/api/v1/auth/token/'), {
		method: 'POST',
		body: params
	});
}


export async function resetPwd(userMsg) {
	const id = userMsg.id
	const password = userMsg.password
	return request(buildURL(`/api/v1/users/${id}/reset_password/`), {
		method: 'POST',
		body: { password : password }
	});
}
