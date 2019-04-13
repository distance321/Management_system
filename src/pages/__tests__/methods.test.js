import { listFilter } from '@/utils/methods'

describe('模糊搜索测试', () => {
    const dataList = [
        { name : 'wang', age : 18 },
        { name : 'zhang', age : 20 }
    ]
    it('成功搜索测试',  () => {
        const data = listFilter(dataList,'wang')
        expect(data).toEqual([{name : 'wang', age : 18}])
    });
    it('失败搜索测试', async () => {
        const data = listFilter(dataList,'aaaaa')
        expect(data).toEqual([])
    });
})