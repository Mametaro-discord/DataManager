# Manager#keyOf
引数で渡された値に対する要素のキーを返します。  
[Manager#get](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/get.md)の逆みたいなメソッドです(??)  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
val|*V*|取得する要素の値|none  
  
**Return**: *K*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value']  
	]);  
console.log(manager.keyOf('value')); //output 'key'  
```