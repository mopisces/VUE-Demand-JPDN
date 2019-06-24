export default {
          /**
           * [statusDemandType 获取需求状态码对应中文值]
           * @param  {[string]} val [应需求状态码]
           * @return {[string]}     [对应中文值]
           */
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
                        }
            },
            /**
             * [statusPriorityLevel 获取优先级状态码对应中文值]
             * @param  {[string]} val [优先级状态码]
             * @return {[string]}     [对应中文值]
             */
            statusPriorityLevel(val){
                switch(val)
                        {
                        case '0':
                          return '低';
                          break;
                        case '1':
                          return '一般';
                          break;
                        case '2':
                          return '高';
                          break;
                        case '3':
                          return '长期';
                          break;
                        default:
                          return '未知等级';
                        }
            },
            /**
             * [statusIsMajorMod 获取重大状态码对应中文值]
             * @param  {[string]} val [重大状态码]
             * @return {[string]}     [对应中文值]
             */
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
                        }
            },
            /**
             * [statusComplete 获取完成状态码对应中文值]
             * @param  {[string]} val [完成状态码]
             * @return {[string]}     [对应中文值]
             */
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
                        }
            },
            /**
             * [statusPassTest 获取测试状态码对应中文值]
             * @param  {[string]} val [测试状态码]
             * @return {[string]}     [对应中文值]
             */
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
                        }
            },
            /**
             * [statusDemand 获取需求状态码对应中文值]
             * @param  {[string]} val [需求状态码]
             * @return {[string]}     [对应中文值]
             */
            statusDemand(val){
              switch(val)
                {
                  case '0':
                    return '待分析';
                    break;
                  case '1':
                    return '待修改';
                    break;
                  case '2':
                    return '待测试';
                    break;
                  case '3':
                    return '已完成';
                    break;
                  default:
                    return false
                }
            }
}