export function listFilter (arr,keyWord) {
    var reg =  new RegExp(keyWord)
    let filterList = []
    arr.forEach(item => {
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const element = item[key];
                if(reg.test(element)){
                    filterList.push(item)
                }
            }
        }
    });
    return filterList
}