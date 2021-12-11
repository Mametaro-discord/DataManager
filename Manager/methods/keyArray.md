# Manager#keyArray
[Map#keys](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)で得られるキー達のiterableオブジェクトを配列に変換しただけです、便利ですね。  
  
**Return**: *Array*\<*K*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
console.log(manager.keyArray()); //output ['key', 'otherKey']  
```