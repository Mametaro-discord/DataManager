# Manager#getAll
引数で渡されたキー達に対する要素の値を配列にしてまとめて返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
keys|[Spread](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/Spread.md)\<*K*\>|取得する要素のキー|none  
  
**Return**: *Array*\<*V*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['warosuKey', 'warosuValue'],  
		['powerfulKey', 'powerfulValue']  
	]);  
console.log(manager.getAll(['key', 'powerfulKey'])); //output ['value', 'powerfulValue']  
```  
実はこれmapを使って↓のように簡単に再現できるので正直大した需要のないメソッドです。でもgetAllのほうが少し楽になるのでぜひ使ってください；；  
```js  
keys.map(key => manager.get(key));  
```  
こんな感じ。