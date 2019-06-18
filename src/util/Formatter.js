export default {
          statusDemandType(val){
                switch(val)
                        {
                        case '0':
                          return 'bug';
                          break;
                        case '1':
                          return '内部优化';
                          break;
                        case '2':
                          return '实施需求';
                          break;
                        case '3':
                          return '一般需求';
                          break;
                        default:
                          return '未知参数';
                        };
            },
            statusPriorityLevel(val){
                switch(val)
                        {
                        case '0':
                          return '一般';
                          break;
                        case '1':
                          return '高';
                          break;
                        default:
                          return '未知等级';
                        };
            },
            statusIsMajorMod(val){
                switch(val)
                        {
                        case '0':
                          return '否';
                          break;
                        case '1':
                          return '是';
                          break;
                        default:
                          return '否';
                        };
            },
            statusComplete(val){
                switch(val)
                        {
                        case '0':
                          return '已实现';
                          break;
                        case '1':
                          return '已修改';
                          break;
                        default:
                          return false;
                        };
            },
            statusPassTest(val){
                switch(val)
                        {
                        case '0':
                          return '待测试';
                          break;
                        case '1':
                          return '已测试';
                          break;
                        default:
                          return false;
                        };
            },
            
              

}