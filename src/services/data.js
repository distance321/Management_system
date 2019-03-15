import request from '@/utils/request';
import buildURL from '@/utils/buildURL';

export async function fetchData() {
	return request(buildURL(`/api/v1/data/`));
}