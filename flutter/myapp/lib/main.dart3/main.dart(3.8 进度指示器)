import 'package:flutter/material.dart';

void main() {
  return runApp(
    new MaterialApp(
      home: new MyHomePage(),
    ),
  );
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('text'),
      ),
      body: Texts(),
    );
  }
}

class Texts extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // return Demo2();
    // return Demo3();
    return Demo4();
  }
}

class Demo1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        LinearProgressIndicator(
          backgroundColor: Colors.grey[200],
          valueColor: AlwaysStoppedAnimation(Colors.blue),
        ),
//进度条显示50%
        LinearProgressIndicator(
          backgroundColor: Colors.grey[200],
          valueColor: AlwaysStoppedAnimation(Colors.blue),
          value: .5,
        ),
      ],
    );
  }
}

class Demo2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        // 模糊进度条(会执行一个旋转动画)
        CircularProgressIndicator(
          backgroundColor: Colors.grey[200],
          valueColor: AlwaysStoppedAnimation(Colors.blue),
        ),
//进度条显示50%，会显示一个半圆
        CircularProgressIndicator(
          backgroundColor: Colors.grey[200],
          valueColor: AlwaysStoppedAnimation(Colors.blue),
          value: .5,
        ),
      ],
    );
  }
}

class Demo3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        // 模糊进度条(会执行一个旋转动画)
        // 线性进度条高度指定为3
        SizedBox(
          height: 30,
          child: LinearProgressIndicator(
            backgroundColor: Colors.grey[200],
            valueColor: AlwaysStoppedAnimation(Colors.blue),
            value: .5,
          ),
        ),
// 圆形进度条直径指定为100
        SizedBox(
          height: 100,
          width: 100,
          child: CircularProgressIndicator(
            backgroundColor: Colors.grey[200],
            valueColor: AlwaysStoppedAnimation(Colors.blue),
            value: .7,
          ),
        ),
        // 宽高不等
        SizedBox(
          height: 100,
          width: 130,
          child: CircularProgressIndicator(
            backgroundColor: Colors.grey[200],
            valueColor: AlwaysStoppedAnimation(Colors.blue),
            value: .7,
          ),
        ),
      ],
    );
  }
}

class Demo4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ProgressRoute();
  }
}

class ProgressRoute extends StatefulWidget {
  @override
  _ProgressRouteState createState() {
    return _ProgressRouteState();
  }
}

class _ProgressRouteState extends State<ProgressRoute>
    with SingleTickerProviderStateMixin {
  AnimationController _animationController;

  @override
  void initState() {
    //动画执行时间3秒
    _animationController =
        new AnimationController(vsync: this, duration: Duration(seconds: 3));
    _animationController.forward();
    _animationController.addListener(() => setState(() => {}));
    super.initState();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.all(16),
            child: LinearProgressIndicator(
              backgroundColor: Colors.grey[200],
              valueColor: ColorTween(begin: Colors.grey, end: Colors.blue)
                  .animate(_animationController), // 从灰色变成蓝色
              value: _animationController.value,
            ),
          )
        ],
      ),
    );
  }
}
