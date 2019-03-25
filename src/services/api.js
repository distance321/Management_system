import request from '@/utils/request';
import buildURL from '@/utils/buildURL';
export async function Login(params) {
	return request(buildURL('/api/v1/auth/token/'), {
		method: 'POST',
		body: params
	});
}


export async function resetPwd(userMsg) {
	return request(buildURL(`/api/v1/users/reset_password/`), {
		method: 'POST',
		body: userMsg
	});
}
