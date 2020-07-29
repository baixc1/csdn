import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

void main() {
  runApp(
    new MaterialApp(
      home: new AppHome(),
    ),
  );
}

class AppHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Material(
      child: new Center(
        child: new FlatButton(
          onPressed: () {
            // debugDumpApp();
            // debugDumpRenderTree();
            debugDumpLayerTree();
          },
          child: new Text('Dump App'),
        ),
      ),
    );
  }
}
