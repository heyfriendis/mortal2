const inquirer = require("inquirer");

function inquirerPrompt(argv) {
    const { name } = argv
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: '模块名称',
                default: name,
                validate: function (val) {
                    if (!/^[a-zA-Z]+$/.test(val)) {
                        return '模板名称只能包含英文'
                    }
                    if (!/^[A-Z]/.test(val)) {
                        return '模板名称必须以大写字母开头'
                    }
                    return true
                }
            }, 
            {
                type: 'list',
                name: 'type',
                message: '模板类型',
                choices: ['表单', '动态表单', '嵌套表单'],
                filter: function (value) {
                    return {
                        '表单': "form",
                        '动态表单': "dynamicForm",
                        '嵌套表单': "nestedForm",
                    }[value]
                },
            },
            {
                type: 'list',
                message: '使用什么框架开发',
                choices: ['react', 'vue'],
                name: 'frame',
            }
        ]).then(answers => {
            const { frame } = answers
            if(frame === 'react'){
                inquirer.prompt([
                    {
                        type: 'list',
                        message: '使用什么UI组件库开发',
                        choices: [
                          'Ant Design',
                        ],
                        name: 'library',
                      }
                ]).then(answers1 => {
                    resolve({
                        ...answers,
                        ...answers1
                    })
                }).catch(error => {
                    reject(error)
                })
            }

            if(frame === 'vue') {
                inquirer.prompt([
                    {
                        type:'list',
                        message:'使用什么UI组件',
                        choices:['Element'],
                        name:'liarary'
                    }
                ]).then(answers2 => {
                    resolve({
                        ...answers,
                        ...answers2
                    })
                }).catch(error => {
                    reject(error)
                })
            }
        }).catch(error => {
            reject(error)
        })
    })
}

exports.inquirerPrompt = inquirerPrompt;