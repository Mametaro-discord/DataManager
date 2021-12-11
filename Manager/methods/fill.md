# Manager#fill
[*Array*#fill](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)風。  
指定されたキー(達)を指定した値で染めます。  
わかりにくいので例を見てください↓↓↓  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
source|*K*|コピーもとの要素です。|none  
target|[Spread](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/Spread.md)\<*K*\>|コピー先(達)|(全キーの配列)  
  
**Return**: Manager\<*K*, *V*\>(=*this*)

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['warosuKey', 'warosuValue'],  
		['powerfulKey', 'powerfulValue']  
	]);  
manager.fill('key', ['otherKey', 'warosuKey', 'powerfulKey']);  
```  
この場合すべての要素の値が'value'になります。  
```js  
manager.fill('key');  
```  
これでもコピー先にすべての要素が指定されるので同じです。    
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)