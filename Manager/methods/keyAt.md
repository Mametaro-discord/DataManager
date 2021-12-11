# Manager#keyAt
引数で渡された数の位置にある要素のキーを返します。(負の数だと後ろから数えます)  
[*Array*#at](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/at)みたいですね。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
index|*number*|数える数|0  
  
**Return**: *K*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['surprise', '?!']  
	]);  
console.log(manager.at(1)); //output 'otherKey'  
console.log(manager.at(-2)); //output 'otherKey'  
```