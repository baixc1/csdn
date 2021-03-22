new Form("formId", document.body)
  .add(
    new Group("account", "账号").add(
      new FormItem({
        label: "用户名",
        key: "user_name",
        rightText: "4到6位数字",
      }),
      new FormItem({
        label: "密码",
        key: "pwd",
        rightText: "6到12位数字或字母",
      })
    )
  )
  .add(
    new Group("info", "信息").add(
      new FormItem({
        label: "昵称",
        key: "nic",
      }),
      new FormItem({
        label: "状态",
        key: "status",
      })
    )
  );

// 配置描述
var config = {
  id: "formId",
  container: document.body,
  list: [
    {
      label: "账号",
      key: "account",
      list: [
        {
          label: "用户名",
          key: "user_name",
          rightText: "4到6位数字",
          placeholder: "请输入用户名",
        },
        //...
      ],
    },
    //...
  ],
};
