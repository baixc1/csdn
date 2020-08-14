import 'package:flutter/material.dart';

void main() {
  return runApp(
    new MaterialApp(routes: {
      "/": (context) => MyHomePage(), //注册首页路由
    }),
  );
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Home'),
      ),
      body: Demos(),
    );
  }
}

class Demos extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var args = ModalRoute.of(context).settings.arguments;
    if (args == 'Demo1') {
      return Demo1();
    } else if (args == 'Demo2') {
      return Demo2();
    }

    Widget cmBtn(page) {
      return RaisedButton(
        child: Text(page),
        onPressed: () {
          Navigator.pushNamed(context, "/", arguments: page);
        },
      );
    }

    return Column(
      children: <Widget>[
        cmBtn('Demo1'),
        cmBtn('Demo2'),
      ],
    );
  }
}

class Demo1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 弹出对话框
    Future<bool> showDeleteConfirmDialog1() {
      return showDialog<bool>(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text("提示"),
            content: Text("您确定要删除当前文件吗?"),
            actions: <Widget>[
              FlatButton(
                child: Text("取消"),
                onPressed: () => Navigator.of(context).pop(), // 关闭对话框
              ),
              FlatButton(
                child: Text("删除"),
                onPressed: () {
                  //关闭对话框并返回true
                  Navigator.of(context).pop(true);
                },
              ),
            ],
          );
        },
      );
    }

    Future<void> changeLanguage() async {
      int i = await showDialog<int>(
          context: context,
          builder: (BuildContext context) {
            return SimpleDialog(
              title: const Text('请选择语言'),
              children: <Widget>[
                SimpleDialogOption(
                  onPressed: () {
                    // 返回1
                    Navigator.pop(context, 1);
                  },
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    child: const Text('中文简体'),
                  ),
                ),
                SimpleDialogOption(
                  onPressed: () {
                    // 返回2
                    Navigator.pop(context, 2);
                  },
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    child: const Text('美国英语'),
                  ),
                ),
              ],
            );
          });

      if (i != null) {
        print("选择了：${i == 1 ? "中文简体" : "美国英语"}");
      }
    }

    Future<void> showListDialog() async {
      int index = await showDialog<int>(
        context: context,
        builder: (BuildContext context) {
          var child = Column(
            children: <Widget>[
              ListTile(title: Text("请选择")),
              ListTile(title: Text("请选择1")),
              Expanded(
                child: ListView.builder(
                  itemCount: 30,
                  itemBuilder: (BuildContext context, int index) {
                    return ListTile(
                      title: Text("$index"),
                      onTap: () => Navigator.of(context).pop(index),
                    );
                  },
                ),
              ),
            ],
          );
          //使用AlertDialog会报错
          //return AlertDialog(content: child);
          return Dialog(child: child);
        },
      );
      if (index != null) {
        print("点击了：$index");
      }
    }

    return new Column(
      //显式指定对齐方式为左对齐，排除对齐干扰
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        RaisedButton(
          child: Text("对话框1"),
          onPressed: () async {
            //弹出对话框并等待其关闭
            bool delete = await showDeleteConfirmDialog1();
            if (delete == null) {
              print("取消删除");
            } else {
              print("已确认删除");
              //... 删除文件
            }
          },
        ),
        RaisedButton(
          child: Text("对话框2"),
          onPressed: () async {
            //弹出对话框并等待其关闭
            await changeLanguage();
          },
        ),
        RaisedButton(
          child: Text("对话框3"),
          onPressed: () async {
            //弹出对话框并等待其关闭
            await showListDialog();
          },
        ),
        RaisedButton(
          child: Text("对话框4"),
          onPressed: () async {
            //弹出对话框并等待其关闭
            print(await showCustomDialog<bool>(
              context: context,
              builder: (context) {
                return AlertDialog(
                  title: Text("提示"),
                  content: Text("您确定要删除当前文件吗?"),
                  actions: <Widget>[
                    FlatButton(
                      child: Text("取消"),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    FlatButton(
                      child: Text("删除"),
                      onPressed: () {
                        // 执行删除操作
                        Navigator.of(context).pop(true);
                      },
                    ),
                  ],
                );
              },
            ));
          },
        ),
      ],
    );
  }
}

Stream<int> counter() {
  return Stream.periodic(Duration(seconds: 1), (i) {
    return i;
  });
}

class Demo2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<int>(
      stream: counter(), //
      //initialData: ,// a Stream<int> or null
      builder: (BuildContext context, AsyncSnapshot<int> snapshot) {
        if (snapshot.hasError) return Text('Error: ${snapshot.error}');
        switch (snapshot.connectionState) {
          case ConnectionState.none:
            return Text('没有Stream');
          case ConnectionState.waiting:
            return Text('等待数据...');
          case ConnectionState.active:
            return Text('active: ${snapshot.data}');
          case ConnectionState.done:
            return Text('Stream已关闭');
        }
        return null; // unreachable
      },
    );
  }
}

Future<T> showCustomDialog<T>({
  @required BuildContext context,
  bool barrierDismissible = true,
  WidgetBuilder builder,
}) {
  final ThemeData theme = Theme.of(context, shadowThemeOnly: true);
  return showGeneralDialog(
    context: context,
    pageBuilder: (BuildContext buildContext, Animation<double> animation,
        Animation<double> secondaryAnimation) {
      final Widget pageChild = Builder(builder: builder);
      return SafeArea(
        child: Builder(builder: (BuildContext context) {
          return theme != null
              ? Theme(data: theme, child: pageChild)
              : pageChild;
        }),
      );
    },
    barrierDismissible: barrierDismissible,
    barrierLabel: MaterialLocalizations.of(context).modalBarrierDismissLabel,
    barrierColor: Colors.black87, // 自定义遮罩颜色
    transitionDuration: const Duration(milliseconds: 150),
    transitionBuilder: _buildMaterialDialogTransitions,
  );
}

Widget _buildMaterialDialogTransitions(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child) {
  // 使用缩放动画
  return ScaleTransition(
    scale: CurvedAnimation(
      parent: animation,
      curve: Curves.easeOut,
    ),
    child: child,
  );
}
