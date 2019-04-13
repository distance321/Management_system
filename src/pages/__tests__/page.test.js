import { fetchMemberList, deleteMember, updateMember, createMember  } from '@/services/memberList'
jest.mock('../../../mock/member.js')

describe('会员增删改查测试', () => {
    it('获取会员列表测试', async () => {
        const data =  await fetchMemberList({ page: 1, page_size: 10 })
        expect(typeof data.results.length).toBe("number")
    });
    it('删除会员测试', async () => {
        const data =  await deleteMember(2)
        expect(typeof data).toBe("object")
    });
    const updateParams = {cardNumber: "360000199505316338", name: "戴丽", tel: "18801554120", category: "黄金会员", Id: 1}
    it('更改会员信息测试', async () => {
        const data =  await updateMember(updateParams)
        expect(typeof data).toBe("object")
    });
    const addParams = {cardNumber: "360000199505316338", name: "戴丽", tel: "18801554120", category: "黄金会员"}
    it('添加会员测试', async () => {
        const data =  await createMember(addParams)
        expect(typeof data).toBe("object")
    });
})