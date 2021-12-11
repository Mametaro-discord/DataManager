# Manager#flatMap
[*Array*#flatMap](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)風。  
引数で渡された関数が返すManager達をもとのManagerにつなげます。  
要素の値がプロパティにManagerを持っているときなどに有効です。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)\<Manager\<*K*, *V*\>\>|つなげるManagerを返す関数|none  
thisArg?|*any*|fnの関数の中で*this*として使う値|none  
  
**Return**: Manager<*K*, *V*>

#### 例を見てください
```js  
const manager = new Manager([  
		['keyHasManager', {  
			manager: new Manager([
					['otherKey', 'otherValue']
				])  
		}],  
		['otherKeyHasManager', {  
			manager: new Manager([  
					['key', 'value']  
				])  
		}]  
	]);  
console.log(manager.flatMap(val => val.manager));  
```  
コンソールにはもとの「manager」に加えてflatMapで作った２つのval.managerの要素達が入ったManagerが出力されます。   
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)