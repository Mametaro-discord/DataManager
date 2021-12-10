# Manager#clear
Map#clearです。  
要素すべてを消し去ってみせます。  
  
**Return**: Manager\<*K*, *V*\>(=*this*)

#### 例を見てください
```js  
manager.set('key', 'value');  
manager.set('otherKey', 'otherValue');  
console.log(manager.array()); //output [['key', 'value'], ['otherKey', 'otherValue']]  
manager.clear();  
console.log(manager.array()); //output []  
```