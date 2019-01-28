// ref: https://umijs.org/config/
export default {
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		[
			'umi-plugin-react',
			{
				antd: true,
				dva: {
					immer: true
				},
				dynamicImport: true,
				title: 'system',
				dll: true,
				library: 'react',
				hardSource: true,
				routes: {
					exclude: [/components/, /models/]
				}
			}
		]
	]
};
