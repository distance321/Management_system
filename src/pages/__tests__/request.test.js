import { Login } from '@/services/api'
jest.mock('../../../mock/users.js')

describe('登录测试', () => {
    it('登录成功测试', async () => {
        const data =  await Login({"username":"admin","password":"admin123"})
        expect(typeof data.token).toBe("string")
    });
    it('登录失败测试', async () => {
        const data =  await Login({"username":"admin","password":"admin"})
        expect(typeof data.token).toBe("undefined")
    });
})
