import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      initialRoute: "/",
      theme: ThemeData(
        primarySwatch: Colors.green,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      routes: {
        "new_page": (context) => NewRoute(),
        "echo_page": (context) => EchoRoute(),
        "/": (context) => MyHomePage(title: 'Flutter Demo Home Page'),
        "tip2": (context) {
          return TipRoute(text: ModalRoute.of(context).settings.arguments);
        },
      },
      onGenerateRoute: (RouteSettings settings) {
        String routeName = settings.name;
        print("Open page: $routeName");
        switch (routeName) {
          case "home":
            return MaterialPageRoute(builder: (context) {
              return HomePage();
            });
          case "settings":
            return MaterialPageRoute(builder: (context) {
              return SettingsPage();
            });
          default:
            return MaterialPageRoute(builder: (BuildContext context) {
              return Scaffold(
                  body: Center(
                child: Text("Page not found"),
              ));
            });
        }
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have clicked the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            FlatButton(
              child: Text('new_page'),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, "new_page");
              },
            ),
            FlatButton(
              child: Text('echo_page'),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.of(context).pushNamed("echo_page", arguments: "hi");
              },
            ),
            FlatButton(
              child: Text('tip2'),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.of(context).pushNamed("tip2", arguments: "tip2");
              },
            ),
            FlatButton(
              child: Text('home'),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.of(context).pushNamed("home", arguments: "home");
              },
            ),
            FlatButton(
              child: Text('settings'),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.of(context)
                    .pushNamed("settings", arguments: "settings");
              },
            ),
            FlatButton(
              child: Text('settings1'),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.of(context)
                    .pushNamed("settings1", arguments: "settings1");
              },
            ),
            RouterTestRoute()
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

class NewRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("New route")),
      body: Center(
        child: Text("This is a new Route"),
      ),
    );
  }
}

class TipRoute extends StatelessWidget {
  TipRoute({
    Key key,
    @required this.text,
  }) : super(key: key);

  final String text;

  @override
  Widget build(BuildContext context) {
    var args = ModalRoute.of(context).settings.arguments;
    print(args);
    return Scaffold(
        appBar: AppBar(
          title: Text("提示"),
        ),
        body: Padding(
          padding: EdgeInsets.all(18),
          child: Center(
            child: Column(
              children: <Widget>[
                Text(text),
                RaisedButton(
                  onPressed: () => Navigator.pop(context, "我是返回值"),
                  child: Text('返回'),
                )
              ],
            ),
          ),
        ));
  }
}

class RouterTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        onPressed: () async {
          // 打开`TipRoute`，并等待返回结果
          var result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return TipRoute(
                  // 路由参数
                  text: "我是提示xxxx",
                );
              },
            ),
          );
          //输出`TipRoute`路由返回结果
          print("路由返回值: $result");
        },
        child: Text("打开提示页"),
      ),
    );
  }
}

class EchoRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var args = ModalRoute.of(context).settings.arguments;
    return Scaffold(
        appBar: AppBar(
          title: Text("echo_page"),
        ),
        body: Text('echo：' + args));
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
      title: Text("HomePage"),
    ));
  }
}

class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
      title: Text("SettingsPage"),
    ));
  }
}
